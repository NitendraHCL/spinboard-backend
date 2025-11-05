import Spinboard from "../models/spinboardModel.js";

export const createSpinboard = async (req, res) => {
  try {
    const { loginId, participants } = req.body;

    if (!loginId || !participants?.length)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await Spinboard.findOne({ loginId });
    if (existing) return res.status(400).json({ message: "Login ID already exists" });

    const newBoard = await Spinboard.create({ loginId, participants });
    res.json({ message: "Spinboard saved successfully", data: newBoard });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSpinboard = async (req, res) => {
  try {
    const board = await Spinboard.findOne({ loginId: req.params.loginId });
    if (!board) return res.status(404).json({ message: "Not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
