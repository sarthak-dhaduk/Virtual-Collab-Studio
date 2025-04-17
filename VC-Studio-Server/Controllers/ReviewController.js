import express from "express";
import Review from "../Models/ReviewModel.js";
import Authentication from "../Models/AuthenticationModel.js";
import Blog from "../Models/BlogModel.js";

const router = express.Router();

// Add or update review
router.post("/addReview", async (req, res) => {
    try {
        const { BlogId, UserEmail, RatingValue } = req.body;

        // Validate required fields
        if (!BlogId || !UserEmail || !RatingValue) {
            return res.status(400).json({
                error: true,
                message: "All fields are required"
            });
        }

        // Validate rating value
        if (RatingValue < 1 || RatingValue > 5) {
            return res.status(400).json({
                error: true,
                message: "Rating must be between 1 and 5"
            });
        }

        // Check if user exists
        const user = await Authentication.findOne({ email: UserEmail });
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found"
            });
        }

        // Check if blog exists
        const blog = await Blog.findById(BlogId);
        if (!blog) {
            return res.status(404).json({
                error: true,
                message: "Blog post not found"
            });
        }

        // Check if user has already reviewed this blog
        const existingReview = await Review.findOne({ BlogId, UserEmail });

        if (existingReview) {
            // Update existing review
            existingReview.RatingValue = RatingValue;
            existingReview.username = user.username;
            await existingReview.save();
            return res.status(200).json({
                error: false,
                message: "Review updated successfully",
                review: existingReview
            });
        }

        // Create new review
        const newReview = new Review({
            BlogId,
            UserEmail,
            RatingValue,
            username: user.username
        });

        await newReview.save();

        res.status(201).json({
            error: false,
            message: "Review added successfully",
            review: newReview
        });
    } catch (error) {
        console.error("Error occurred while adding/updating review:", error);
        res.status(500).json({ 
            error: true,
            message: "Failed to add/update review",
            details: error.message 
        });
    }
});

// Get reviews for a blog
router.get("/getBlogReviews/:blogId", async (req, res) => {
    try {
        const { blogId } = req.params;
        
        // Find all reviews for the blog
        const reviews = await Review.find({ BlogId: blogId }).sort({ createdAt: -1 });
        
        // Get usernames for reviews and format the response
        const reviewsWithUsernames = await Promise.all(reviews.map(async (review) => {
            const user = await Authentication.findOne({ email: review.UserEmail });
            return {
                _id: review._id,
                BlogId: review.BlogId,
                UserEmail: review.UserEmail,
                RatingValue: review.RatingValue,
                username: user ? user.username : 'Unknown User',
                createdAt: review.createdAt
            };
        }));

        res.status(200).json(reviewsWithUsernames);
    } catch (error) {
        console.error("Error occurred while fetching reviews:", error);
        res.status(500).json({ 
            error: true,
            message: "Failed to fetch reviews",
            details: error.message 
        });
    }
});

// Get user's review for a specific blog
router.get("/getUserReview", async (req, res) => {
    try {
        const { blogId, email } = req.query;
        
        if (!blogId || !email) {
            return res.status(400).json({ 
                error: true,
                message: "BlogId and Email are required" 
            });
        }

        const review = await Review.findOne({ BlogId: blogId, UserEmail: email });
        if (!review) {
            return res.status(200).json({ 
                error: false,
                message: "No review found",
                review: null 
            });
        }

        res.status(200).json({
            error: false,
            message: "Review found",
            review: review
        });
    } catch (error) {
        console.error("Error occurred while fetching user review:", error);
        res.status(500).json({ 
            error: true,
            message: "Failed to fetch user review",
            details: error.message 
        });
    }
});

// Get average rating for a blog
router.get("/getAverageRating/:blogId", async (req, res) => {
    try {
        const { blogId } = req.params;

        // Fetch all reviews for the blog
        const reviews = await Review.find({ BlogId: blogId });

        // Calculate the average rating
        const averageRating = reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.RatingValue, 0) / reviews.length
            : 0;

        res.status(200).json({ averageRating });
    } catch (error) {
        console.error("Error occurred while calculating average rating:", error);
        res.status(500).json({
            error: true,
            message: "Failed to calculate average rating",
            details: error.message
        });
    }
});

export default router;