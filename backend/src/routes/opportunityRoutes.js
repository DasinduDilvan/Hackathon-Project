import express from "express";
import Opportunity from "../models/Opportunity.js";
import User from "../models/User.js";

const router = express.Router();

// ─── GET /api/opportunities/recommended/:studentId ───────────────────────────
// Get opportunities recommended for a student based on their skills
// IMPORTANT: This route must be defined BEFORE the /:id route
// Otherwise Express will treat "recommended" as an ID
router.get("/recommended/:studentId", async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId).select("skills");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const studentSkills = student.skills;

    // Get all open opportunities
    const opportunities = await Opportunity.find({ status: "open" }).populate(
      "provider",
      "name email"
    );

    // Calculate match percentage for each opportunity
    // Simple algorithm: matched skills / required skills * 100
    const scored = opportunities.map((opp) => {
      const required = opp.requiredSkills;

      // If no skills required, anyone can do it - 100% match
      if (required.length === 0) {
        return { opportunity: opp, matchPercentage: 100 };
      }

      // Count how many required skills the student has
      const matched = required.filter((skill) =>
        studentSkills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
      ).length;

      const matchPercentage = Math.round((matched / required.length) * 100);

      return { opportunity: opp, matchPercentage };
    });

    // Sort by highest match percentage first
    scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({
      message: "Recommended opportunities fetched successfully",
      data: scored,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/opportunities ───────────────────────────────────────────────────
// Get all opportunities with optional filtering
router.get("/", async (req, res) => {
  try {
    const { search, category, type } = req.query;

    // Build filter object
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (search) {
      // Simple text search on title and description
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const opportunities = await Opportunity.find(filter)
      .populate("provider", "name email")
      .sort({ createdAt: -1 });

    res.json({ message: "Opportunities fetched successfully", data: opportunities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/opportunities/:id ───────────────────────────────────────────────
// Get a single opportunity
router.get("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate(
      "provider",
      "name email bio location"
    );

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    res.json({ message: "Opportunity fetched successfully", data: opportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── POST /api/opportunities ──────────────────────────────────────────────────
// Provider creates a new opportunity
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      provider,
      category,
      requiredSkills,
      skillLevel,
      type,
      location,
      remote,
      payment,
      duration,
      deadline,
    } = req.body;

    if (!title || !provider) {
      return res.status(400).json({ message: "Title and provider are required" });
    }

    const opportunity = await Opportunity.create({
      title,
      description,
      provider,
      category,
      requiredSkills,
      skillLevel,
      type,
      location,
      remote,
      payment,
      duration,
      deadline,
    });

    res.status(201).json({ message: "Opportunity created successfully", data: opportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── PUT /api/opportunities/:id ───────────────────────────────────────────────
// Provider updates their opportunity
router.put("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    res.json({ message: "Opportunity updated successfully", data: opportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── DELETE /api/opportunities/:id ────────────────────────────────────────────
// Provider deletes their opportunity
router.delete("/:id", async (req, res) => {
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