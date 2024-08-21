import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Strength Training', 'Cardio'],
        required: true,
    },
    duration: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
