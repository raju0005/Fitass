import Steps from "../models/stepModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

const TotalSteps = asyncHandler(async (req, res) => {
    const { userId, stepsToAdd } = req.body;


    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    let stepRecord = await Steps.findOne({ user: userId });
    if (stepRecord) {
        stepRecord.TotalSteps = stepsToAdd;
    } else {
        stepRecord = new Steps({ user: userId, TotalSteps: stepsToAdd });
        user.steps.push(stepRecord._id);
    }
    await stepRecord.save();
    await user.save();

    res.json({
        success: true,
        message: 'Steps updated successfully',
        data: stepRecord
    });
});


const getSteps = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const steps = await Steps.findOne({ user: id });

        if (!steps) {

            return res.json({ TotalSteps: 0 });
        }

        res.json(steps);
    } catch (error) {
        console.error("Error in getSteps:", error); // Log the error
        res.status(500).json({ success: false, message: error.message });
    }
});

const addSteps = asyncHandler(async (req, res) => {
    const { userId, stepsToAdd } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    
    let stepRecord = await Steps.findOne({ user: userId });
    if (stepRecord) {
        
        
        stepRecord.stepsDone += stepsToAdd; 
    } else {
        
        stepRecord = new Steps({
            user: userId,
            TotalSteps: stepsToAdd,
            stepsDone: stepsToAdd
        });
        user.steps.push(stepRecord._id);
    }


    await stepRecord.save();
    if (!stepRecord._id) await user.save();

    res.json({
        success: true,
        message: 'Steps added successfully',
        data: stepRecord
    });
});






export { TotalSteps, getSteps,addSteps };
