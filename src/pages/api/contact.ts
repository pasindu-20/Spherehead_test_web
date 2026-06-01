import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Basic sanitization to prevent HTML injection in emails
const sanitize = (str: string) =>
  str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests (form submission)
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Extract form data from request body
  const { option, name, phone, email, areaOfInterest, message, confirm } = req.body;

  // Validate required fields
  if (!name || !email || !message || !confirm) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  // Email format validation (basic regex check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  // Get email credentials from environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // Safety check for missing env variables
  if (!emailUser || !emailPass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS");
    return res.status(500).json({ message: "Email config missing" });
  }

  // Create SMTP transporter using Zoho
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for port 465
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Sanitize user inputs to prevent HTML injection
  const safeOption = sanitize(option);
  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safePhone = sanitize(phone);
  const safeAreaOfInterest = sanitize(areaOfInterest);
  const safeMessage = sanitize(message);

  try {
    // ===========================
    // 1. EMAIL TO COMPANY ZOHO INBOX
    // ===========================
    await transporter.sendMail({
      from: `"${safeName}" <${emailUser}>`, // Must remain your email to prevent spoofing bans
      to: emailUser, // Receive in company inbox
      replyTo: safeEmail, // Clicking 'Reply' will reply to the customer
      subject: `New ${safeOption} Request from ${safeName} | Website Contact Form`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Type:</strong> ${safeOption}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
        <p><strong>Area of Interest:</strong> ${safeAreaOfInterest || 'Not specified'}</p>
        <p><strong>Idea / Message:</strong></p>
        <p>${safeMessage}</p>
        <p><small>User confirmed that details are accurate.</small></p>
      `,
    });

    // ===========================
    // 2. AUTO REPLY TO USER
    // ===========================
    await transporter.sendMail({
      from: `"Spherehead Technologies" <${emailUser}>`,
      to: safeEmail, // send confirmation to user
      subject: "We received your request",
      html: `
        <p>Hi ${safeName},</p>

        <p>Thank you for reaching out to us regarding a ${safeOption.toLowerCase()}.</p>

        <p>We’ve received your details and our team will get back to you shortly.</p>

        <br/>

        <p>Best regards,<br/>The Team</p>
      `,
    });

    // Success response
    return res.status(200).json({ success: true });
  } catch (error) {
    // Log real error for debugging (server side only)
    console.error("Email sending failed:", error);

    // Safe error response for frontend
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
}