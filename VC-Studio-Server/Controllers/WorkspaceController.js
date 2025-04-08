import express from "express";
import Workspace from "../Models/WorkspaceModel.js";

const router = express.Router();
const MAX_WORKSPACES_PER_ACCOUNT = 5;

// Get all workspaces for a specific email
router.get("/getAllWorkspace", async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: "Email parameter is required" });
    }

    const workspaces = await Workspace.find({ Email: email });
    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error occurred while fetching workspaces:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Get single workspace by email and ID
router.get("/getSingleWorkspace", async (req, res) => {
  try {
    const { email, id } = req.query;
    
    if (!email || !id) {
      return res.status(400).json({ message: "Both email and id parameters are required" });
    }

    const workspace = await Workspace.findOne({ 
      _id: id,
      Email: email 
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    res.status(200).json(workspace);
  } catch (error) {
    console.error("Error occurred while fetching workspace:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Create new workspace with 5-workspace limit check
router.post("/createWorkspace", async (req, res) => {
  try {
    const { _id, Email, ProgrammingLanguage, CodeSnippet } = req.body;

    // Validate input fields
    if (!_id || !Email || !ProgrammingLanguage) {
      return res.status(400).json({ 
        message: "ID, Email and ProgrammingLanguage are required" 
      });
    }

    // Check if workspace with this ID already exists
    const existingWorkspace = await Workspace.findById(_id);
    if (existingWorkspace) {
      return res.status(400).json({ message: "Workspace with this ID already exists" });
    }

    // Check current workspace count for this email
    const workspaceCount = await Workspace.countDocuments({ Email: Email });
    if (workspaceCount >= MAX_WORKSPACES_PER_ACCOUNT) {
      return res.status(400).json({ 
        message: `Cannot create more than ${MAX_WORKSPACES_PER_ACCOUNT} workspaces per account`,
        maxAllowed: MAX_WORKSPACES_PER_ACCOUNT,
        currentCount: workspaceCount
      });
    }

    // Create a new workspace
    const newWorkspace = new Workspace({
      _id,
      Email,
      ProgrammingLanguage,
      CodeSnippet: CodeSnippet || null
    });

    // Save the new workspace to the database
    await newWorkspace.save();

    res.status(201).json({ 
      message: "Workspace created successfully",
      workspace: newWorkspace,
      currentCount: workspaceCount + 1
    });
  } catch (error) {
    console.error("Error occurred while creating workspace:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Update workspace by email and ID
router.put("/updateWorkspace", async (req, res) => {
  try {
    const { id, Email, ProgrammingLanguage, CodeSnippet } = req.body;

    // Validate input fields
    if (!id || !Email || !ProgrammingLanguage) {
      return res.status(400).json({ 
        message: "ID, Email and ProgrammingLanguage are required" 
      });
    }

    const updatedWorkspace = await Workspace.findOneAndUpdate(
      {
        _id: id,
        Email: Email
      },
      {
        ProgrammingLanguage,
        CodeSnippet: CodeSnippet || null
      },
      { new: true }
    );

    if (!updatedWorkspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.status(200).json({
      message: "Workspace updated successfully",
      workspace: updatedWorkspace
    });
  } catch (error) {
    console.error("Error occurred while updating workspace:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;