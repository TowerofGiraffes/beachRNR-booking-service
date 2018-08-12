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
  infant_guests: Sequelize.INTEGER,
});

Bookings.sync();

exports.Bookings = Bookings;
