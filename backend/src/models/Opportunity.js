import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
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

    // The user (provider) who created this opportunity
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // web | design | marketing | data | community | other
    category: {
      type: String,
      default: "other",
    },

    // Skills the student needs for this opportunity
    // Example: ["React", "JavaScript"]
    requiredSkills: {
      type: [String],
      default: [],
    },

    // beginner | intermediate | advanced
    skillLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    // internship | part-time | freelance | project | community-task
    type: {
      type: String,
      enum: ["internship", "part-time", "freelance", "project", "community-task"],
      default: "project",
    },

    location: {
      type: String,
      default: "",
    },

    remote: {
      type: Boolean,
      default: false,
    },

    // Payment details as a string - keep it flexible
    // Example: "RM 500/month" or "RM 200 fixed"
    payment: {
      type: String,
      default: "Unpaid",
    },

    // Example: "1 month" or "3 months"
    duration: {
      type: String,
      default: "",
    },

    deadline: {
      type: Date,
      default: null,
    },

    // open | closed
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;