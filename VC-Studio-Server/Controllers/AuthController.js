import express from "express";
import Authentication from "../Models/AuthenticationModel.js";
import bcrypt from "bcryptjs"

const router = express.Router();

// Function to generate a random 12-character ID
const generateRandomId = () => {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Contact number validation (only 10-digit numbers allowed)
const contactNumberRegex = /^\d{10}$/;

// Password validation (at least 8 characters long, contains letters and numbers)
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;

// Register API
router.post("/register", async (req, res) => {
  try {
    const { username, email, contactNumber, password } = req.body;

    // Validate input fields
    if (!username || !email || !contactNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate contact number format (10 digits)
    if (!contactNumberRegex.test(contactNumber)) {
      return res
        .status(400)
        .json({ message: "Contact number must be a 10-digit number" });
    }

    // Validate password strength (at least 8 characters, contains letters and numbers)
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 2 characters long and contain both letters and numbers",
        });
    }

    // Check if email already exists in the database
    const existingUser = await Authentication.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Authentication({
      _id: generateRandomId(),
      username,
      email,
      contactNumber,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error occurred while registering user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user exists in the database
    const user = await Authentication.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If login is successful, return the user data (excluding password)
    const { password: _, ...userData } = user.toObject(); // Exclude the password
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Update user details
router.put("/update-profile", async (req, res) => {
    try {
        const { userId, username, email, contactNumber, password } = req.body;

        // Validate required fields
        if (!userId) {
            return res.status(400).json({ error: true, message: "User ID is required" });
        }

        // Find user by ID
        const user = await Authentication.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Validate email if provided
        if (email) {
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: true, message: "Invalid email format" });
            }
            // Check if email is already taken by another user
            const existingUser = await Authentication.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ error: true, message: "Email is already registered" });
            }
            user.email = email;
        }
        
        // Update username if provided
        if (username) {
            user.username = username;
        }

        // Update password if provided
        if (password && password.trim() !== "") {
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ 
                    error: true, 
                    message: "Password must be at least 2 characters long and contain both letters and numbers" 
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save updated user
        await user.save();

        // Return updated user data (excluding password)
        const updatedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            contactNumber: user.contactNumber
        };

        res.json({ error: false, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: true, message: "Failed to update profile" });
    }
});

// Get user's password
router.get("/get-password/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Find user by ID
        const user = await Authentication.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Return the hashed password
        res.json({ 
            error: false, 
            password: user.password 
        });
    } catch (error) {
        console.error("Error fetching password:", error);
        res.status(500).json({ error: true, message: "Failed to fetch password" });
    }
});

export default router;
