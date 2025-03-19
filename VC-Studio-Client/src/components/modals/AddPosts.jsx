import React, { useState } from "react";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Textarea from "../../components/ui/textarea";

const AddPosts = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
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
            id="addpostmodal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div
                    className="modal-content"
                    style={{ backgroundColor: "#1A1D21", borderRadius: "16px" }}
                >
                    {/* Modal Header */}
                    <div className="modal-header" style={{ borderBottom: "none" }}>
                        <h5 className="modal-title" id="exampleModalLabel">
                            Create a Code Blog Post
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            style={{ filter: "invert(1)" }}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <p style={{ color: "#9B9C9E" }}>
                            Enter a captivating title and detailed description for your blog
                            post, then click 'Post' to share your insights with the community.
                        </p>
                        <form className="row g-3 p-3" onSubmit={handleSubmit}>
                            {/* Title Input */}
                            <div className="col-md-12 col-12">
                                <Input
                                    type="text"
                                    name="title"
                                    placeholder="Enter title of post..."
                                    value={formData.title}
                                    onChange={handleChange}
                                    label="Title"
                                    className="custom-input"
                                />
                            </div>

                            {/* Description Textarea */}
                            <div className="col-md-12 col-12">
                                <Textarea
                                    name="description"
                                    placeholder="Type your description here..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    label="Description"
                                    className="custom-textarea p-1"
                                />

                            </div>
                        </form>
                    </div>

                    {/* Modal Footer */}
                    <div
                        className="modal-footer"
                        style={{
                            borderTop: "none",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            text={
                                <>
                                    Post
                                    <svg className="ms-2" width="34" height="32" viewBox="0 0 34 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect width="34" height="32" rx="12" fill="#1C1C1E" />
                                        <path
                                            d="M14.2308 18.2692L23.7337 8.76642M9.98664 11.9981L21.6349 8.11532C23.3344 7.54883 24.9512 9.16564 24.3847 10.8651L20.5019 22.5134C19.8895 24.3507 17.3613 24.5304 16.4952 22.7981L14.5548 18.9174C14.3445 18.4967 14.0033 18.1555 13.5826 17.9452L9.70188 16.0048C7.96962 15.1387 8.14929 12.6105 9.98664 11.9981Z"
                                            stroke="#7DEA4D" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </>
                            }
                            onClick={handleSubmit}
                            type="submit"
                            className="btn-main btn-create d-flex align-items-center w-25 justify-content-center"
                           
                        >
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPosts;
