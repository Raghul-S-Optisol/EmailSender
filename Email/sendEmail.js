const nodemailer = require('nodemailer');

// Function to send email using Nodemailer
const sendEmail = async (to, subject, body) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'trytofindme117@gmail.com',
        pass: '',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'trytofindme117@gmail.com',
      to,
      subject,
      html: body,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;