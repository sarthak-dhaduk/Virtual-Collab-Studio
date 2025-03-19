import React from "react";

const AddPostButton = () => {
    return (
        <button className="btn d-flex align-items-center text-light custom-btn" data-bs-toggle="modal" data-bs-target="#addpostmodal">
            <span style={{ color: "#686B6E" }}>Add Post</span>
            <svg
                className="ms-2"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 6V10M10 10V14M10 10H14M10 10H6M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                    stroke="#686B6E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
};

export default AddPostButton;
