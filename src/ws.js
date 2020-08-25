import redis from 'redis';
import io from 'socket.io'; 

const ws = io(3000);

var redisSubscriber = redis.createClient();
var redisPublisher = redis.createClient();

redisSubscriber.on('subscribe', (channel, count) => {
  console.log('client subscribed to ' + channel + ', ' + count + ' total subscriptions');
});

redisSubscriber.on('message', (channel, message) => {
  console.log('client channel ' + channel + ': ' + message);
  ws.emit('locationUpdate', message);
});

redisSubscriber.subscribe('locationUpdate');

ws.on('connect', socket => {
  console.log('Connected!');

  socket.on('disconnect', () => console.log('Got disconnect!'));

  socket.on('lastKnownLocation', (data) => {
    console.log('lastKnowLocation', data);
    var location = JSON.stringify(data);
    redisPublisher.publish('locationUpdate', location);
  });
});

export default ws;