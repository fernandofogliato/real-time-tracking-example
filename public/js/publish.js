const socket = io('ws://localhost:3000', { transports: ['websocket'] });

var lastLocation = [-48.996481, -28.466223];

setInterval(() => {
  console.log('Publishing the location:' + lastLocation);
  var item = {};
  item.Coordinate = {};
  item.Coordinate.Longitude = lastLocation[0];
  item.Coordinate.Latitude = lastLocation[1];
  socket.emit('lastKnownLocation', item);

  lastLocation = [lastLocation[0] - 0.000100, lastLocation[1]];
}, 1000);