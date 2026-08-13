import express from "express";
import Application from "../models/Application.js";
import User from "../models/User.js";

const router = express.Router();

// ─── POST /api/applications ───────────────────────────────────────────────────
// Student applies to an opportunity
router.post("/", async (req, res) => {
  try {
    const { student, opportunity, coverMessage } = req.body;

    if (!student || !opportunity) {
      return res.status(400).json({ message: "Student and opportunity are required" });
    }

    // Check if student already applied to this opportunity
    const existingApplication = await Application.findOne({ student, opportunity });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied to this opportunity" });
    }

    const application = await Application.create({ student, opportunity, coverMessage });

    // Populate for a nicer response
    const populated = await Application.findById(application._id)
      .populate("student", "name email")
      .populate("opportunity", "title type");

    res.status(201).json({ message: "Application submitted successfully", data: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/applications/student/:studentId ─────────────────────────────────
// Get all applications made by a specific student
router.get("/student/:studentId", async (req, res) => {
  try {
    const applications = await Application.find({ student: req.params.studentId })
      .populate("opportunity", "title type location remote payment status provider")
      .sort({ appliedAt: -1 });

    res.json({ message: "Student applications fetched successfully", data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/applications/opportunity/:opportunityId ─────────────────────────
// Provider views all applicants for their opportunity
router.get("/opportunity/:opportunityId", async (req, res) => {
  try {
    const applications = await Application.find({ opportunity: req.params.opportunityId })
      .populate("student", "name email skills points bio location")
      .sort({ appliedAt: -1 });

    res.json({ message: "Opportunity applications fetched successfully", data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── PUT /api/applications/:id/status ────────────────────────────────────────
// Provider updates the status of an application
// Also handles the "completed" status which adds experience to the student
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["applied", "reviewing", "accepted", "rejected", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    // If the project is marked as completed, increment the student's completed projects
    if (status === "completed") {
      await User.findByIdAndUpdate(application.student, {
        $inc: { completedProjects: 1, points: 200 },
      });
    }

    const updated = await Application.findById(req.params.id)
      .populate("student", "name email")
      .populate("opportunity", "title type");

    res.json({ message: `Application status updated to "${status}"`, data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;