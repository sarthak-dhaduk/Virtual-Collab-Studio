import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import MainLogo from "./ui/MainLogo";
import SidebarSection from "./ui/SidebarSection";
import { getSessionProperty } from "../sessionUtils";
import axios from "axios";

const Sidebar = ({
  setRoomId,
  connectWebSocket,
  isSidebarVisible,
  isLoggedIn,
  users,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [openSections, setOpenSections] = useState({
    General: true,
    Members: true,
    Workspace: true,
  });
  const dropdownRef = useRef(null);
  const location = useLocation();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const userEmail = getSessionProperty("email");
        if (userEmail) {
          const response = await axios.get(
            `http://localhost:8080/api/workspace/getAllWorkspace?email=${userEmail}`
          );
          setWorkspaces(response.data);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    if (isLoggedIn) {
      fetchWorkspaces();
    }
  }, [isLoggedIn]);

  const generalSection = {
    title: "General",
    links: [
      {
        currentPath: "active",
        path: "/dashboard",
        label: "Dashboard",
        icon: (
          <svg
            className="icon-shadow"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="System / Terminal">
              <path
                id="Vector"
                d="M17 15H12M7 10L10 12.5L7 15M3 15.8002V8.2002C3 7.08009 3 6.51962 3.21799 6.0918C3.40973 5.71547 3.71547 5.40973 4.0918 5.21799C4.51962 5 5.08009 5 6.2002 5H17.8002C18.9203 5 19.4796 5 19.9074 5.21799C20.2837 5.40973 20.5905 5.71547 20.7822 6.0918C21 6.5192 21 7.07899 21 8.19691V15.8031C21 16.921 21 17.48 20.7822 17.9074C20.5905 18.2837 20.2837 18.5905 19.9074 18.7822C19.48 19 18.921 19 17.8031 19H6.19691C5.07899 19 4.5192 19 4.0918 18.7822C3.71547 18.5905 3.40973 18.2837 3.21799 17.9074C3 17.4796 3 16.9203 3 15.8002Z"
                stroke="#686B6E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ),
      },
      {
        path: "/blog",
        label: "Blog",
        icon: (
          <svg
            className="icon-shadow"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 4.08268V2.83268C1.5 1.91221 2.24619 1.16602 3.16667 1.16602H14.8333C15.7538 1.16602 16.5 1.91221 16.5 2.83268V4.08268M1.5 4.08268H16.5M1.5 4.08268V11.166C1.5 12.0865 2.24619 12.8327 3.16667 12.8327H14.8333C15.7538 12.8327 16.5 12.0865 16.5 11.166V4.08268M4 10.3327H7.33333"
              stroke="#686B6E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        path: "/about",
        label: "About",
        icon: (
          <svg
            className="icon-shadow"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 14V10M10 6H10.01M19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10Z"
              stroke="#686B6E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        path: "/contact",
        label: "Contact",
        icon: (
          <svg
            className="icon-shadow"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5157 18.8677L10.4489 17.4623C7.8093 15.6674 5.53222 13.3903 3.73728 10.7507L2.33185 8.68387C1.07795 6.83989 1.47202 4.33904 3.23221 2.97001L4.13512 2.26775C5.58921 1.13679 7.69774 1.47895 8.71958 3.0117L9.15879 3.67053C9.56561 4.28075 9.61426 5.06218 9.28628 5.71815C8.68289 6.92492 8.71389 8.3517 9.36913 9.53112L9.53391 9.82773C9.96293 10.6 10.5996 11.2367 11.3719 11.6657L11.6685 11.8305C12.8479 12.4857 14.2747 12.5167 15.4814 11.9133C16.1374 11.5853 16.9188 11.634 17.5291 12.0408L18.1879 12.48C19.7206 13.5018 20.0628 15.6104 18.9318 17.0645L18.2296 17.9674C16.8605 19.7276 14.3597 20.1216 12.5157 18.8677Z"
              stroke="#686B6E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
    signInButton: !isLoggedIn,
  };

  const membersSection = {
    title: "Members",
    links:
      Array.isArray(users) && users.length > 0
        ? users.map((user) => ({
            label: user,
            icon: (
              <svg
                className="icon-shadow"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 17.5V17C15 15.3431 13.6569 14 12 14H8C6.34315 14 5 15.3431 5 17V17.5M13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8ZM19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                  stroke="#686B6E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          }))
        : [
            {
              label: "No members found",
              icon: (
                <svg
                  className="icon-shadow"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="#ccc"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="6"
                    y1="10"
                    x2="14"
                    y2="10"
                    stroke="#ccc"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
            },
          ],
  };

  const workspaceSection = {
    title: "Workspace",
    links:
      workspaces.length > 0
        ? workspaces.map((workspace) => ({
            label: workspace._id,
            path: `/workspace/${workspace._id}`,
            icon: (
              <svg
                className="icon-shadow-green"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="15"
                  height="15"
                  rx="3"
                  stroke="#B6F09C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ),
            onClick: () => {
              setRoomId(workspace._id); // Set the room ID
              connectWebSocket(workspace._id); // Connect to WebSocket with this ID
            }
          }))
        : [
            {
              label: "No workspaces found",
              icon: (
                <svg
                  className="icon-shadow"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#ccc"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="5"
                    y1="9"
                    x2="13"
                    y2="9"
                    stroke="#ccc"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
            },
          ],
    isWorkspace: true,
  };

  // Determine which sections to show based on login status
  const sections = isLoggedIn
    ? [generalSection, membersSection, workspaceSection]
    : [generalSection,];

  return (
    <div className={`sidebar ${isSidebarVisible ? "" : "sidebar-hidden"}`}>
      <div
        className="sidebar-header"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <MainLogo />
      </div>
      {sections.map((section, index) => (
        <SidebarSection
          key={index}
          {...section}
          isOpen={openSections[section.title]}
          toggleSection={toggleSection}
          currentPath={location.pathname}
        />
      ))}

      {/* Profile Section - Only show when logged in */}
      {isLoggedIn && (
        <div className="sidebar-profile">
          <div className="profile-avatar">
            {sessionStorage.getItem("user")
              ? JSON.parse(sessionStorage.getItem("user")).username.charAt(0)
              : "U"}
          </div>
          <div className="profile-info">
            <span className="profile-name">
              {sessionStorage.getItem("user")
                ? JSON.parse(sessionStorage.getItem("user")).username
                : "Unknown"}
            </span>
            <span className="profile-role">Dev</span>
          </div>
          <div className="profile-menu" ref={dropdownRef}>
            {/* Settings Icon with Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-sm p-0"
                onClick={toggleDropdown}
                style={{ background: "none", border: "none" }}
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 8C10.1046 8 11 8.89543 11 10C11 11.1046 10.1046 12 9 12C7.89543 12 7 11.1046 7 10C7 8.89543 7.89543 8 9 8Z"
                    stroke="#686B6E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.90136 4.7469C2.96492 4.20624 1.76749 4.52709 1.22684 5.46353L1.1851 5.53583C0.644237 6.47263 0.965207 7.67051 1.902 8.21137L2.1448 8.35155C2.71742 8.68215 3 9.3388 3 10C3 10.6612 2.71742 11.3179 2.1448 11.6485L1.902 11.7886C0.965208 12.3295 0.644237 13.5274 1.1851 14.4642L1.22684 14.5365C1.7675 15.4729 2.96492 15.7938 3.90136 15.2531L4.14546 15.1122C4.71803 14.7816 5.42331 14.863 5.9953 15.1946C6.56711 15.526 7 16.1005 7 16.7614V17.0427C7 18.1237 7.8763 19 8.95728 19H9.04273C10.1237 19 11 18.1237 11 17.0427V16.7614C11 16.1005 11.4329 15.5261 12.0047 15.1946C12.5767 14.863 13.282 14.7816 13.8545 15.1122L14.0986 15.2531C15.0351 15.7938 16.2325 15.4729 16.7732 14.5365L16.8149 14.4642C17.3558 13.5274 17.0348 12.3295 16.098 11.7886L15.8552 11.6485C15.2826 11.3179 15 10.6612 15 10C15 9.3388 15.2826 8.68215 15.8552 8.35155L16.098 8.21137C17.0348 7.6705 17.3558 6.47262 16.8149 5.53581L16.7732 5.46353C16.2325 4.52709 15.0351 4.20623 14.0986 4.74689L13.8545 4.88783C13.282 5.2184 12.5767 5.13699 12.0047 4.80541C11.4329 4.47395 11 3.89952 11 3.23859V2.95728C11 1.8763 10.1237 1 9.04273 1L8.95728 1C7.8763 1 7 1.8763 7 2.95727V3.23858C7 3.89952 6.56711 4.47395 5.9953 4.80542C5.42331 5.13699 4.71803 5.2184 4.14546 4.88783L3.90136 4.7469Z"
                    stroke="#686B6E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dropdown-menu dropdown-menu-dark show">
                  <button
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#profileSettingsModal"
                    onClick={() => {
                      console.log("Profile Settings clicked");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span>Profile Settings</span>
                    <svg
                      width="19"
                      height="21"
                      viewBox="0 0 19 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 13C3.68629 13 1 15.6863 1 19M14 19V20M14 19C13.1716 19 12.4216 18.6642 11.8787 18.1213M14 19C14.8284 19 15.5784 18.6642 16.1213 18.1213M17 16H18M17 16C17 15.1716 16.6642 14.4216 16.1213 13.8787M17 16C17 16.8284 16.6642 17.5784 16.1213 18.1213M14 13V12M14 13C14.8284 13 15.5784 13.3358 16.1213 13.8787M14 13C13.1716 13 12.4216 13.3358 11.8787 13.8787M11 16H10M11 16C11 15.1716 11.3358 14.4216 11.8787 13.8787M11 16C11 16.8284 11.3358 17.5784 11.8787 18.1213M16.1213 13.8787L17 13M11.8787 13.8787L11 13M11.8787 18.1213L11 19M16.1213 18.1213L17 19M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
                        stroke="#686B6E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <hr style={{ color: "#686B6E" }} className="my-1" />
                  <button
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    onClick={() => {
                      // Destroy session and redirect to /sign-in
                      sessionStorage.clear();
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                  >
                    <span>Logout</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 0.999998L15 0.999998C16.1046 0.999998 17 1.89543 17 3L17 15C17 16.1046 16.1046 17 15 17L11 17M12 9L8 13M12 9L8 5M12 9L1 9"
                        stroke="#686B6E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
