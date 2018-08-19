const moment = require('moment');
const { Bookings, BookingDates, forceSync } = require('./../bookings/Bookings');

let bookings;
let bookedDates;

let listingID = 2912000;
let bookingID = 1;
let userID = 1;

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateBookingDataChunk = async (start, stop) => {
  bookings = [];
  bookedDates = [];

  for (let i = start; i < stop; i++) {
    let firstCheckInDay = 1;
    let lastCheckInDay = 0;

    for (let j = 0; j < 12; j++) {
      const adultGuests = getRandomIntInclusive(1, 5);
      const childGuests = getRandomIntInclusive(0, 3);
      const infantGuests = getRandomIntInclusive(0, 2);
      const price = getRandomIntInclusive(35, 100) * (adultGuests + childGuests);

      bookings.push({
        listing_id: listingID,
        user_id: userID,
        booked_price: price,
        adult_guests: adultGuests,
        child_guests: childGuests,
        infant_guests: infantGuests
      });

      firstCheckInDay = lastCheckInDay + 1;
      lastCheckInDay += 30;
      let checkOut = getRandomIntInclusive(2, 7);
      const checkIn = getRandomIntInclusive(firstCheckInDay , lastCheckInDay - checkOut);
      checkOut += checkIn;

      for (let day = checkIn; day <= checkOut; day++) {
        const date = moment().add(day, 'days').format('YYYY-MM-DD H:m:s');
        bookedDates.push({
          booking_id: bookingID,
          date: date
        });
      }

      bookingID++;
    }

    listingID++;
  }

  await Bookings
  .bulkCreate(bookings)
  .then(async () => {
    await BookingDates
      .bulkCreate(bookedDates)
      .catch(err => console.error('Error!', err));
  })
  .catch(err => console.error('Error!', err));
};

exports.generateData = async (req, res) => {
  await forceSync();
  const chunks = req.params.chunks;
  listingID = 2912000;
  bookingID = 1;
  userID = 1;

  res.status(200).send(JSON.stringify({result: 'Data generator initiated!'}));
  
  let startChunk = 0;
  
  for (let i = 0; i < chunks; i++) {
    const endChunk = startChunk + 1000;
    await generateBookingDataChunk(startChunk, endChunk);
    startChunk = endChunk;
    console.log(`Processed ${endChunk} bookings!`);
  }

  console.log('Done!');
};
