import React, { useState } from "react";

const ReviewList = ({ reviews }) => {
    const [reviewList, setReviewList] = useState(reviews);

    const handleAddReview = () => {
        const newReview = {
            name: "New Reviewer",
            rating: "⭐⭐⭐⭐",
            initial: "N",
        };
        // setReviewList([...reviewList, newReview]);
    };

    return (
        <ul className="list-unstyled">
            {reviewList.map((review, index) => (
                <li key={index} className="d-flex align-items-center mb-2 p-3">
                    <div
                        className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle me-2"
                        style={{ width: "48px", height: "48px" }}
                    >
                        {review.initial}
                    </div>
                    <div>
                        <strong>{review.name}</strong>
                        <p className="mb-0">{review.rating}</p>
                    </div>
                </li>
            ))}
            <li className="d-flex align-items-center justify-content-center p-3">
                <button
                    className="btn text-light"
                    data-bs-toggle="modal"
                    data-bs-target="#addreviewmodal"
                    style={{
                        backgroundColor: "#0D0F10",
                        borderColor: "#0D0F10",
                    }}
                    onClick={handleAddReview}
                >
                    <span
                        className="ms-2"
                        style={{
                            color: "#686B6E",
                            fontSize: "14px",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5.66667V9M9 9V12.3333M9 9H12.3333M9 9H5.66667M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#363A3D" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="ms-2">Add Review</span>
                    </span>
                </button>
            </li>
        </ul>
    );
};

export default ReviewList;
