import express from "express";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();

// ─── GET /api/courses ─────────────────────────────────────────────────────────
// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ message: "Courses fetched successfully", data: courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/courses/:id ─────────────────────────────────────────────────────
// Get a single course with all its lessons
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course fetched successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── POST /api/courses ────────────────────────────────────────────────────────
// Create a new course (admin use)
router.post("/", async (req, res) => {
  try {
    const { title, description, skill, level, lessons, points, image } = req.body;

    if (!title || !skill) {
      return res.status(400).json({ message: "Title and skill are required" });
    }

    const course = await Course.create({ title, description, skill, level, lessons, points, image });
    res.status(201).json({ message: "Course created successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── POST /api/courses/:id/complete ──────────────────────────────────────────
// Student completes a course
// This is the core route for the "Learn → Earn points" flow
router.post("/:id/complete", async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "studentId is required" });
    }

    // Find the course
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the student
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if student already completed this course
    const alreadyCompleted = student.completedCourses.some(
      (courseId) => courseId.toString() === course._id.toString()
    );

    if (alreadyCompleted) {
      return res.status(400).json({ message: "You have already completed this course" });
    }

    // Add course to completed list
    student.completedCourses.push(course._id);

    // Add points to student
    student.points += course.points;

    // Add the course skill to student's skill list if not already there
    if (course.skill && !student.skills.includes(course.skill)) {
      student.skills.push(course.skill);
    }

    await student.save();

    // Return updated student without password
    const updatedStudent = await User.findById(studentId).select("-password");

    res.json({
      message: `Course completed! You earned ${course.points} points.`,
      data: {
        student: updatedStudent,
        pointsEarned: course.points,
        newSkill: course.skill,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;