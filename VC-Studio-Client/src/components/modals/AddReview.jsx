import React, { useState, useEffect } from "react";
import { getUserSession } from "../../sessionUtils";

const AddReview = ({ blogId, onReviewAdded }) => {
    const [selectedStars, setSelectedStars] = useState(0);
    const [existingReview, setExistingReview] = useState(null);
    const [currentBlogId, setCurrentBlogId] = useState(null);
    const user = getUserSession();

    // Reset state when blogId changes
    useEffect(() => {
        if (blogId !== currentBlogId) {
            setSelectedStars(0);
            setExistingReview(null);
            setCurrentBlogId(blogId);
        }
    }, [blogId, currentBlogId]);

    useEffect(() => {
        const checkExistingReview = async () => {
            if (!user?.email || !blogId) return;

            try {
                const response = await fetch(`http://localhost:8080/api/review/getUserReview?blogId=${blogId}&email=${user.email}`);
                const data = await response.json();
                if (data) {
                    setExistingReview(data);
                    setSelectedStars(data.RatingValue);
                } else {
                    // Reset if no existing review
                    setExistingReview(null);
                    setSelectedStars(0);
                }
            } catch (error) {
                console.error("Error checking existing review:", error);
            }
        };

        // Only check when modal is shown
        const modal = document.getElementById("addreviewmodal");
        if (modal) {
            const handleModalShow = () => {
                // Reset state before checking for existing review
                setSelectedStars(0);
                setExistingReview(null);
                checkExistingReview();
            };
            
            const handleModalHide = () => {
                // Reset state when modal is hidden
                setSelectedStars(0);
                setExistingReview(null);
                setCurrentBlogId(null);
            };

            modal.addEventListener('shown.bs.modal', handleModalShow);
            modal.addEventListener('hidden.bs.modal', handleModalHide);

            return () => {
                modal.removeEventListener('shown.bs.modal', handleModalShow);
                modal.removeEventListener('hidden.bs.modal', handleModalHide);
            };
        }
    }, [blogId, user?.email]);

    const handleStarClick = (index) => {
        setSelectedStars(index + 1);
    };

    const closeModal = () => {
        // Close the modal
        const modal = document.getElementById("addreviewmodal");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
            modalInstance.hide();
        }

        // Remove the modal backdrop
        const remainingBackdrops = document.querySelectorAll('.modal-backdrop');
        remainingBackdrops.forEach(backdrop => backdrop.remove());
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');

        // Reset state
        setSelectedStars(0);
        setExistingReview(null);
        setCurrentBlogId(null);
    };

    const handleSubmit = async () => {
        if (!user || !blogId || selectedStars === 0) {
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/review/addReview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    BlogID: blogId,
                    Email: user.email,
                    RatingValue: selectedStars
                }),
            });

            if (response.ok) {
                if (onReviewAdded) {
                    onReviewAdded();
                }
                closeModal();
            } else {
                console.error("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div
            className="modal fade"
            id="addreviewmodal"
            tabIndex="-1"
            aria-labelledby="addreviewmodalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addreviewmodalLabel">
                            {existingReview ? "Update Your Rating!" : "Rate This Post!"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            style={{ filter: "invert(1)" }}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={closeModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <span style={{ color: "#9B9C9E", fontSize: "14px" }}>
                            {existingReview 
                                ? "Update your rating to reflect your current opinion."
                                : "Rate this post to provide feedback and guide the community toward valuable content."}
                        </span>
                        <div className="input-field mt-2 d-flex flex-column align-items-start">
                            <label
                                htmlFor="rating"
                                className="mb-2"
                                style={{ color: "#9B9C9E", fontSize: "14px" }}
                            >
                                {existingReview ? "Update Your Rating" : "Set Your Rating"}
                            </label>

                            <div
                                id="rating"
                                className="d-flex align-items-center justify-content-center p-2 w-100"
                            >
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        onClick={() => handleStarClick(index)}
                                        width="30"
                                        height="30"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={index < selectedStars ? "#FFD700" : "#E4E5E9"}
                                        stroke="#FFD700"
                                        strokeWidth="1.5"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <path d="M12 2l3.091 6.268L22 9.27l-4.908 4.781 1.156 7.024L12 17.435l-6.248 3.64L7.908 14.05 3 9.27l6.909-1.001L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            <div className="mt-2 d-flex justify-content-center w-100">
                                <button
                                    className="gradient-button text-uppercase fw-semibold"
                                    type="button"
                                    style={{ height: "3rem", width: "6rem", borderRadius: "12px" }}
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm ms-3 text-center"
                                    style={{
                                        backgroundColor: "#7DEA4D",
                                        color: "#0C1132",
                                        borderColor: "#7DEA4D",
                                        height: "3rem",
                                        borderRadius: "12px",
                                    }}
                                    onClick={handleSubmit}
                                >
                                    {existingReview ? "Update" : "Submit"}
                                    <svg
                                        className="ms-2"
                                        width="35"
                                        height="33"
                                        viewBox="0 0 35 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="0.5"
                                            y="0.5"
                                            width="34"
                                            height="32"
                                            rx="12"
                                            fill="#1C1C1E"
                                        />
                                        <path
                                            d="M17.3 7.5L20.3593 13.0227L26.3 14.3754L22.25 19.1413L22.8624 25.5L17.3 22.9227L11.7377 25.5L12.35 19.1413L8.30005 14.3754L14.2408 13.0227L17.3 7.5Z"
                                            fill="#7DEA4D"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
