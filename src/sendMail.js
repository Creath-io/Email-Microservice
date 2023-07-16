const nodemailer = require('nodemailer');
const fs = require('fs');
const {EMAIL, PASSWORD} = require("../env")



const logToFile = (message) => {
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile('sendMail.log', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

const test = nodemailer.createTestAccount()

const sendMail = async (name, to, from, subject, message) => {
  logToFile('Sending email..., in the sendMail.js file');
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL, pass: PASSWORD },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: `Here is your transaction confirmation from ${name} : ${message}`,
      html: message
    };

    await transporter.sendMail(mailOptions);
    logToFile('Email sent!');
    return true;
  } catch (error) {
    logToFile(`Error sending email: ${error}`);
    return false;
  }
};

module.exports = sendMail;