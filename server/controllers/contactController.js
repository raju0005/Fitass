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
        from: "raajeshande@gmail.com", // use a verified sender
        to: "anderajesh15@gmail.com",
        subject: "New Contact Form Submission",
        html: `
        <h2>New Contact Received</h2>
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
      });
      await resend.emails.send({
        from: "raajeshande@gmail.com",
        to: email,
        subject: "Thanks for contacting us!",
        html: `
        <p>Hi <strong>${username}</strong>,</p>
        <p>Thank you for reaching out. We've received your message and will get back to you soon.</p>
        <hr />
        <p><strong>Your Message:</strong></p>
        <blockquote>${message}</blockquote>
        <p>Regards,<br/>Rajesh Ande</p>
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
