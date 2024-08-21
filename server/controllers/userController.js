import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password, age, gender } = req.body;
    if (!username || !email || !password || !age || !gender) {
        res.status(400);
        throw new Error("Please fill all the input fields");
    }
    if (age < 16) {
        res.status(400);
        throw new Error("You are not eligible");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(409).send("User already exists");
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashPassword, age, gender });

    try {
        await newUser.save();
        generateToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            age: newUser.age,
            gender: newUser.gender,

        });
    } catch (error) {
        res.status(500);
        throw new Error("Error creating user: " + error.message);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            generateToken(res, existingUser._id);

            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return;
        } else {
            res.status(401).json({ message: "Wrong password" });
            return;
        }
    } else {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});



const getUserDetails = asyncHandler(async (req, res) => {
    const user_id = req.params.id;
    const userDetails = await User.findById(user_id);

    if (userDetails) {
        res.status(200).json(userDetails);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateCurrentUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.weight = req.body.weight || user.weight;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});
const addScore = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.score = req.body.score || user.score;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    createUser,
    loginUser,
    logoutUser,
    getUserDetails,
    updateCurrentUserDetails,
    addScore,
    
};
