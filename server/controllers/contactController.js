import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Rajesh <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact via Portfolio 💌",
      html: `
       <div style="background-color: #111; color: #39FF14; font-family: 'Courier New', monospace; padding: 30px; border: 2px solid #39FF14; border-radius: 8px; max-width: 600px; margin: auto;">
  <h2 style="text-align: center; color: #39FF14; text-transform: uppercase; letter-spacing: 2px;">
    New Contact from Portfolio
  </h2>

  <p style="margin-top: 20px;">
    <strong>[Name]</strong>: <span style="color: #fff;">${username}</span>
  </p>
  <p>
    <strong>[Email]</strong>: <a href="mailto:${email}" style="color: #39FF14; text-decoration: none;">${email}</a>
  </p>

  <p><strong>[Message]</strong>:</p>
  <div style="background-color: #222; border-left: 5px solid #39FF14; padding: 15px; margin: 10px 0; color: #ccc;">
    ${message}
  </div>

  <hr style="border: none; border-top: 1px dashed #39FF14; margin: 30px 0;">

  <p style="font-size: 12px; text-align: right; color: #666;">
    Heisenberg Approved ✔<br>
    <span style="font-style: italic;">"Say my name."</span>
  </p>
</div>

      `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Email sent to admin" });
  } catch (error) {
    console.error("Resend error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
  }
}
