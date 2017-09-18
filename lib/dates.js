'use strict';

module.exports = (moment, presetDate) => {
  const date = moment(presetDate);

  return {
    getDate: () => {
      return date.format('YYYY-MM');
    },

    getStartDate: () => {
      // We receives report for first day in second day
      return date.clone()
        .startOf('month')
        .add(1, 'day')
        .format('MMMM DD, YYYY');
    },

    isHoliday: (year, month, day) => {
      const date = moment(`${year} ${month} ${day}`, "YYYY MM DD");
      return date.day() === 0 || date.day() === 6;
    }
  };
};

