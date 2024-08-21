import asyncHandler from "../middlewares/asyncHandler.js";
import Activity from "../models/activityModel.js";

const addActivity = asyncHandler(async (req, res) => {
    const { userId, name, type ,duration} = req.body;

    const newActivity = new Activity({
        user: userId,
        name,
        type,
        duration
    });

    await newActivity.save();

    res.json({
        success: true,
        message: 'Activity added successfully',
        data: newActivity
    });
});

const getActivities = asyncHandler(async (req, res) => {
    const { userId } = req.query;
    try {
        const activities = await Activity.find({ user: userId }).populate('user');
        res.json(activities);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
const deleteActivity = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
        res.status(404).json({ success: false, message: "Activity not found" });
        return;
    }

    res.json({
        success: true,
        message: 'Activity deleted successfully',
    });
});

export { addActivity, getActivities , deleteActivity};
