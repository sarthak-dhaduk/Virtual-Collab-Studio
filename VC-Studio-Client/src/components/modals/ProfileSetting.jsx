import React, { useState, useEffect } from "react";
import Input from "../ui/input";
import { getUserSession, updateUserSession } from "../../sessionUtils";

const ProfileSetting = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        contactNumber: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const user = getUserSession();
            if (user) {
                try {
                    // Fetch the password from the server
                    const response = await fetch(`http://localhost:8080/api/auth/get-password/${user._id}`);
                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.message || "Failed to fetch password");
                    }

                    setFormData({
                        username: user.username || "",
                        email: user.email || "",
                        contactNumber: user.contactNumber || "",
                        // password: data.password || "", // Set the fetched password
                        password: "", // Set the fetched password
                    });
                } catch (error) {
                    console.error("Error fetching password:", error);
                    setMessage({
                        type: "error",
                        text: "Failed to fetch password. Please try again.",
                    });
                }
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });
    
        try {
            const user = getUserSession();
            if (!user) {
                throw new Error("User not logged in");
            }
    
            // Validate form data
            if (!formData.username.trim()) {
                throw new Error("Username is required");
            }
            if (!formData.email.trim()) {
                throw new Error("Email is required");
            }
    
            // Prepare the request payload
            const payload = {
                userId: user._id,
                username: formData.username.trim(),
                email: formData.email.trim(),
                contactNumber: formData.contactNumber,
                password: formData.password.trim(),
            };
    
            const response = await fetch("http://localhost:8080/api/auth/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Failed to update profile");
            }
    
            // Update session with new user data
            updateUserSession(data.user);
    
            setMessage({
                type: "success",
                text: "Profile updated successfully!",
            });
    
            // Close the modal and reload the page after a short delay
            setTimeout(() => {
                const modal = document.getElementById('profileSettingsModal');
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
                window.location.reload();
            }, 1500);
    
        } catch (error) {
            console.error("Update profile error:", error);
            setMessage({
                type: "error",
                text: error.message || "Failed to update profile",
            });
        } finally {
            setLoading(false);
        }
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
                            Edit your username, email, contact number, and password as needed, then
                            click 'Save Changes' to keep your profile up to date.
                        </p>
                        <form className="p-3" onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username..."
                                        value={formData.username}
                                        onChange={handleChange}
                                        label="Username"
                                        className="custom-input"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address..."
                                        value={formData.email}
                                        onChange={handleChange}
                                        label="Email Address"
                                        className="custom-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-6">
                                    <Input
                                        type="text"
                                        name="contactNumber"
                                        placeholder="Enter your contact number..."
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        label="Contact Number"
                                        className="custom-input"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative">
                                        <Input
                                            type="text"
                                            name="password"
                                            placeholder="Enter your password..."
                                            value={formData.password}
                                            onChange={handleChange}
                                            label="Password"
                                            className="custom-input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="modal-footer"
                                style={{
                                    borderTop: "none",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: "#7DEA4D",
                                        color: "#0C1132",
                                        borderColor: "#7DEA4D",
                                    }}
                                >
                                    {loading ? "Updating..." : "Save Changes"}
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetting;
