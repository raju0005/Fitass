import Contact from "../models/contactModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Resend } from "resend";

const resend = new Resend("re_SBQxTr7L_3R6Bf7QVf5tUeKi3uzbEirPr");

const submitContactForm = asyncHandler(async (req, res) => {
  const { username, email, message } = req.body;
  try {
    if (email === process.env.ADMIN_EMAIL) {
      res.status(200).json({ admin: true });
    } else {
      const newMessage = new Contact({ username, email, message });
      await newMessage.save();

      await resend.emails.send({
        from: "onboarding@resend.dev", // use a verified sender
        to: "anderajesh15@gmail.com",
        subject: "Someone contacted you from your website",
        html: `
        <div style="background-color: #111; color: #39FF14; font-family: 'Courier New', monospace; padding: 30px; border: 2px solid #39FF14; border-radius: 8px; max-width: 600px; margin: auto;">
  <h2 style="text-align: center; color: #39FF14; text-transform: uppercase; letter-spacing: 2px;">New Contact Received</h2>
  <hr style="border: none; border-top: 1px solid #39FF14; margin: 20px 0;">
  
  <p><strong>[Name]</strong>: <span style="color: #ffffff;">${username}</span></p>
  <p><strong>[Email]</strong>: <a href="mailto:${email}" style="color: #39FF14; text-decoration: none;">${email}</a></p>
  <p><strong>[Message]</strong>:</p>
  
  <div style="background-color: #222; border-left: 5px solid #39FF14; padding: 15px; margin: 10px 0; color: #ccc;">
    ${message}
  </div>

  <p style="font-size: 12px; text-align: right; color: #666;">Heisenberg Approved ✔</p>
</div>

      `,
      });

      res
        .status(200)
        .json({ message: "Message saved, email sent to admin and user." });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "Failed to save message", error: error.message });
  }
});
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Contact.find({});
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve messages", error: error.message });
  }
});
export { submitContactForm, getMessages };
