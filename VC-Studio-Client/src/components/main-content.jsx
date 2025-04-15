import React, { useEffect, useState, useRef, useCallback } from "react";
import Sidebar from "./sidebar";
import SearchBar from "./ui/SearchBar";
import Footer from "./ui/footer";
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
import axios from "axios";
import { getSessionProperty } from "../sessionUtils";

const MainContent = ({ children, isLoggedIn }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 768
  );

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
  const [workspacesdata, setWorkspacesdata] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const userEmail = getSessionProperty("email");

  const userEmailForMouse =
    JSON.parse(sessionStorage.getItem("user"))?.email || "Unknown";

  // Using useRef for WebSocket to ensure it's always available
  const wsRef = useRef(null);

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
      wsRef.current.intentionalClose = true;
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

    // newWs.onclose = () => {
    //   console.log("WebSocket closed");
    //   wsRef.current = null;
    //   // Try to reconnect after a short delay
    //   setTimeout(() => connectWebSocket(newRoomId), 1000);
    // };

    newWs.onclose = () => {
      console.log("WebSocket closed");
      // Reconnect only if the closure was unintentional
      if (!newWs.intentionalClose) {
        setTimeout(() => connectWebSocket(newRoomId), 1000);
      }
      wsRef.current = null;
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

  useEffect(() => {
    if (editorRef.current && workspacesdata) {
      suppressEditorChanges.current = true;
      editorRef.current.setValue(workspacesdata.CodeSnippet || "");
      suppressEditorChanges.current = false;
      setHasUnsavedChanges(false);
    }

    if (workspacesdata && workspacesdata.ProgrammingLanguage) {
      setLanguage(workspacesdata.ProgrammingLanguage);
    }
  }, [workspacesdata]);

  // Monaco Editor Initialization
  const initializeEditor = () => {
    if (!containerRef.current) return;

    // Dispose of existing editor if it exists
    if (editorRef.current) {
      editorRef.current.dispose();
    }

    editorRef.current = monaco.editor.create(containerRef.current, {
      value: workspacesdata?.CodeSnippet || "",
      language: workspacesdata?.ProgrammingLanguage || language,
      theme: "vs-dark",
      automaticLayout: true,
    });

    setEditorInstance(editorRef.current);

    // Set initial unsaved changes state
    if (workspacesdata) {
      setHasUnsavedChanges(
        editorRef.current.getValue() !== workspacesdata.CodeSnippet
      );
    }

    editorRef.current.onDidChangeModelContent(() => {
      if (
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN &&
        !suppressEditorChanges.current
      ) {
        console.log("Sending content to WebSocket...");
        const content = editorRef.current.getValue();
        wsRef.current.send(content); // Send editor content to server
        if (workspacesdata && content !== workspacesdata.CodeSnippet) {
          setHasUnsavedChanges(true);
        } else {
          setHasUnsavedChanges(false);
        }
      } else {
        console.log("ws = ", wsRef.current);
        console.log("suppressing changes = ", !suppressEditorChanges.current);
        console.log("WebSocket is not ready.");
      }
    });
  };

  // Wrap your handleSaveClick in useCallback to prevent unnecessary re-renders
  const handleSaveClick = useCallback(async () => {
    if (!workspacesdata || !editorRef.current) return;

    try {
      const updatedContent = editorRef.current.getValue();
      const userEmail = getSessionProperty("email");

      if (!userEmail) {
        showToast("User email not found. Please login again.");
        return;
      }

      const response = await axios.put(
        "http://localhost:8080/api/workspace/updateWorkspace",
        {
          id: workspacesdata._id, // Using _id from the workspace data
          Email: userEmail,
          ProgrammingLanguage: language, // Using current selected language
          CodeSnippet: updatedContent,
        }
      );

      // Update local state with the updated workspace data
      setWorkspacesdata(response.data.workspace);
      setHasUnsavedChanges(false);
      showToast("Changes saved successfully");

      // Optional: Update the workspaces list in the sidebar if needed
      // You might want to add a state update here if you maintain a list of workspaces
    } catch (error) {
      console.error("Error saving workspace:", error);
      let errorMessage = "Failed to save changes";

      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Workspace not found";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      showToast(errorMessage);
    }
  }, [workspacesdata, editorRef.current, language]); // Add dependencies used in the function

  // Add this useEffect hook in your MainContent component
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check for Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault(); // Prevent default browser save behavior
        handleSaveClick();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener on cleanup
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleSaveClick]); // Add handleSaveClick as a dependency

  const handleSaveClickBtn = async () => {
    if (!workspacesdata || !editorRef.current) return;

    try {
      const updatedContent = editorRef.current.getValue();
      const userEmail = getSessionProperty("email");

      if (!userEmail) {
        showToast("User email not found. Please login again.");
        return;
      }

      const response = await axios.put(
        "http://localhost:8080/api/workspace/updateWorkspace",
        {
          id: workspacesdata._id, // Using _id from the workspace data
          Email: userEmail,
          ProgrammingLanguage: language, // Using current selected language
          CodeSnippet: updatedContent,
        }
      );

      // Update local state with the updated workspace data
      setWorkspacesdata(response.data.workspace);
      setHasUnsavedChanges(false);
      showToast("Changes saved successfully");

      // Optional: Update the workspaces list in the sidebar if needed
      // You might want to add a state update here if you maintain a list of workspaces
    } catch (error) {
      console.error("Error saving workspace:", error);
      let errorMessage = "Failed to save changes";

      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Workspace not found";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      showToast(errorMessage);
    }
  };

  const createNewWorkspace = async (workspaceId) => {
    try {
      const userEmail = getSessionProperty("email");
      if (!userEmail) {
        showToast("User email not found. Please login again.");
        return;
      }

      // Get current editor content and language
      const currentContent = editorRef.current?.getValue() || "";
      const currentLanguage = language;

      const response = await axios.post(
        "http://localhost:8080/api/workspace/createWorkspace",
        {
          _id: workspaceId,
          Email: userEmail,
          ProgrammingLanguage: currentLanguage,
          CodeSnippet: currentContent,
        }
      );

      // Update local state with the new workspace data
      setWorkspacesdata(response.data.workspace);
      showToast("New workspace created successfully");

      // Connect to WebSocket with the new workspace ID
      connectWebSocket(workspaceId);
      setRoomId(workspaceId);

      return response.data.workspace;
    } catch (error) {
      console.error("Error creating workspace:", error);
      let errorMessage = "Failed to create workspace";

      if (error.response) {
        if (error.response.status === 400) {
          if (
            error.response.data.message ===
            "Workspace with this ID already exists"
          ) {
            errorMessage = "Workspace ID already exists";
          } else if (
            error.response.data.message?.includes("Cannot create more than")
          ) {
            errorMessage = error.response.data.message;
          }
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      showToast(errorMessage);
      throw error;
    }
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
  }, [language, workspacesdata]); // Add workspacesdata as a dependency

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
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          isLoggedIn={isLoggedIn}
          users={users}
          setWorkspacesdata={setWorkspacesdata}
          setRoomId={setRoomId}
          connectWebSocket={connectWebSocket}
          generateRoomId={generateRoomId}
          createNewWorkspace={createNewWorkspace}
        />
        <div
          className={`main-content ${
            isSidebarVisible ? "expanded" : "collapsed"
          }`}
        >
          <SearchBar
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
          {window.location.pathname === "/dashboard" ||
          window.location.pathname === "/" ? (
            <div>
              {/* Code Editor Card */}
              <div className="card text-white mb-3">
                <div className="card-header mt-2 d-flex justify-content-center align-items-center">
                  <div className="d-flex">
                    <AddPostButton />
                  </div>
                  <select
                    id="languageDropdown"
                    className="btn d-flex ms-2 align-items-center justify-content-between custom-dropdown"
                    onChange={(e) => setLanguage(e.target.value)}
                    value={language}
                    style={{
                      backgroundColor: "#0e1010",
                      color: "#5f6b6e",
                      borderRadius: "16px",
                      padding: "9px 14px",
                    }} // Updated background color and white text
                  >
                    <div className="dropdown-menu-lang show">
                      <option
                        value="python"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Python
                      </option>
                      <option
                        value="javascript"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        JavaScript
                      </option>
                      <option
                        value="csharp"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        C#
                      </option>
                      <option
                        value="java"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Java
                      </option>
                      <option
                        value="cpp"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        C++
                      </option>
                      <option
                        value="ruby"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Ruby
                      </option>
                      <option
                        value="go"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Go
                      </option>
                      <option
                        value="swift"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Swift
                      </option>
                      <option
                        value="rust"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Rust
                      </option>
                      <option
                        value="kotlin"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Kotlin
                      </option>
                      <option
                        value="php"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        PHP
                      </option>
                      <option
                        value="sql"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        SQL
                      </option>
                      <option
                        value="bash"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Shell
                      </option>
                      <option
                        value="haskell"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Haskell
                      </option>
                      <option
                        value="scala"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Scala
                      </option>
                      <option
                        value="perl"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Perl
                      </option>
                      <option
                        value="lua"
                        style={{ backgroundColor: "#0e1010", color: "#fff" }}
                      >
                        Lua
                      </option>
                    </div>
                  </select>
                  {workspacesdata && (
                    <button
                      className="btn ms-2 d-flex align-items-center text-light custom-btn"
                      style={{
                        borderColor: "#0D0F10",
                        borderRadius: "16px",
                        appearance: "none",
                        outline: "none",
                        boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.1)",
                        padding: "9px 14px",
                      }}
                      onClick={handleSaveClickBtn}
                    >
                      {hasUnsavedChanges && (
                        <div
                          className="mx-2"
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            alignSelf: "center",
                          }}
                        />
                      )}
                      <span style={{ color: "#686B6E" }}>Save</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#686b6e"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-save ms-2"
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                    </button>
                  )}
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
                  <div className="card-body p-0">
                    <div
                      className={`${
                        activeTab === "output" ? "d-block" : "d-none"
                      }`}
                      style={{ height: "200px" }}
                    >
                      <textarea
                        id="outputBox"
                        className="form-control h-100 border-0 rounded-0"
                        readOnly
                        placeholder="Output will appear here..."
                        style={{
                          backgroundColor: "transparent",
                          resize: "none",
                          color: "#fff",
                        }}
                      ></textarea>
                    </div>
                    <div
                      className={`${
                        activeTab === "input" ? "d-block" : "d-none"
                      }`}
                      style={{ height: "200px" }}
                    >
                      <textarea
                        id="stdinBox"
                        className="form-control h-100 border-0 rounded-0"
                        placeholder="Enter input for your code here..."
                        style={{
                          backgroundColor: "transparent",
                          resize: "none",
                          color: "#fff",
                        }}
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
          <AddPostModal editorInstance={editorInstance} />
          <JoinModal
            roomId={roomId}
            setRoomId={setRoomId}
            connectWebSocket={connectWebSocket}
          />
          <CreateRoom setRoomId={roomId} />
          <ProfileSetting />
          <AddReview />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainContent;
