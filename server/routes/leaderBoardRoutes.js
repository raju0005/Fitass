import express from "express";
import { getLeaderboard } from "../controllers/lbController.js";




const router = express.Router();
router.route('/').get(getLeaderboard);
export default router;