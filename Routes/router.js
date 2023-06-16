const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sendEmail = require('../Email/sendEmail')


const userTemplatePath = path.join(__dirname,'..','templates', 'patient_template.html');
const adminTemplatePath = path.join(__dirname,'..','templates', 'mentor_template.html');

const userTemplate = fs.readFileSync(userTemplatePath, 'utf8');
const adminTemplate = fs.readFileSync(adminTemplatePath, 'utf8');

router.post('/send-emails', async (req, res) => {
    try {
      // Fetch user and admin data from the request body or any other source
      const { mentor, patient,userEmail,MentorEmail } = req.body;
  
      // Prepare the email content for user and admin
      const userContent = userTemplate
        .replace('[Patient first name]', mentor)
        .replace('[mentor username]', patient)
        .replace('[date]', 'June 15, 2023')
        .replace('[time]', '10:00 AM');
  
      const adminContent = adminTemplate
        .replace('[Patient first name]', patient)
        .replace('[Mentor name]', mentor)
        .replace('[date]', 'June 15, 2023')
        .replace('[time]', '10:00 AM');
  
      // Send email to user
      await sendEmail(userEmail, 'Session Cancelled (Patient cancels)', userContent);
  
      // Send email to admin
      await sendEmail(MentorEmail, 'Session Cancelled (Mentor cancels)', adminContent);
  
      res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Error sending emails' });
    }
  });



module.exports = router; 