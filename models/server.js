import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import spinboardRoutes from "./routes/spinboardRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/spinboards", spinboardRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Healthy", message: "Backend is live 🚀" });
});

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
