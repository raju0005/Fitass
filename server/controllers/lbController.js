import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const getLeaderboard = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().sort({ score: -1 }).limit(3);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
    }
});
export {getLeaderboard}