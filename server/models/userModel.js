import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        default: 0
    },
    steps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Steps'
    }],
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    score: {
        type: Number,
        default: 0
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
