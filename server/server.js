const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

const router = require('./bookings/bookingsRouter');
app.use('/', router);

module.exports = app;
