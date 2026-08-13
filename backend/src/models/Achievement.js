import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
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

    // How many points the student needs to unlock this achievement
    pointsRequired: {
      type: Number,
      required: true,
    },

    // Icon name or emoji - keep it simple for the MVP
    icon: {
      type: String,
      default: "🏆",
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;