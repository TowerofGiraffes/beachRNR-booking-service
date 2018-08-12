const app = require('./server.js');
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Booking service listening on port ${port}`);
});
