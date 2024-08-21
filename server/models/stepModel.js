import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    TotalSteps: {
        type: Number,
        default: 0
    },
    stepsDone: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Steps = mongoose.model('Steps', stepSchema);
export default Steps;
