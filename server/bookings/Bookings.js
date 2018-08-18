const Sequelize = require('sequelize');
const sequelize = require('./../db');

const Bookings = sequelize.define('bookings', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  listing_id: Sequelize.INTEGER.UNSIGNED,
  user_id: Sequelize.INTEGER.UNSIGNED,
  booked_price: Sequelize.DECIMAL,
  adult_guests: Sequelize.INTEGER.UNSIGNED,
  child_guests: Sequelize.INTEGER.UNSIGNED,
  infant_guests: Sequelize.INTEGER.UNSIGNED
});

const BookingDates = sequelize.define('booking_dates', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  date: Sequelize.DATE
});

Bookings.hasMany(BookingDates, {
  as: 'BookedDates',
  foreignKey: 'booking_id'
});

sequelize.sync();

exports.forceSync = async () => await sequelize.sync({force: true});
exports.Bookings = Bookings;
exports.BookingDates = BookingDates;
