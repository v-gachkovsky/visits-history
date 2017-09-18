'use strict';
const moment = require('moment');

module.exports = () => {
  return {
    write: (message) => {
      if (process.env.NODE_ENV !== 'testing') {
        const date = moment();
        console.log(`${date.format('YYYY-MM-DD h:mm:ss')}: ${message}`);
      }
    },

    writeError: (error) => {
      if (process.env.NODE_ENV !== 'testing') {
        const date = moment();
        console.error(`ERROR :: ${date.format('YYYY-MM-DD h:mm:ss')}: ${message}`);
      }
    },

    writeClearMessage: (message) => {
      if (process.env.NODE_ENV !== 'testing') {
        console.log(message);
      }
    }
  };
};

