'use strict';

module.exports = {
  mailAuth: {
    user: process.env.VISITS_HISTORY_USER || 'user@mail.com',
    password: process.env.VISITS_HISTORY_SECRET || 'defaultPassword',
    authTimeout: 3000
  },

  imap: {
    host: process.env.VISITS_HISTORY_IMAP_HOST || 'imap.server.com',
    port: Number(process.env.VISITS_HISTORY_IMAP_PORT) || 993,
    tls: process.env.VISITS_HISTORY_IMAP_TLS === 'true' || true
  },

  smtp: {
    host: process.env.VISITS_HISTORY_SMTP_HOST || 'smtp.server.com',
    port: Number(process.env.VISITS_HISTORY_SMTP_PORT) || 465,
    secure: process.env.VISITS_HISTORY_SMTP_SECURE === 'true' || true
  },

  searchOptions: {
    inbox: 'Visits History',
    subject: 'Visits History (Daily)',
    shouldntContains: []
  },

  sendOptions: {
    subject: 'Staff Track',
    to: process.env.VISITS_HISTORY_RECIPIENT || 'recipient@mail.com'
  }
};