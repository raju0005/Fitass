import express from 'express';
import { addActivity, getActivities,deleteActivity } from '../controllers/activityController.js';

const router = express.Router();

router.post('/add', addActivity);

router.get('/allactivities', getActivities);
router.delete('/activities/:id', deleteActivity);

export default router;
