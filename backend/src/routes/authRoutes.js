import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ─── POST /api/auth/register ──────────────────────────────────────────────────
// Create a new user account
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    // Only allow students and providers to register normally
    // Admins are created via the seed script
    if (role && role === "admin") {
      return res.status(400).json({ message: "Admin accounts cannot be created via registration" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    });

    // Return user info without the password
    res.status(201).json({
      message: "Registration successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points,
        skills: user.skills,
        bio: user.bio,
        location: user.location,
        profileImage: user.profileImage,
        completedCourses: user.completedCourses,
        completedProjects: user.completedProjects,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
// Login with email and password
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return user info without the password
    // NOTE: For this hackathon MVP, we return the user object directly.
    // The frontend stores this in localStorage.
    // This is NOT production-grade authentication.
    res.json({
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points,
        skills: user.skills,
        bio: user.bio,
        location: user.location,
        profileImage: user.profileImage,
        completedCourses: user.completedCourses,
        completedProjects: user.completedProjects,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
