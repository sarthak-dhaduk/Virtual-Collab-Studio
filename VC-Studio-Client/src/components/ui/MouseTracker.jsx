import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const MouseTracker = ({ x, y, email }) => {
  const [mouseStyle, setMouseStyle] = useState({
    left: `${x + 8}px`,
    top: `${y - 20}px`,
  });

  const [isVisible, setIsVisible] = useState(true); // Controls visibility of the cursor and email
  let timer = null;

  // Update the position and reset timer on mouse movement
  useEffect(() => {
    setMouseStyle({
      left: `${x + 8}px`,
      top: `${y - 0}px`,
    });

    // Clear any existing timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer to hide the cursor and email after 2 seconds of no movement
    timer = setTimeout(() => {
      setIsVisible(false); // Hide cursor and email after 2 seconds of inactivity
    }, 3000);

    setIsVisible(true); // Show cursor and email immediately when movement occurs

    // Cleanup on component unmount or on subsequent renders
    return () => clearTimeout(timer);
  }, [x, y]);

  // SVG arrow cursor
  const arrowCursor = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      height="18"
      width="18"
      style={{
        position: "absolute",
        left: mouseStyle.left,
        top: mouseStyle.top,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0, // Hide or show cursor based on isVisible state
      }}
    >
      <desc>Arrow Cursor 2 Streamline Icon: https://streamlinehq.com</desc>
      <g id="arrow-cursor-2--mouse-select-cursor">
        <path
          id="Union"
          fill="#347dd7"
          fillRule="evenodd"
          d="M13.748 4.973c0 -0.256 -0.143 -0.456 -0.244 -0.572a2.625 2.625 0 0 0 -0.428 -0.38c-0.33 -0.244 -0.786 -0.51 -1.315 -0.78 -1.061 -0.543 -2.48 -1.14 -3.936 -1.655C6.37 1.072 4.858 0.632 3.61 0.408 2.99 0.297 2.412 0.236 1.932 0.253 1.483 0.27 0.99 0.358 0.673 0.674c-0.318 0.318 -0.404 0.813 -0.419 1.26 -0.015 0.48 0.049 1.057 0.163 1.679 0.229 1.247 0.676 2.76 1.197 4.214 0.522 1.456 1.125 2.876 1.672 3.937 0.273 0.529 0.54 0.985 0.784 1.315 0.12 0.163 0.249 0.313 0.38 0.427 0.116 0.1 0.315 0.244 0.572 0.244 0.332 0 0.603 -0.16 0.806 -0.35 0.2 -0.19 0.368 -0.438 0.511 -0.701 0.286 -0.528 0.525 -1.218 0.725 -1.903 0.2 -0.691 0.368 -1.407 0.504 -1.998l0.043 -0.188c0.078 -0.34 0.141 -0.616 0.192 -0.813 0.194 -0.05 0.465 -0.115 0.8 -0.194l0.2 -0.047c0.59 -0.14 1.305 -0.313 1.996 -0.52 0.684 -0.204 1.374 -0.448 1.901 -0.739 0.263 -0.145 0.511 -0.315 0.699 -0.517 0.19 -0.203 0.349 -0.475 0.349 -0.807Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );

  // Email displayed below the arrow
  const emailDisplay = isVisible ? (
    <div
      style={{
        position: "absolute",
        left: mouseStyle.left,
        top: parseInt(mouseStyle.top, 10) + 15 + "px",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(6, 61, 116, 0.7)",
        padding: "4px 8px",
        borderRadius: "4px",
        color: "white",
        fontSize: "12px",
        whiteSpace: "nowrap",
      }}
    >
      {email}
    </div>
  ) : null;

  const trackerElement = (
    <div style={{ position: "absolute", zIndex: 9999, pointerEvents: "none" }}>
      {arrowCursor}
      {emailDisplay}
    </div>
  );

  const rootElement = document.getElementById("root");
  if (rootElement && rootElement.firstChild) {
    return ReactDOM.createPortal(trackerElement, rootElement.firstChild);
  } else {
    return ReactDOM.createPortal(trackerElement, rootElement);
  }
};

export default MouseTracker;
