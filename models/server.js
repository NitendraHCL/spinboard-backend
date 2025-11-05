// models/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import spinboardRoutes from "../routes/spinboardRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/spinboards", spinboardRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is healthy and running!" });
});

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || "your-fallback-mongodb-uri";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
