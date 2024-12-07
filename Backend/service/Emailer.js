
const formData = require('form-data');
const Mailgun = require('mailgun.js');

// Environment variables for Mailgun API Key and Domain
const mgAPI_key = process.env.MAILGUN_API_KEY;
const mgDomain = process.env.MAILGUN_DOMAIN;

// Initialize the Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: mgAPI_key });


// Define the email sending function
const sendWelcomeEmail = (recipientEmail, userName, dashboardLink) => {
  const messageData = {
    from: "MyShop Team <no-reply@myshop.com>",
    to: [recipientEmail], // Specify the recipient(s)
    subject: "You have successfully created your Account",
    text: "successfully account is created!",
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to MyShop!</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f9;
                  color: #333;
                  padding: 20px;
              }
              .email-container {
                  background-color: #ffffff;
                  padding: 30px;
                  border-radius: 8px;
                  width: 600px;
                  margin: 0 auto;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #4CAF50;
              }
              p {
                  font-size: 16px;
                  line-height: 1.6;
              }
              .btn {
                  display: inline-block;
                  padding: 12px 25px;
                  background-color: #4CAF50;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 4px;
                  margin-top: 20px;
                  font-weight: bold;
              }
              .footer {
                  font-size: 14px;
                  color: #999;
                  margin-top: 30px;
                  text-align: center;
              }
              .footer a {
                  color: #999;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <h1>Welcome to MyShop!</h1>
              <p>Hi ${userName},</p>
              <p>Thank you for creating an account with MyShop. We're excited to have you join our community of shoppers! You can now explore and shop your favorite products with ease.</p>
              <p>To get started, click the button below to visit your dashboard and start shopping:</p>
              <a href="${dashboardLink}" class="btn">Go to Dashboard</a>
              <p>If you have any questions, feel free to reply to this email, and our support team will be happy to assist you.</p>
              <p>Thanks again, and happy shopping!</p>
              <p><strong>The MyShop Team</strong></p>
              <div class="footer">
                  <p>&copy; 2024 MyShop, All rights reserved.</p>
                  <p><a href="http://unsubscribe-link.com">Unsubscribe</a> from our mailing list.</p>
              </div>
          </div>
      </body>
      </html>`
  };

  // Send the email
  mg.messages.create(mgDomain, messageData)
    .then(msg => {
      console.log("Welcome email sent successfully:", msg);
    })
    .catch(err => {
      console.error("Error sending email:", err);
    });
};





module.exports = {sendWelcomeEmail};
