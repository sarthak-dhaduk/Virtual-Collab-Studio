import express from "express";
import Blog from "../Models/BlogModel.js";
import Authentication from "../Models/AuthenticationModel.js";
import Review from "../Models/ReviewModel.js";

const router = express.Router();

// Create new blog post
router.post("/createBlog", async (req, res) => {
    try {
        const { Email, Title, Description, ProgrammingLanguage, CodeSnippet } = req.body;

        // Validate required fields
        if (!Email || !Title || !Description || !ProgrammingLanguage || !CodeSnippet) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Create new blog post
        const newBlog = new Blog({
            Email,
            Title,
            Description,
            ProgrammingLanguage,
            CodeSnippet
        });

        // Save to database
        await newBlog.save();

        res.status(201).json({
            message: "Blog post created successfully",
            blog: newBlog
        });
    } catch (error) {
        console.error("Error occurred while creating blog post:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get all blogs with username
router.get("/getAllBlogs", async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            if (search.startsWith('@')) {
                // Search by username
                const username = search.substring(1).toLowerCase();
                const users = await Authentication.find({ 
                    username: { $regex: username, $options: 'i' } 
                });
                const userEmails = users.map(user => user.email);
                query = { Email: { $in: userEmails } };
            } else {
                // Search in title, description, and programming language
                query = {
                    $or: [
                        { Title: { $regex: search, $options: 'i' } },
                        { Description: { $regex: search, $options: 'i' } },
                        { ProgrammingLanguage: { $regex: search, $options: 'i' } }
                    ]
                };
            }
        }

        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        
        // Get usernames and ratings for all blogs
        const blogsWithUsernames = await Promise.all(blogs.map(async (blog) => {
            const user = await Authentication.findOne({ email: blog.Email });
            const reviews = await Review.find({ BlogID: blog._id });
            const averageRating = reviews.length > 0 
                ? reviews.reduce((acc, review) => acc + review.RatingValue, 0) / reviews.length 
                : 0;
            return {
                ...blog.toObject(),
                username: user ? user.username : 'Unknown User',
                AverageRating: averageRating
            };
        }));

        // Sort by rating if search starts with @
        if (search?.startsWith('@')) {
            blogsWithUsernames.sort((a, b) => b.AverageRating - a.AverageRating);
        }

        res.status(200).json(blogsWithUsernames);
    } catch (error) {
        console.error("Error occurred while fetching blogs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get blogs by email
router.get("/getBlogsByEmail", async (req, res) => {
    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({ message: "Email parameter is required" });
        }

        const blogs = await Blog.find({ Email: email }).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error occurred while fetching blogs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;
