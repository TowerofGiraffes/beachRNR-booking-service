const Sequelize = require('sequelize');
const sequelize = require('./../db');

const Bookings = sequelize.define('bookings', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  listing_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  booked_price: Sequelize.DECIMAL,
  adult_guests: Sequelize.INTEGER,
  child_guests: Sequelize.INTEGER,
  infant_guests: Sequelize.INTEGER
});

Bookings.sync();

const BookingDates = sequelize.define('booking_dates', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

BookingDates.sync();

Bookings.hasMany(BookingDates);
sequelize.sync();

exports.Bookings = Bookings;
exports.BookingDates = BookingDates;
