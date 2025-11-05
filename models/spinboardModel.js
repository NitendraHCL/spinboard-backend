import mongoose from "mongoose";

const spinboardSchema = new mongoose.Schema({
  loginId: { type: String, required: true, unique: true },
  participants: [String],
}, { timestamps: true });

const Spinboard = mongoose.model("Spinboard", spinboardSchema);
export default Spinboard;
