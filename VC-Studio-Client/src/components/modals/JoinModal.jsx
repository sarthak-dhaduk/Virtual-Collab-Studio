import React, { useState } from "react";
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';

const JoinModal = () => {

    const [form, setForm] = useState({ workspace_id: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Workspace ID:", form.workspace_id); 
    };
    return (
        <div
            className="modal fade"
            id="joinmodal"
            tabIndex="-1"
            aria-labelledby="joinmodalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="joinmodalLabel">
                            Join Workspace
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
                            Enter the Workspace ID to connect with your team and collaborate
                            seamlessly on coding projects in real time:
                        </span>
                        <form onSubmit={handleSubmit} className="mt-4 d-flex align-items-center gap-3">
                            {/* Input Field (60%) */}
                            <div className="flex-grow-1" style={{ width: "80%" }}>
                                <Input
                                    type="text"
                                    name="workspace_id"
                                    placeholder="Workspace ID"
                                    value={form.workspace_id}
                                    onChange={handleChange}
                                    className="custom-input w-100"
                                />
                            </div>

                            {/* Button (40%) */}
                            <div style={{ width: "20%" }}>
                                <Button
                                    text={
                                        <>
                                            <svg
                                                width="19"
                                                height="21"
                                                viewBox="0 0 19 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9 13H7C3.68629 13 1 15.6863 1 19M18 17H12M15 20L15 14M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
                                                    stroke="#0C1132"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span className="ms-2"> JOIN </span>

                                        </>
                                    }
                                    style={{
                                        backgroundColor: "#7DEA4D",
                                        color: "#0C1132",
                                        borderColor: "#7DEA4D",
                                        borderRadius: "12px",
                                        width: "100% ",
                                    }}
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="btn-main d-flex align-items-center w-100 justify-content-center"
                                />
                            </div>
                        </form>


                        
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.333008 7.00065C0.333008 3.31875 3.31778 0.333984 6.99967 0.333984C10.6816 0.333984 13.6663 3.31875 13.6663 7.00065C13.6663 10.6826 10.6816 13.6673 6.99967 13.6673C3.31778 13.6673 0.333008 10.6826 0.333008 7.00065ZM6.99967 3.66732C6.63148 3.66732 6.33301 3.96579 6.33301 4.33398C6.33301 4.70217 6.63148 5.00065 6.99967 5.00065H7.00634C7.37453 5.00065 7.67301 4.70217 7.67301 4.33398C7.67301 3.96579 7.37453 3.66732 7.00634 3.66732H6.99967ZM7.66634 7.00065C7.66634 6.63246 7.36786 6.33398 6.99967 6.33398C6.63148 6.33398 6.33301 6.63246 6.33301 7.00065V9.66732C6.33301 10.0355 6.63148 10.334 6.99967 10.334C7.36786 10.334 7.66634 10.0355 7.66634 9.66732V7.00065Z"
                                    fill="#686B6E"
                                />
                            </svg>
                            <span style={{ color: "#686B6E", fontSize: "12px" }}>
                                Hint: J45S4Y56
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinModal;
