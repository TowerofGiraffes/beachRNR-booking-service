const bookingsRouter = require('express').Router();
const bookingsController = require('./bookingsController');

bookingsRouter.route('/:listing')
.get(bookingsController.retrieve);

module.exports = bookingsRouter;
