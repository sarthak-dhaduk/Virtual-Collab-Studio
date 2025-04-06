import { useState, useRef } from "react";
import MainContent from "../../components/main-content";
import AddPostButton from "../../components/ui/AddPostButton";
import DropdownLanguage from "../../components/ui/DropdownLanguage";
import RunButton from "../../components/ui/RunButton";
import CodeEditor from "../../components/ui/CodeEditor";

const DashboardPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const [activeTab, setActiveTab] = useState("output");
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const terminalRef = useRef(null);

  const languages = [
    "JavaScript",
    "C#",
    "Java",
    "Python",
    "Ruby",
    "Swift",
    "Go",
    "PHP",
  ];

  const handleRunClick = () => {
    setIsTerminalVisible(true);
    setTimeout(() => {
      terminalRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <MainContent>
      {/* Code Editor Card */}
      <div className="card text-white mb-3">
        <div className="card-header mt-2 d-flex justify-content-center align-items-center">
          {/* Add Post Button */}
          <AddPostButton />
          {/* Language Dropdown */}
          <DropdownLanguage
            options={languages}
            selectedOption={selectedLanguage}
            onOptionSelect={(lang) => setSelectedLanguage(lang)}
          />

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
              <p className="m-0">Microsoft Windows [Version 10.0.19044.2728]</p>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "input" ? "show active" : ""
              }`}
              id="input"
            >
              <p>C:\Users&gt;</p>
            </div>
          </div>
        </div>
      )}
    </MainContent>
  );
};

export default DashboardPage;
