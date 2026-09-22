const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Email endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    // Configure the email transporter
    // For production, you should use a real email service provider configuration
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: process.env.SMTP_PORT || 587,
        auth: {
            user: process.env.SMTP_USER, // Set in .env
            pass: process.env.SMTP_PASS  // Set in .env
        }
    });

    try {
        // Send email
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_EMAIL || 'info@basilmoolman.com', // Where you want to receive emails
            subject: 'New Contact Form Submission - Basil Moolman Website',
            text: `You have received a new message from the website contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
            html: `<h3>New Contact Form Submission</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone:</strong> ${phone}</p>
                   <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`
        });
        
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
});

// Fallback to index.html for unknown routes (SPA like behavior if needed)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
