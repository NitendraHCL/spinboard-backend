// models/Spinboard.js
import mongoose from "mongoose";

const SpinboardSchema = new mongoose.Schema({
  loginId: { type: String, required: true, unique: true, index: true },
  users: { type: [String], required: true }
}, { timestamps: true });

export default mongoose.models.Spinboard || mongoose.model("Spinboard", SpinboardSchema);
