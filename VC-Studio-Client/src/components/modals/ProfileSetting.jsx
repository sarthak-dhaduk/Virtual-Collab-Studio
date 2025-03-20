import React, {useState} from "react";
import Input from "../ui/input";

const ProfileSetting = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        mobileNumber: "",
        Password: "",
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Post Data:", formData);
        };
    return (
        <div
            className="modal fade"
            id="profileSettingsModal"
            tabIndex="-1"
            aria-labelledby="profileSettingsModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ borderRadius: "16px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="profileSettingsModalLabel">
                            Update Your Profile Information
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
                        <p style={{ color: "#9B9C9E" }}>
                            Edit your name, mobile number, and password as needed, then
                            click 'Save Changes' to keep your profile up to date.
                        </p>
                        <form className="p-3">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <Input
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter your first name..."
                                        value={formData.title}
                                        onChange={handleChange}
                                        label="First Name"
                                        className="custom-input"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address..."
                                        value={formData.title}
                                        onChange={handleChange}
                                        label="Email Address"
                                        className="custom-input"
                                    />
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-6">
                                    <Input
                                        type="text"
                                        name="mobileNumber"
                                        placeholder="Enter your mobile number..."
                                        value={formData.title}
                                        onChange={handleChange}
                                        label="Mobile No."
                                        className="custom-input"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        type="Password"
                                        name="Password"
                                        placeholder="Enter your password..."
                                        value={formData.title}
                                        onChange={handleChange}
                                        label="Password"
                                        className="custom-input"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        className="modal-footer"
                        style={{
                            borderTop: "none",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: "#7DEA4D",
                                color: "#0C1132",
                                borderColor: "#7DEA4D",
                            }}
                        >
                            Save Changes
                            <svg
                                width="34"
                                height="32"
                                viewBox="0 0 34 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ms-2"
                            >
                                <rect width="34" height="32" rx="12" fill="#1C1C1E" />
                                <path
                                    d="M15 18C11.6863 18 9 20.6863 9 24M22 24V25M22 24C21.1716 24 20.4216 23.6642 19.8787 23.1213M22 24C22.8284 24 23.5784 23.6642 24.1213 23.1213M25 21H26M25 21C25 20.1716 24.6642 19.4216 24.1213 18.8787M25 21C25 21.8284 24.6642 22.5784 24.1213 23.1213M22 18V17M22 18C22.8284 18 23.5784 18.3358 24.1213 18.8787M22 18C21.1716 18 20.4216 18.3358 19.8787 18.8787M19 21H18M19 21C19 20.1716 19.3358 19.4216 19.8787 18.8787M19 21C19 21.8284 19.3358 22.5784 19.8787 23.1213M24.1213 18.8787L25 18M19.8787 18.8787L19 18M19.8787 23.1213L19 24M24.1213 23.1213L25 24M20 10C20 12.2091 18.2091 14 16 14C13.7909 14 12 12.2091 12 10C12 7.79086 13.7909 6 16 6C18.2091 6 20 7.79086 20 10Z"
                                    stroke="#7DEA4D"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetting;
