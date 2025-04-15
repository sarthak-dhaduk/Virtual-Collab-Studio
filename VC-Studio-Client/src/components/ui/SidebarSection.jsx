import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarSection = ({
  setRoomId,
  connectWebSocket,
  generateRoomId,
  createNewWorkspace,
  setWorkspacesID,
  title,
  links,
  isWorkspace,
  isOpen,
  toggleSection,
  currentPath, // Receive the current path
  signInButton, // Add this prop to handle the sign in button
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [loadingWorkspaceId, setLoadingWorkspaceId] = useState(null);

  const handleCreateRoom = async () => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const generatedRoomId = generateRoomId();
      await createNewWorkspace(generatedRoomId);
      setRoomId(generatedRoomId);
      setWorkspacesID(generatedRoomId);
      connectWebSocket(generatedRoomId);
    } catch (error) {
      console.error("Error creating workspace:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="sidebar-section">
      <div
        className="section-title d-flex justify-content-between align-items-center"
        onClick={() => toggleSection(title)}
        style={{ cursor: "pointer" }}
      >
        <span>{title}</span>
        {isWorkspace && (
          <button
            className="gradient-button text-uppercase fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#joinmodal"
          >
            JOIN
          </button>
        )}
      </div>

      <ul
        className="section-list"
        style={{
          maxHeight: isOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        {links.map((link, index) => (
          <li
            key={index}
            className={`section-item ${
              link.path === currentPath ? "active" : ""
            }`}
          >
            {link.icon && <span className="item-icon">{link.icon}</span>}
            {isWorkspace ? (
              <button
                className="bg-transparent border-0 text-start item-link"
                onClick={() => {
                  // Set loading state immediately
                  setLoadingWorkspaceId(link._id);

                  // Execute the original click handler
                  if (link.onClick) link.onClick();

                  // Clear loading state after 1.5 seconds
                  setTimeout(() => {
                    setLoadingWorkspaceId(null);
                  }, 2000);
                }}
                disabled={loadingWorkspaceId === link._id}
              >
                {loadingWorkspaceId === link._id ? "Loading..." : link.label}
              </button>
            ) : (
              <Link to={link.path || "#"} className="item-link">
                {link.label}
              </Link>
            )}
          </li>
        ))}

        {/* Add Sign In button in the General section for non-logged in users */}
        {signInButton && title === "General" && (
          <li className="section-item">
            <Link
              to="/login"
              className="item-link ms-1 d-flex align-items-center"
            >
              <span className="item-icon">
                <svg
                  width="18"
                  height="18"
                  className="icon-shadow"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00097 17.0059H3.00097C1.8964 17.0059 1.00097 16.1104 1.00097 15.0059V3.00586C1.00097 1.90129 1.8964 1.00586 3.00097 1.00586L7.00097 1.00586M6.00097 9.00586L10.001 5.00586M6.00097 9.00586L10.001 13.0059M6.00097 9.00586H17.001"
                    stroke="#686B6E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="ms-2">Sign In</span>
            </Link>
          </li>
        )}

        {isWorkspace && (
          <li className="">
            <button
              className="btn-create-workspace"
              data-bs-toggle="modal"
              data-bs-target="#create-room-modal"
              style={{
                padding: "8px 12px",
                background: "transparent",
                border: "none",
                color: "#686B6E",
                fontSize: "14px",
              }}
              onClick={() => {
                handleCreateRoom();
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5.66667V9M9 9V12.3333M9 9H12.3333M9 9H5.66667M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
                  stroke="#363A3D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="ms-2">Create New Workspace</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarSection;
