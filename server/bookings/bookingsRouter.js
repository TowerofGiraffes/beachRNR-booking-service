const bookingsRouter = require('express').Router();
const bookingsController = require('./bookingsController');
const { generateData } = require('./../db/mockedData.js');

bookingsRouter.route('/api/bookings/:listing')
.get(bookingsController.retrieveBookedDates)
.post(bookingsController.book)
.put(bookingsController.updateBookng)
.delete(bookingsController.deleteBooking);

bookingsRouter.route('/generateData')
.get(generateData)

module.exports = bookingsRouter;
