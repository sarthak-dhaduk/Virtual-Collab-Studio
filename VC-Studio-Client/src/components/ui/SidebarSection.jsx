import React from "react";
import { Link } from "react-router-dom";

const SidebarSection = ({
  title,
  links,
  isWorkspace,
  isOpen,
  toggleSection,
  currentPath, // Receive the current path
}) => {
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
            }`} // Add active class conditionally
          >
            {link.icon && <span className="item-icon">{link.icon}</span>}
            {isWorkspace ? (
              <span className="workspace-item">{link.label}</span>
            ) : (
              <Link to={link.path || "#"} className="item-link">
                {link.label}
              </Link>
            )}
          </li>
        ))}
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
                console.log("Create New Workspace clicked!");
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