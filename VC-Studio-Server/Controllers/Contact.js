import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const contact = express();

// Middleware
contact.use(cors());
contact.use(bodyParser.json());

// POST route to send email
contact.post('/send-email', async (req, res) => {
  const { fullName, email, mobileNo, subject, message } = req.body;

  try {
    // Nodemailer transporter setup
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lyash031@rku.ac.in', // Use a valid Gmail address
        pass: 'L4950807', // Use contact password if 2FA is enabled
      },
    });

    // Mail options
    const mailOptions = {
      from: 'lyash031@rku.ac.in', // Sender email address
      to: 'yashlalani2@gmail.com', // Recipient email address
      subject: `Contact Form - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
          <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px;">${fullName}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Mobile No:</td>
              <td style="padding: 8px;">${mobileNo}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; font-weight: bold;">Subject:</td>
              <td style="padding: 8px;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Message:</td>
              <td style="padding: 8px;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 0.9em;">Sent on ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Email failed to send', error: error.message });
  }
});

export default contact;