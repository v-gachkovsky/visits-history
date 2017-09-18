'use strict';
const logger = require('./lib/logger')();

const imap = require('imap-simple');
const nodemailer = require('nodemailer');
const fs = require('fs');
const readline = require('readline');
const moment = require('moment');

const config = require('./config/config');
const dates = require('./lib/dates')(moment);
const reporter = require('./lib/reporter')(dates, fs);
const sender = require('./lib/sender')(config, nodemailer);
const receiver = require('./lib/receiver')(config, imap, dates);

async function runReporter() {
  logger.write(`Start Date: ${dates.getStartDate()}`);

  const dataForReport = await receiver.getDataForReport();
  const report = reporter.makeReport(dataForReport);
  logger.writeClearMessage('\nReport:\n');
  logger.writeClearMessage(report);

  sendReportIfYouNeedIt(report);
}

function sendReportIfYouNeedIt(report) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Send report? (Y/n)? ', async (answer) => {
    const usersAnswer = answer || 'Y';

    if (/[nN]/.test(usersAnswer)) {
      logger.writeClearMessage('Report wasn\'t sent');
      rl.close();
    } else if (/[yY]/.test(usersAnswer)) {
      logger.writeClearMessage('Report sending...');
      await sender.sendReport(report);
      rl.close();
    } else {
      logger.writeClearMessage("Please type 'y' (Yes) or 'n' (No)...");
      rl.close();
      sendReportIfYouNeedIt(report);
    }
  });
}

runReporter();