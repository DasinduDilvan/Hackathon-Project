import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

// ─── GET /api/skills ──────────────────────────────────────────────────────────
// Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json({ message: "Skills fetched successfully", data: skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/skills/:id ──────────────────────────────────────────────────────
// Get a single skill by ID
router.get("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill fetched successfully", data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── POST /api/skills ─────────────────────────────────────────────────────────
// Create a new skill (admin use)
router.post("/", async (req, res) => {
  try {
    const { name, category, description, level, points } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required" });
    }

    const skill = await Skill.create({ name, category, description, level, points });
    res.status(201).json({ message: "Skill created successfully", data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── PUT /api/skills/:id ──────────────────────────────────────────────────────
// Update a skill
router.put("/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill updated successfully", data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;