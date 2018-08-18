const moment = require('moment');
const { Bookings, BookingDates } = require('./../bookings/Bookings');

const bookings = [];
const bookedDates = [];

let listingID = 2912000;
let bookingID = 1;
let userID = 1;

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateBookingDataChunk = async (start, stop) => {
  for (let i = start; i < stop; i++) {
    let firstCheckInDay = 1;
    let lastCheckInDay = 0;

    for (let j = 0; j < 10; j++) {
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

      firstCheckInDay += lastCheckInDay;
      lastCheckInDay += 30;
      const checkIn = getRandomIntInclusive(firstCheckInDay , lastCheckInDay);
      const checkOut = getRandomIntInclusive(2, 10) + checkIn;

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
    console.log('Bookings chunk complete!');
    await BookingDates
      .bulkCreate(bookedDates)
      .then(result => console.log('Booked dates chunk complete!'))
      .catch(err => console.error('Error!', err));
  })
  .catch(err => console.error('Error!', err));
};

exports.generateData = async (req, res) => {
  res.status(200).send(JSON.stringify({result: 'Data generator initiated!'}));
  
  let startChunk = 0;
  
  for (let i = 0; i < 100; i++) {
    const endChunk = startChunk + 2000;
    await generateBookingDataChunk(startChunk, endChunk);
    startChunk = endChunk;
  }
};
