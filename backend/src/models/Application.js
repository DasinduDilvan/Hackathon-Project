import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // The student who applied
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The opportunity they applied to
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
    },

    coverMessage: {
      type: String,
      default: "",
    },

    // applied | reviewing | accepted | rejected | completed
    status: {
      type: String,
      enum: ["applied", "reviewing", "accepted", "rejected", "completed"],
      default: "applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;