import React from "react";

const CreateRoom = () => {
    return (
        <div
            className="modal fade"
            id="create-room-modal"
            tabIndex="-1"
            aria-labelledby="create-room-modal-Label"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="create-room-modal-Label">
                            Workspace Created Successfully
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            style={{ filter: "invert(1)" }}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <span style={{ color: "#9B9C9E", fontSize: "14px" }}>
                            Copy the Workspace ID below to invite others to join the workspace.
                        </span>
                        <div className="mt-2 d-flex align-items-center">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    border: "1px solid #686B6E",
                                    borderRadius: "8px",
                                    backgroundColor: "#1A1D21",
                                }}
                            >
                                <span
                                    className="custom-input-group-text"
                                    id="basic-addon1"
                                    style={{
                                        padding: "8px",
                                        borderRight: "1px solid #686B6E",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 10C19 14.9706 14.9706 19 10 19M19 10C19 5.02944 14.9706 1 10 1M19 10H1M10 19C5.02944 19 1 14.9706 1 10M10 19C11.6569 19 13 14.9706 13 10C13 5.02944 11.6569 1 10 1M10 19C8.34315 19 7 14.9706 7 10C7 5.02944 8.34315 1 10 1M1 10C1 5.02944 5.02944 1 10 1"
                                            stroke="#686B6E"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    style={{
                                        border: "none",
                                        padding: "8px",
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        color: "#9B9C9E",
                                        outline: "none",
                                    }}
                                    placeholder="02JK17SD"
                                    value="02JK17SD"
                                    readOnly
                                    aria-label="Workspace Code"
                                    className="form-control"
                                />
                            </div>
                            <button
                                type="button"
                                className="gradient-button ms-2 "
                                style={{
                                    backgroundColor: "#1A1D21",
                                    borderColor: "#1A1D21",
                                    width: "12rem",
                                    height:"3rem",
                                    borderRadius: "8px",
                                    color: "#9B9C9E",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onClick={() => navigator.clipboard.writeText("02JK17SD")}
                            >
                                <span className="me-2">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.72754 12L11.7275 6M11.0447 14.227L9.45368 15.818V15.818C7.69632 17.5754 4.84707 17.5754 3.08972 15.818L2.1816 14.9099C0.424238 13.1525 0.424238 10.3033 2.1816 8.54594V8.54594L3.77259 6.95495M14.2266 11.045L15.8176 9.45406V9.45406C17.575 7.6967 17.575 4.84746 15.8176 3.0901L14.9095 2.18198C13.1522 0.424621 10.3029 0.424621 8.54556 2.18198V2.18198L6.95457 3.77297"
                                            stroke="#686B6E"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <span style={{ fontSize: "16px" }}>Copy Link</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;