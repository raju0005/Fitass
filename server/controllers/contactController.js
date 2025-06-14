import nodemailer from "nodemailer";
import asyncHandler from "../middlewares/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const submitContactForm = asyncHandler(async (req, res) => {
  const { username, email, message } = req.body;

  try {
    // Email to yourself (admin)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "👋 New Contact From Portfolio",
      html: `
        <div style="background-color: #111; color: #39FF14; font-family: 'Courier New', monospace; padding: 30px; border: 2px solid #39FF14; border-radius: 8px; max-width: 600px; margin: auto;">
          <h2 style="text-align: center; color: #39FF14;">New Contact Received</h2>
          <hr style="border: none; border-top: 1px solid #39FF14; margin: 20px 0;">
          <p><strong>[Name]</strong>: <span style="color: #ffffff;">${username}</span></p>
          <p><strong>[Email]</strong>: <a href="mailto:${email}" style="color: #39FF14;">${email}</a></p>
          <p><strong>[Message]</strong>:</p>
          <div style="background-color: #222; border-left: 5px solid #39FF14; padding: 15px; color: #ccc;">${message}</div>
          <p style="font-size: 12px; text-align: right; color: #666;">Heisenberg Approved ✔</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent to author" });
  } catch (error) {
    console.error("Email Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

export { submitContactForm };
