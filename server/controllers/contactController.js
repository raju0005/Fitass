import Contact from "../models/contactModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const submitContactForm = asyncHandler(async (req, res) => {
    const { username, email, message } = req.body;
    try {
        if (email === process.env.ADMIN_EMAIL) {
            res.status(200).json({ admin: true });
        } else {
            const newMessage = new Contact({ username, email, message });
            await newMessage.save();
            res.status(200).json({ message: 'Message saved successfully' });
        }
        
    } catch (error) {
        res.status(404).json({message: 'Failed to save message', error: error.message });
    }

  
});
const getMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Contact.find({});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve messages', error: error.message });
    }
});
export { submitContactForm , getMessages };
