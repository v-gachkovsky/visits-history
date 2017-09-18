'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const fs = require('fs');

const dates = require('../../lib/dates')(moment, '2017-06-01');
const reporter = require('../../lib/reporter')(dates, fs);

describe('Reporter', () => {
  describe('makeReport()', () => {
    const reportName = 'reports/report-2017-06.txt';

    const dataForReport = [
      '27/05/2009 09:47:14 - 19:10:05 09:57 / 08:57',
      '28/05/2009 09:58:10 - 18:56:45 08:54 / 07:54',
      '29/05/2009 10:01:56 - 18:55:30 08:56 / 07:56',
      '30/05/2009 00:00:00 - 00:00:00 00:00 / 00:00',
      '31/05/2009 00:00:00 - 00:00:00 00:00 / 00:00'
    ];

    const result =
      '27/05/2009 09:47:14 - 19:10:05 09:57 / 08:57\n' +
      '28/05/2009 09:58:10 - 18:56:45 08:54 / 07:54 - Сбой трекера\n' +
      '29/05/2009 10:01:56 - 18:55:30 08:56 / 07:56 - Сбой трекера\n' +
      '30/05/2009 00:00:00 - 00:00:00 00:00 / 00:00 - Выходной\n' +
      '31/05/2009 00:00:00 - 00:00:00 00:00 / 00:00 - Выходной\n';

    let report;

    before(() => {
      report = reporter.makeReport(dataForReport);
    });

    it('should create report', () => {
      expect(report).equals(result);
    });

    it('should save new reports to disk', () => {
      expect(fs.existsSync(reportName)).to.be.true;
    });
  });
});