'use strict';

const logger = require('./logger')();

module.exports = (dates, fs) => {

  function saveReportOnDisk(report) {
    const reportsDir = 'reports/';
    const date = dates.getDate();
    const filename = `report-${date}.txt`;

    try {
      if (!fs.existsSync(reportsDir)){
        fs.mkdirSync(reportsDir);
      }

      fs.writeFileSync(reportsDir + filename, report);
      logger.write('Report was successfully saved to disk');
    } catch (e) {
      logger.write('Report wasn\'t saved to disk!');
    }

  }

  return {
    makeReport: (lines) => {
      const report = lines.reduce((report, line) => {
                                       // 12/07/2017 10:23:52 - 19:22:36 08:58 / 08:07
        let lineOfReport = line.match(/((\d{2})\/(\d{2})\/(\d{4})\s+\d{2}\:\d{2}\:\d{2}\s+\-\s+\d{2}\:\d{2}\:\d{2}\s+\d{2}\:\d{2}\s+\/\s+(\d{2})\:\d{2})/);
        const day = lineOfReport[2];
        const month = lineOfReport[3];
        const year = lineOfReport[4];
        const hours = lineOfReport[5];

        report += lineOfReport[1];

        dates.isHoliday(year, month, day)
          ? report += ' - Выходной\n'
          : hours < 8
          ? report += ' - Сбой трекера\n'
          : report += '\n';

        return report;
      }, '');

      saveReportOnDisk(report);
      return report;
    }
  };
};