import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // student | provider | admin
    role: {
      type: String,
      enum: ["student", "provider", "admin"],
      default: "student",
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    // Array of skill names the student has learned
    // Example: ["JavaScript", "React", "CSS"]
    skills: {
      type: [String],
      default: [],
    },

    // Total points earned from completing courses
    points: {
      type: Number,
      default: 0,
    },

    // Array of course IDs the student has completed
    completedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    // Number of projects the student has completed
    completedProjects: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;