// routes/spinboardRoutes.js
import express from "express";
import Spinboard from "../models/Spinboard.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Spinboard route working!" });
});

// Create a new spinboard
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSpinboard = new Spinboard({ name, description });
    await newSpinboard.save();
    res.status(201).json(newSpinboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to create spinboard" });
  }
});

// Get all spinboards
router.get("/", async (req, res) => {
  try {
    const spinboards = await Spinboard.find();
    res.json(spinboards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spinboards" });
  }
});

export default router;
