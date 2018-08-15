const { Bookings, BookingDates } = require('./Bookings');

exports.retrieve = (req, res) => {
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
