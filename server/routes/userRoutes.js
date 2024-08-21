import express from "express";
import {
    createUser,
    loginUser,
    logoutUser,
    getUserDetails,
    updateCurrentUserDetails,
    addScore,
    
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.route('/').post(createUser)
router.post('/auth', loginUser);
router.post('/logout', logoutUser);
router.get('/:id', authenticate, getUserDetails);
router.route('/profile').put(authenticate, updateCurrentUserDetails);
router.route('/score').put(authenticate, addScore);


export default router;
