import express from "express";
import User from "../models/User.js";
import Application from "../models/Application.js";

const router = express.Router();

// ─── GET /api/users ───────────────────────────────────────────────────────────
// Get all users (admin/provider use)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/users/:id ───────────────────────────────────────────────────────
// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── PUT /api/users/:id ───────────────────────────────────────────────────────
// Update user profile
router.put("/:id", async (req, res) => {
  try {
    // Do not allow password updates through this route
    // Do not allow role changes through this route
    const { name, bio, location, profileImage, skills } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio, location, profileImage, skills },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── DELETE /api/users/:id ────────────────────────────────────────────────────
// Delete a user account
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/users/:id/skills ────────────────────────────────────────────────
// Get a student's skill list
router.get("/:id/skills", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name skills");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Skills fetched successfully", data: user.skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/users/:id/statistics ───────────────────────────────────────────
// Get a student's statistics
router.get("/:id/statistics", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Count how many applications this student has made
    const totalApplications = await Application.countDocuments({ student: req.params.id });
    const acceptedApplications = await Application.countDocuments({
      student: req.params.id,
      status: "accepted",
    });
    const completedApplications = await Application.countDocuments({
      student: req.params.id,
      status: "completed",
    });

    res.json({
      message: "Statistics fetched successfully",
      data: {
        points: user.points,
        completedCourses: user.completedCourses.length,
        completedProjects: user.completedProjects,
        totalApplications,
        acceptedApplications,
        completedApplications,
        totalSkills: user.skills.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;