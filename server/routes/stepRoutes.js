import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { TotalSteps, addSteps, getSteps } from "../controllers/stepController.js";


const router = express.Router();

router
    .post('/totalsteps', authenticate, TotalSteps)
    .post('/addsteps', authenticate, addSteps)
    .get('/:id', getSteps);


export default router;