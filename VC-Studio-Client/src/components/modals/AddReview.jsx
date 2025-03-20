import React, {useState} from "react";

const AddReview = () => {
    const [selectedStars, setSelectedStars] = useState(0);

    const handleStarClick = (index) => {
        setSelectedStars(index + 1); 
    };

    const handleSubmit = () => {
        console.log(`Selected Star Rating: ${selectedStars}`); 
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
                            Rate This Post!
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
                        <span
                            style={{ color: "#9B9C9E", fontSize: "14px" }}
                        >
                            Rate this post to provide feedback and guide the community
                            toward valuable content.
                        </span>
                        <div className="input-field mt-2 d-flex flex-column align-items-start">
                            {/* Label */}
                            <label
                                htmlFor="rating"
                                className="mb-2"
                                style={{ color: "#9B9C9E", fontSize: "14px" }}
                            >
                                Set Your Rating
                            </label>

                            {/* Rating Field (Stars) */}
                            <div
                                id="rating"
                                className="d-flex align-items-center justify-content-center p-2 w-100"
                            >
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        onClick={() => handleStarClick(index)} // Handle click event
                                        width="30"
                                        height="30"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={index < selectedStars ? "#FFD700" : "#E4E5E9"} // Highlight selected stars
                                        stroke="#FFD700"
                                        strokeWidth="1.5"
                                        style={{ cursor: "pointer" }} // Add pointer cursor
                                    >
                                        <path d="M12 2l3.091 6.268L22 9.27l-4.908 4.781 1.156 7.024L12 17.435l-6.248 3.64L7.908 14.05 3 9.27l6.909-1.001L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Cancel and Submit Buttons */}
                            <div className="mt-2 d-flex justify-content-center w-100">
                                <button
                                    className="gradient-button text-uppercase fw-semibold"
                                    type="button"
                                    style={{ height: "3rem", width: "6rem", borderRadius: "12px" }}
                                    data-bs-dismiss="modal"
                                    
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
                                    onClick={handleSubmit} // Handle submit
                                >
                                    Submit
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
