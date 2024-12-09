import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getEarningsReport,
  getReferralEarningsBreakdown,
} from "../controllers/earningController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId/referrals", authMiddleware, getReferralEarningsBreakdown);
router.get("/:userId/earnings", authMiddleware, getEarningsReport);

export default router;
