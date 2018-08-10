var app = require('./server.js');
var port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log('Booking service listening on port ' + port);
});