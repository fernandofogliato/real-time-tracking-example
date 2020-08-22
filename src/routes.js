import { Router } from 'express';
import redis from 'redis';
import io from 'socket.io'; 

const routes = new Router();
const socket = io()

var redisSubscriber = redis.createClient();
var redisPublisher = redis.createClient();

redisSubscriber.on('subscribe', (channel, count) => {
  console.log('client subscribed to ' + channel + ', ' + count + ' total subscriptions');
});

redisSubscriber.on('message', (channel, message) => {
  console.log('client channel ' + channel + ': ' + message);
  io.emit('locationUpdate', message);
});


routes.get('/', (req, res) => {
  res.sendFile('../public/index.html', {
    root: __dirname
  });
});

routes.get('/publish', (req, res) => {
  res.sendFile('../public/publisher.html', {
    root: __dirname
  });
});

routes.get('/', (req, res) => {
  redisSubscriber.subscribe('locationUpdate');
  res.sendFile('../public/index.html', {
    root: __dirname
  });
});


socket.on('connection', (socket) => {
  console.log('socket created');
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on('disconnect', () => console.log('Got disconnect!'));


  socket.on('lastKnownLocation', (data) => {
    var location = JSON.stringify(data);
    redisPublisher.publish('locationUpdate', location);
  });
});

export default routes;