// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Nodemailer Transporter for BigRock SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // localhost for BigRock
  port: process.env.SMTP_PORT, // 25 for BigRock
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact Form Route
app.post(
  "/api/contact",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    // Input Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
      // Save to MongoDB
      const contact = new Contact({ name, email, message });
      await contact.save();

      // Send Email
      const mailOptions = {
        from: process.env.EMAIL_USER, // Must be an email on your BigRock domain
        to: process.env.EMAIL_USER, // Recipient (same or another email on your domain)
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Server error, please try again later" });
    }
  }
);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
