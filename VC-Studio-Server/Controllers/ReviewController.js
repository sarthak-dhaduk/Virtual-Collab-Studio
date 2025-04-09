import express from "express";
import Review from "../Models/ReviewModel.js";
import Authentication from "../Models/AuthenticationModel.js";

const router = express.Router();

// Add or update review
router.post("/addReview", async (req, res) => {
    try {
        const { BlogID, Email, RatingValue } = req.body;

        if (!BlogID || !Email || !RatingValue) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user has already reviewed this blog
        const existingReview = await Review.findOne({ BlogID, Email });

        if (existingReview) {
            // Update existing review
            existingReview.RatingValue = RatingValue;
            await existingReview.save();
            return res.status(200).json({
                message: "Review updated successfully",
                review: existingReview
            });
        }

        // Create new review
        const newReview = new Review({
            BlogID,
            Email,
            RatingValue
        });

        await newReview.save();

        res.status(201).json({
            message: "Review added successfully",
            review: newReview
        });
    } catch (error) {
        console.error("Error occurred while adding/updating review:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get reviews for a blog
router.get("/getBlogReviews/:blogId", async (req, res) => {
    try {
        const { blogId } = req.params;
        
        const reviews = await Review.find({ BlogID: blogId });
        
        // Get usernames for reviews
        const reviewsWithUsernames = await Promise.all(reviews.map(async (review) => {
            const user = await Authentication.findOne({ email: review.Email });
            return {
                ...review.toObject(),
                username: user ? user.username : 'Unknown User'
            };
        }));

        res.status(200).json(reviewsWithUsernames);
    } catch (error) {
        console.error("Error occurred while fetching reviews:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get user's review for a specific blog
router.get("/getUserReview", async (req, res) => {
    try {
        const { blogId, email } = req.query;
        
        if (!blogId || !email) {
            return res.status(400).json({ message: "BlogId and Email are required" });
        }

        const review = await Review.findOne({ BlogID: blogId, Email: email });
        res.status(200).json(review);
    } catch (error) {
        console.error("Error occurred while fetching user review:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;