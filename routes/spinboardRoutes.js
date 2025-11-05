import express from "express";
import { createSpinboard, getSpinboard } from "../controllers/spinboardController.js";

const router = express.Router();

router.post("/", createSpinboard);
router.get("/:loginId", getSpinboard);

export default router;
