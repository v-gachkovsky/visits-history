'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const dates = require('../../lib/dates')(moment, '2009-05-27');

describe('Dates', () => {
  const now = moment('2009-05-27');

  describe('getDate()', () => {
    it('should return current date in format "YYYY-MM". For example: 2009-05', () => {
      expect(dates.getDate()).equals('2009-05');
    });
  });

  describe('getStartDate()', () => {
    it('should return 2 day of current month', () => {
      expect(dates.getStartDate()).equals('May 02, 2009');
    });
  });

  describe('isHoliday()', () => {
    describe('should return true for 30-31 May of 2009', () => {
      it('should return true 30 May 2009', () => {
        expect(dates.isHoliday(2009, 5, 30)).to.be.true;
      });
      it('should return true 31 May 2009', () => {
        expect(dates.isHoliday(2009, 5 , 31)).to.be.true;
      });
    });

    describe('should return false for 25-29 May of 2009', () => {
      it('should return false 25 May 2009', () => {
        expect(dates.isHoliday(2009, 5 , 25)).to.be.false;
      });
      it('should return false 26 May 2009', () => {
        expect(dates.isHoliday(2009, 5 , 26)).to.be.false;
      });
      it('should return false 27 May 2009 (Node.js birthday! Hooray! ^___^)', () => {
        expect(dates.isHoliday(2009, 5 , 27)).to.be.false;
      });
      it('should return false 28 May 2009', () => {
        expect(dates.isHoliday(2009, 5 , 28)).to.be.false;
      });
      it('should return false 29 May 2009', () => {
        expect(dates.isHoliday(2009, 5 , 29)).to.be.false;
      });
    });
  });
});