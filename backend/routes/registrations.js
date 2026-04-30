const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// @route   GET /api/registrations
// @desc    Get all registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching registrations",
      error: error.message,
    });
  }
});

// @route   GET /api/registrations/stats
// @desc    Get registration statistics
router.get("/stats", async (req, res) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    const eventStats = await Registration.aggregate([
      { $group: { _id: "$event", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.status(200).json({
      success: true,
      data: { totalRegistrations, eventStats },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching stats",
      error: error.message,
    });
  }
});

// @route   GET /api/registrations/:id
// @desc    Get a single registration by ID
router.get("/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   POST /api/registrations
// @desc    Create a new registration
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, event, organization, dietaryPreference, additionalNotes } = req.body;

    const registration = await Registration.create({
      fullName,
      email,
      phone,
      event,
      organization,
      dietaryPreference,
      additionalNotes,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: registration,
    });
  } catch (error) {
    // Handle duplicate registration
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for this event with this email.",
      });
    }
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while creating registration",
      error: error.message,
    });
  }
});

// @route   DELETE /api/registrations/:id
// @desc    Delete a registration
router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting registration",
      error: error.message,
    });
  }
});

module.exports = router;
