const Sequelize = require('sequelize');
const dbUser = process.env.DB_USER || 'bookings';
const dbPW = process.env.DB_PW || 'bookings';

const sequelize = new Sequelize('bookings', dbUser, dbPW, {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  operatorsAliases: false,
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database: ', err);
  });

module.exports = sequelize;
