'use strict';

const logger = require('./logger')();

module.exports = (config, nodemailer) => {

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.mailAuth.user,
      pass: config.mailAuth.password
    }
  });

  let mailOptions = {
    from: config.mailAuth.user,
    to: config.sendOptions.to,
    subject: config.sendOptions.subject,
    text: ''
  };

  function setMessageContent(message) {
    mailOptions.text = message;
  }

  return {
    sendReport: (report) => {
      setMessageContent(report);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return logger.write(error);
        }
        logger.write('Report successfully sent');
      });
    }
  };

};