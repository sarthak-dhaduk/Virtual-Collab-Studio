import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./ui/SearchBar";
import Footer from "./ui/Footer";
import JoinModal from "./modals/JoinModal";
import AddPostModal from "./modals/AddPosts";
import CreateRoom from "./modals/CreateRoom";
import ProfileSetting from "./modals/ProfileSetting";
import AddReview from "./modals/AddReview";

import AddPostButton from "./ui/AddPostButton";
import DropdownLanguage from "./ui/DropdownLanguage";
import RunButton from "./ui/RunButton";
import CodeEditor from "./ui/CodeEditor";
import MouseTracker from "./ui/MouseTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./ui/Toast";

const MainContent = ({ children, isLoggedIn }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 768
  );

  const [showContent, setShowContent] = useState(false);
  const [language, setLanguage] = useState("python");
  const [editorInstance, setEditorInstance] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [users, setUsers] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const suppressEditorChanges = useRef(false);
  const [isUserListReceived, setIsUserListReceived] = useState(false); // Controls mouse tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseEmail, setMouseEmail] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [activeTab, setActiveTab] = useState("output");
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const terminalRef = useRef(null);

  const languages = [
    "python",
    "javascript",
    "c#",
    "java",
    "c++",
    "ruby",
    "go",
    "swift",
    "rust",
    "kotlin",
    "php",
    "sql",
    "shell",
    "haskell",
    "scala",
    "perl",
    "lua",
  ];

  const userEmailForMouse =
    JSON.parse(sessionStorage.getItem("user"))?.email || "Unknown";

  // Using useRef for WebSocket to ensure it's always available
  const wsRef = useRef(null);

  useEffect(() => {
    setShowContent(isLoggedIn);
  }, [isLoggedIn]);

  const generateRoomId = () =>
    Math.random().toString(36).substr(2, 8).toUpperCase();

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 1000);
  };

  // WebSocket connection and initialization
  const connectWebSocket = (newRoomId) => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Create a new WebSocket connection
    const newWs = new WebSocket("ws://localhost:8080/ws/");

    newWs.onopen = () => {
      console.log("WebSocket connection opened");
      newWs.send(`JOIN:${newRoomId}`);
      const userEmail =
        JSON.parse(sessionStorage.getItem("user"))?.email || "Unknown";
      newWs.send(`Email:${userEmail}`);
      wsRef.current = newWs; // Store the WebSocket in the ref
    };

    newWs.onmessage = (event) => {
      const message = event.data;
      if (message.startsWith("USERS:")) {
        const usersList = message.replace("USERS:", "").split(",");
        setUsers(usersList.filter((user) => user.trim() !== ""));

        setIsUserListReceived(true); // Enable mouse tracking
      } else if (message.startsWith("Mouse:")) {
        // The message format is "Mouse:x,y:Email:xyz@gmail.com"
        const parts = message.split(":Email:");

        // Extract x, y coordinates and email
        const coordinatesPart = parts[0].replace("Mouse:", "");
        const coordinates = coordinatesPart.split(",");
        const x = parseInt(coordinates[0], 10);
        const y = parseInt(coordinates[1], 10);
        const email = parts[1];

        // Only set mouse position if the email is not the current user's email
        if (email !== userEmailForMouse) {
          setMousePosition({ x, y });
          setMouseEmail(email); // Store the email for other users
        }

        console.log(`Mouse Position - X: ${x}, Y: ${y}, Email: ${email}`);
      } else if (message.startsWith("DISCONNECT:")) {
        const disconnectedUser = message.replace("DISCONNECT:", "").trim();
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user !== disconnectedUser)
        );

        showToast(`User ${disconnectedUser} disconnected`);
      } else {
        suppressEditorChanges.current = true;
        // Update editor content if it differs
        if (
          editorRef.current &&
          message &&
          editorRef.current.getValue() !== message
        ) {
          editorRef.current.setValue(message);
        }
        suppressEditorChanges.current = false;
      }
    };

    newWs.onclose = () => {
      console.log("WebSocket closed");
      wsRef.current = null;
      // Try to reconnect after a short delay
      setTimeout(() => connectWebSocket(newRoomId), 1000);
    };
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX + window.scrollX; // Adjusted for horizontal scroll
      const y = event.clientY + window.scrollY;

      if (
        isUserListReceived &&
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN
      ) {
        console.log(
          `Sending Mouse Position: Mouse:${x},${y}:Email:${userEmailForMouse}`
        );

        // Send mouse position through WebSocket
        wsRef.current.send(`Mouse:${x},${y}:Email:${userEmailForMouse}`);
      }
    };

    if (isUserListReceived) {
      console.log("Mouse tracking enabled.");
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isUserListReceived]);

  // Loading Monaco Editor script dynamically
  const loadMonaco = () => {
    const loaderScript = document.createElement("script");
    loaderScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/loader.min.js";
    loaderScript.onload = () => {
      require.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs",
        },
      });
      require(["vs/editor/editor.main"], function () {
        window.monaco = monaco;
        initializeEditor();
      });
    };
    document.body.appendChild(loaderScript);
  };

  // Monaco Editor Initialization
  const initializeEditor = () => {
    if (!containerRef.current || editorRef.current) return;

    editorRef.current = monaco.editor.create(containerRef.current, {
      value: "// Start coding here...\n",
      language,
      theme: "vs-dark",
      automaticLayout: true,
    });

    setEditorInstance(editorRef.current);

    editorRef.current.onDidChangeModelContent(() => {
      // Only send content when the WebSocket is open and not suppressing changes
      if (
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN &&
        !suppressEditorChanges.current
      ) {
        console.log("Sending content to WebSocket...");
        const content = editorRef.current.getValue();
        wsRef.current.send(content); // Send editor content to server
      } else {
        console.log("ws = ", wsRef.current);
        console.log("suppressing changes = ", !suppressEditorChanges.current);
        console.log("WebSocket is not ready.");
      }
    });
  };

  useEffect(() => {
    if (window.monaco) {
      initializeEditor();
    } else {
      loadMonaco();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [language]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleRunClick = async () => {
    // First, make the terminal visible and scroll into view
    setIsTerminalVisible(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        terminalRef.current.scrollIntoView({ behavior: "smooth" });
        resolve();
      }, 100);
    });

    // Then, execute the rest of the function
    if (!editorInstance) return; // Check if editorInstance is available
    const sourceCode = editorInstance.getValue(); // Get the code from the Monaco editor
    const stdinBox = document.getElementById("stdinBox");
    const userInput = stdinBox ? stdinBox.value : "";
    const outputBox = document.getElementById("outputBox");
    const languageDropdown = document.getElementById("languageDropdown");

    const requestBody = {
      language: languageDropdown.value,
      version: "*",
      files: [{ content: sourceCode }],
      stdin: userInput || "",
    };

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.run && data.run.stdout) {
          outputBox.value = data.run.stdout;
        } else if (data.run && data.run.stderr) {
          outputBox.value = "Error: " + data.run.stderr;
        } else {
          outputBox.value = "Unknown error occurred.";
        }
      })
      .catch((error) => {
        console.error("Error executing code:", error);
        outputBox.value = "API request failed.";
      });
  };

  return (
    <>
      {mouseEmail && mouseEmail !== userEmailForMouse && (
        <MouseTracker
          x={mousePosition.x}
          y={mousePosition.y}
          email={mouseEmail}
        />
      )}
      <div className="dashboard-container d-flex">
        {showContent ? (
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            isLoggedIn={isLoggedIn}
            users={users}
          />
        ) : (
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            isLoggedIn={isLoggedIn}
          />
        )}
        <div
          className={`main-content ${
            isSidebarVisible ? "expanded" : "collapsed"
          }`}
        >
          <SearchBar
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
          {window.location.pathname === "/dashboard" ? (
            <div>
              {/* Code Editor Card */}
              <div className="card text-white mb-3">
                <div className="card-header mt-2 d-flex justify-content-center align-items-center">
                  {/* Add Post Button */}
                  <AddPostButton />
                  {/* Language Dropdown */}
                  {/* <DropdownLanguage
                  options={languages}
                  selectedOption={selectedLanguage}
                  onOptionSelect={(lang) => setSelectedLanguage(lang)}
                /> */}

                  <select
                    id="languageDropdown"
                    className="dropdown ms-2 custom-btn"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="csharp">C#</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="ruby">Ruby</option>
                    <option value="go">Go</option>
                    <option value="swift">Swift</option>
                    <option value="rust">Rust</option>
                    <option value="kotlin">Kotlin</option>
                    <option value="php">PHP</option>
                    <option value="sql">SQL</option>
                    <option value="bash">Shell</option>
                    <option value="haskell">Haskell</option>
                    <option value="scala">Scala</option>
                    <option value="perl">Perl</option>
                    <option value="lua">Lua</option>
                  </select>

                  {/* Run Button */}
                  <RunButton onClick={handleRunClick} />
                </div>

                {/* Code Editor Textarea */}
                <div className="card-body input-field p-3">
                  <CodeEditor containerRef={containerRef} />
                </div>
              </div>

              {/* Terminal Card with Bootstrap Tabs */}
              {isTerminalVisible && (
                <div className="card text-white" ref={terminalRef}>
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <ul className="nav nav-tabs-bordered">
                      <li className="nav-item">
                        <span
                          className={`nav-link ${
                            activeTab === "output" ? "active" : ""
                          } fw-bolder`}
                          onClick={() => setActiveTab("output")}
                        >
                          Output
                        </span>
                      </li>
                      <li className="nav-item">
                        <span
                          className={`nav-link ${
                            activeTab === "input" ? "active" : ""
                          } fw-bolder`}
                          onClick={() => setActiveTab("input")}
                        >
                          Input
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="btn-close btn-sm"
                      style={{ filter: "invert(1)" }}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setIsTerminalVisible(false)}
                    ></button>
                  </div>
                  <div className="card-body">
                    <div
                      className={`tab-pane fade ${
                        activeTab === "output" ? "show active" : ""
                      }`}
                      id="output"
                    >
                      <textarea
                        id="outputBox"
                        className="form-control"
                        readOnly
                        placeholder="Output will appear here..."
                        rows="6"
                      ></textarea>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        activeTab === "input" ? "show active" : ""
                      }`}
                      id="input"
                    >
                      <textarea
                        id="stdinBox"
                        className="form-control"
                        placeholder="Enter input for your code here..."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            children
          )}
          <Toast message={toastMessage} />
          <AddPostModal />
          <JoinModal
            roomId={roomId}
            setRoomId={setRoomId}
            connectWebSocket={connectWebSocket}
          />
          <CreateRoom
            setRoomId={setRoomId}
            connectWebSocket={connectWebSocket}
            generateRoomId={generateRoomId}
          />
          <ProfileSetting />
          <AddReview />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainContent;
