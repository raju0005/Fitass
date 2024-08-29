import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    message: {
        type: String,

    },

}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
