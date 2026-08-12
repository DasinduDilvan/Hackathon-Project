import express from "express";
import User from "../models/User.js";
import Opportunity from "../models/Opportunity.js";
import Application from "../models/Application.js";
import Course from "../models/Course.js";

const router = express.Router();

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
// Get all users - admin overview
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ message: "All users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/admin/opportunities ────────────────────────────────────────────
// Get all opportunities - admin overview
router.get("/opportunities", async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate("provider", "name email")
      .sort({ createdAt: -1 });

    res.json({ message: "All opportunities fetched successfully", data: opportunities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/admin/statistics ────────────────────────────────────────────────
// Platform-wide statistics for admin dashboard
router.get("/statistics", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalProviders = await User.countDocuments({ role: "provider" });
    const totalOpportunities = await Opportunity.countDocuments();
    const openOpportunities = await Opportunity.countDocuments({ status: "open" });
    const totalApplications = await Application.countDocuments();
    const totalCourses = await Course.countDocuments();
    const acceptedApplications = await Application.countDocuments({ status: "accepted" });
    const completedApplications = await Application.countDocuments({ status: "completed" });

    res.json({
      message: "Statistics fetched successfully",
      data: {
        totalUsers,
        totalStudents,
        totalProviders,
        totalOpportunities,
        openOpportunities,
        totalApplications,
        acceptedApplications,
        completedApplications,
        totalCourses,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── DELETE /api/admin/users/:id ─────────────────────────────────────────────
// Admin removes a user
router.delete("/users/:id", async (req, res) => {
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

// ─── DELETE /api/admin/opportunities/:id ─────────────────────────────────────
// Admin removes an opportunity
router.delete("/opportunities/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    res.json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;