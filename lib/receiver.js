'use strict';

const logger = require('./logger')();

module.exports = (config, imap, dates) => {

  const imapConfig = {
    imap: {
      authTimeout: config.mailAuth.authTimeout,
      password:    config.mailAuth.password,
      user:        config.mailAuth.user,
      host:        config.imap.host,
      port:        config.imap.port,
      tls:         config.imap.tls
    }
  };

  return {
    getDataForReport: () => {
      return imap.connect(imapConfig).then((connection) => {
        logger.write('Connected!');

        return connection.openBox(config.searchOptions.inbox).then((mailBox) => {
          const searchCriteria = [
            ['SINCE', dates.getStartDate()],
            ['SUBJECT', config.searchOptions.subject]
          ];

          config.searchOptions.shouldntContains.forEach((criteria) => {
            searchCriteria.push(['!SUBJECT', criteria]);
          });

          const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false
          };

          logger.write('Getting e-mails...');
          return connection.search(searchCriteria, fetchOptions).then(results => {
            return results.map(res => {
              return res.parts.filter(part => {
                return part.which === 'TEXT';
              })[0].body;
            });
          });
        });
      });
    }
  };
};