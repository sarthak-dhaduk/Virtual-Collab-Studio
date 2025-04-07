import React from "react";

const RunButton = ({ onClick }) => {
    return (
        <button
            className="btn ms-2 d-flex align-items-center text-light custom-btn"
            onClick={onClick}
            style={{
                borderColor: "#0D0F10",
                borderRadius: "16px",
                appearance: "none",
                outline: "none",
                boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.1)",
                padding: "9px 14px"
            }}
        >
            <span style={{ color: "#686B6E" }}>Run</span>
            <svg
                className="ms-2"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 4.07381V15.9262C1 18.208 3.4464 19.6545 5.44576 18.5548L17.8138 11.7524C19.1953 10.9926 19.1953 9.00742 17.8138 8.24757L5.44575 1.44516C3.4464 0.345517 1 1.79201 1 4.07381Z"
                    stroke="#686B6E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
};

export default RunButton;
