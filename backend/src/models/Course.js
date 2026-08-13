import mongoose from "mongoose";

// Each lesson inside a course
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  // Content can be plain text, markdown, or a URL
  content: {
    type: String,
    default: "",
  },

  order: {
    type: Number,
    required: true,
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // The skill this course teaches
    skill: {
      type: String,
      required: true,
    },

    // beginner | intermediate | advanced
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    lessons: [lessonSchema],

    // Points the student earns after completing this course
    points: {
      type: Number,
      default: 100,
    },

    // Thumbnail image URL (optional)
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;