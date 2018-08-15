const { Bookings, BookingDates } = require('./Bookings');

exports.retrieveBookedDates = (req, res) => {
  const listingID = req.params.listing;
  
  BookingDates
    .findAll({
      include: [{
        model: Bookings,
        where: { listing_id: listingID },
        attributes: []
      }]
    })
    .then(result => res.status(200).send(JSON.stringify(result)))
    .catch(err => res.status(400).send(JSON.stringify(err)));
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
  const dates = req.body.dates;
  const guests = req.body.guests;

  const nightlyPrice = 100; // TODO: make API call to inventory service for nightly price and calculate
  const bookedPrice = nightlyPrice * (guests.adults + guests.children);
};
