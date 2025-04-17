import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthController from "./Controllers/AuthController.js";
import WorkspaceController from "./Controllers/WorkspaceController.js"
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import setupWebSocketServer from "./Controllers/SocketController.js";
import BlogController from "./Controllers/BlogController.js";
import ReviewController from "./Controllers/ReviewController.js";
import contact from "./Controllers/Contact.js";
import forgotpass from "./Controllers/ForgotPassword.js";

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app); // HTTP server for both API and WebSocket
const port = process.env.PORT || 8080; // Use port from .env or default to 8080

// Dynamic CORS Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
  })
);

// Explicitly handle preflight requests
app.options("*", cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Virtual-Collab-Studio";
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/auth", AuthController);
app.use("/api/contact",contact);
app.use("/api/workspace", WorkspaceController);
app.use("/api/blog", BlogController);
app.use("/api/review", ReviewController);
app.use("/api/pass", forgotpass);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// Setup WebSocket server
setupWebSocketServer(server);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
