const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hafizdaffa2221@gmail.com",
      pass: "hafizdaffafadhilah222112",
    },
  });

  const mailOptions = {
    from: email,
    to: "hafizdaffa2221@gmail.com",
    subject: `[PORTFOLIO] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5500, "0.0.0.0", () => console.log("Server running on port 5500"));
~