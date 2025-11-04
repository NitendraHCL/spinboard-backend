// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Spinboard from "./Spinboard.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "";

// Connect to MongoDB
async function connectDB() {
  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI not set. Server will not start until it's configured.");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Health check
app.get("/", (req, res) => {
  res.send("🎡 HCL Spinboard Backend is running!");
});

// Create a spinboard (admin)
app.post("/api/create", async (req, res) => {
  try {
    const { loginId, users } = req.body;
    if (!loginId || !Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ error: "Login ID and at least one user required" });
    }

    const existing = await Spinboard.findOne({ loginId });
    if (existing) {
      return res.status(400).json({ error: "Login ID already exists" });
    }

    const sb = await Spinboard.create({ loginId, users });
    return res.json({ message: "Spinboard created", data: sb });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get user list for a spinboard
app.get("/api/spinboard/:id", async (req, res) => {
  try {
    const loginId = req.params.id;
    const sb = await Spinboard.findOne({ loginId });
    if (!sb) return res.status(404).json({ error: "Spinboard not found" });
    return res.json({ users: sb.users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Pick a random winner server-side
app.get("/api/spin/:id", async (req, res) => {
  try {
    const loginId = req.params.id;
    const sb = await Spinboard.findOne({ loginId });
    if (!sb || !sb.users || sb.users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    const idx = Math.floor(Math.random() * sb.users.length);
    const winner = sb.users[idx];
    return res.json({ winner });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Start
app.listen(PORT, async () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
  if (!process.env.MONGODB_URI) {
    console.warn("⚠️ Warning: MONGODB_URI is not set. Connect your Atlas URI in Render environment variables.");
  } else {
    await connectDB();
  }
});
