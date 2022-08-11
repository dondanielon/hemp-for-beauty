const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIN_EMAIL,
    pass: process.env.MAIN_EMAIL_PASSWORD
  }
});

transporter.verify((error, succes) => {
  if (error) {
    console.log(error);
  } else {
    console.log("server is ready to send mails");
  }
  });

const mailOptions = {
  from: `DEV TEAM ${process.env.MAIN_EMAIL}`,
  to: "becse.ca@gmail.com",
  subject: "PRIORITY",
  text: "Wassup homie"
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) console.log(error);
  else console.log(info.res);
});

