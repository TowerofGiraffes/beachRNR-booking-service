const { Bookings, BookingDates } = require('./Bookings');
const moment = require('moment');

const successHandler = res => result => res.status(200).send(JSON.stringify(result));
const errHandler = res => err => res.status(400).send(JSON.stringify(err));

exports.retrieveBookedDates = (req, res) => {
  const listingID = req.params.listing;

  Bookings
    .findAll({
      where: { listing_id: listingID },
      include: [{
        model: BookingDates,
        as: 'BookedDates',
        attributes: ['date']
      }],
      attributes: []
    })
    .then(bookingsResults => {
      const bookingsObj = {};
      bookingsResults.forEach(bookings => bookings.BookedDates.forEach(booking => bookingsObj[moment(booking.date).format('YYYYMMDD')] = 1));
      res.status(200).send(JSON.stringify(bookingsObj));
    })
    .catch(errHandler(res));
};

exports.book = (req, res) => {
  if (!req.body) {
    const errMsg = JSON.stringify({
      errMsg: 'No parameters provided with request.'
    });

    return res.status(400).send(errMsg);
  }

  if (typeof parseInt(req.body.guests.adults) !== 'number' || parseInt(req.body.guests.adults) < 1) {
    const errMsg = JSON.stringify({
      errMsg: 'Number of adult guests cannot be less than 1.'
    });
    
    return res.status(400).send(errMsg);
  }

  const listingID = req.params.listing;
  const dates = [];
  const guests = req.body.guests;

  const startDate = moment(req.body.dates.startDate);
  const endDate = moment(req.body.dates.endDate);
  const stayLength = endDate.diff(startDate, 'd') + 1;

  startDate.subtract(1, 'd');
  for (let i = 0; i < stayLength; i++) {
    const date = startDate.add(1, 'd').toISOString();
    dates.push(date);
  }

  const nightlyPrice = 100; // TODO: make API call to inventory service for nightly price and calculate
  const bookedPrice = nightlyPrice * (stayLength) * (guests.adults + guests.children);

  Bookings
    .create({
      listing_id: listingID,
      user_id: 1, // typically, this value would be stored as a session variable/included in the API call, but for the purpose of this project, we'll leave it hardcoded as 1
      booked_price: bookedPrice,
      adult_guests: guests.adults,
      children_guests: guests.children,
      infant_guests: guests.infants
    })
    .then(result => {
      const bookingDates = dates.map(date => ({ booking_id: result.id, date: date }));
      
      BookingDates
        .bulkCreate(bookingDates)
        .then(successHandler(res))
        .catch(errHandler(res));
    })
    .catch(errHandler(res));
};

exports.updateBookng = (req, res) => {
  if (!req.body) {
    const errMsg = JSON.stringify({
      errMsg: 'No parameters provided with request.'
    });

    return res.status(400).send(errMsg);
  }

  if (typeof parseInt(req.body.guests.adults) !== 'number' || parseInt(req.body.guests.adults) < 1) {
    const errMsg = JSON.stringify({
      errMsg: 'Number of adult guests cannot be less than 1.'
    });
    
    return res.status(400).send(errMsg);
  }
  
  const bookingID = req.body.bookingID;
  const dates = req.body.dates;
  const guests = req.body.guests;

  const nightlyPrice = 100; // TODO: make API call to inventory service for nightly price and calculate
  const bookedPrice = nightlyPrice * (dates.length - 1) * (guests.adults + guests.children);

  Bookings
    .update(
      {
        booked_price: bookedPrice,
        adult_guests: guests.adults,
        children_guests: guests.children,
        infant_guests: guests.infants
      },
      {
        where: {
          user_id: 1, // typically, this value would be stored as a session variable/included in the API call, but for the purpose of this project, we'll leave it hardcoded as 1
          id: bookingID
        }
      }
    )
    .then(result => {
      BookingDates
        .destroy({
          where: {
            booking_id: bookingID
          }
        })
        .then(() => {
          const bookingDates = dates.map(date => ({ booking_id: bookingID, date: date }));

          BookingDates
            .bulkCreate(bookingDates)
            .then(successHandler(res))
            .catch(errHandler(res));
        })
        .catch(errHandler(res));
    })
    .catch(errHandler(res));
};


exports.deleteBooking = (req, res) => {
  if (!req.body) {
    const errMsg = JSON.stringify({
      errMsg: 'No parameters provided with request.'
    });

    return res.status(400).send(errMsg);
  }

  const bookingID = req.body.bookingID;

  BookingDates
    .destroy({
      where: {
        booking_id: bookingID
      }
    })
    .then(result => {
      Bookings
      .destroy({
        where: {
          booking_id: bookingID
        }
      })
      .then(successHandler(res))
      .catch(errHandler(res));
    })
    .catch(errHandler(res));
};
