const bookingsRouter = require('express').Router();
const bookingsController = require('./bookingsController');

bookingsRouter.route('/:listing')
.get(bookingsController.retrieveBookedDates)
.post(bookingsController.book)
.put(bookingsController.updateBookng)
.delete(bookingsController.deleteBooking);

module.exports = bookingsRouter;
