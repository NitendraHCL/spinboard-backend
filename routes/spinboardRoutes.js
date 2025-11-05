// routes/spinboardRoutes.js
import express from "express";
import Spinboard from "../models/spinboardModel.js";

const router = express.Router();

// ✅ Test Route
router.get("/test", (req, res) => {
  res.json({ message: "Spinboard API is working fine!" });
});

// ✅ Get all spinboards
router.get("/", async (req, res) => {
  try {
    const spinboards = await Spinboard.find();
    res.json(spinboards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Create new spinboard
router.post("/", async (req, res) => {
  try {
    const spinboard = new Spinboard(req.body);
    const saved = await spinboard.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).jso

