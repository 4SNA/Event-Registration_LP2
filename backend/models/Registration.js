const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must not exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    event: {
      type: String,
      required: [true, "Event selection is required"],
      enum: {
        values: [
          "Tech Conference 2026",
          "AI & ML Workshop",
          "Web Development Bootcamp",
          "Cloud Computing Summit",
          "Cybersecurity Seminar",
        ],
        message: "Please select a valid event",
      },
    },
    organization: {
      type: String,
      trim: true,
      default: "",
    },
    dietaryPreference: {
      type: String,
      enum: ["none", "vegetarian", "vegan", "gluten-free"],
      default: "none",
    },
    additionalNotes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes must not exceed 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate registrations for the same event
registrationSchema.index({ email: 1, event: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
