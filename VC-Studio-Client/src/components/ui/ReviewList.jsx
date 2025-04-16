import React, { useState, useEffect, useCallback } from "react";
import { getUserSession } from "../../sessionUtils";

const ReviewList = ({ blogId, onReviewChange }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = getUserSession();

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:8080/api/review/getBlogReviews/${blogId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.message || 'Failed to fetch reviews');
            }
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setError(error.message || "Failed to load reviews. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    useEffect(() => {
        fetchReviews();
        if (onReviewChange) {
            onReviewChange(fetchReviews);
        }
    }, [blogId, fetchReviews, onReviewChange]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="review-list">
            <ul className="list-unstyled">
                {reviews.length === 0 ? (
                    <li className="d-flex align-items-center justify-content-center p-3">
                        <p className="text-muted mb-0">No reviews yet. Be the first to review!</p>
                    </li>
                ) : (
                    reviews.map((review, index) => (
                        <li key={review._id || index} className="d-flex align-items-center mb-2 p-3">
                            <div
                                className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle me-2"
                                style={{ width: "48px", height: "48px" }}
                            >
                                {review.username ? review.username[0].toUpperCase() : 'U'}
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>{review.username || 'Unknown User'}</strong>
                                    <small className="text-muted">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </small>
                                </div>
                                <div className="d-flex align-items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            width="16"
                                            height="16"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill={i < review.RatingValue ? "#FFD700" : "#E4E5E9"}
                                            stroke="#FFD700"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M12 2l3.091 6.268L22 9.27l-4.908 4.781 1.156 7.024L12 17.435l-6.248 3.64L7.908 14.05 3 9.27l6.909-1.001L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))
                )}
                <li className="d-flex align-items-center justify-content-center p-3">
                    <button
                        className="btn text-light"
                        data-bs-toggle="modal"
                        data-bs-target="#addreviewmodal"
                        style={{
                            backgroundColor: "#0D0F10",
                            borderColor: "#0D0F10",
                        }}
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
        </div>
    );
};

export default ReviewList;
