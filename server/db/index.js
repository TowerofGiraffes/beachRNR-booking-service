const Sequelize = require('sequelize');

const sequelize = new Sequelize('bookings', 'bookings', 'bookings', {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  operatorsAliases: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database: ', err);
  });

module.exports = sequelize;
