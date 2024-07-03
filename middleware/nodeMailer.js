const nodemailer = require('nodemailer')

function sendEmail(to, subject, text) {
    return new Promise((resolve, reject) => {
      
      let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'quickbuy418@gmail.com', 
          pass: process.env.EmailPassword, 
        },
      });
  

      let message = {
        from: 'quickbuy418@gmail.com', 
        to: to, 
        subject: subject, 
        text: text, 
      };
  
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          reject(error);
        } else {
          console.log('Email sent: %s', info.messageId);
          resolve(info);
        }
      });
    });
  }
  
  module.exports = { sendEmail };