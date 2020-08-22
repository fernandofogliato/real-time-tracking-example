import { Router } from 'express';
import redis from 'redis';
import io from 'socket.io'; 
import path from 'path';

const routes = new Router();
const socket = io()

//var redisSubscriber = redis.createClient();
//var redisPublisher = redis.createClient();

//redisSubscriber.on('subscribe', (channel, count) => {
//  console.log('client subscribed to ' + channel + ', ' + count + ' total subscriptions');
//});

//redisSubscriber.on('message', (channel, message) => {
//  console.log('client channel ' + channel + ': ' + message);
//  socket.emit('locationUpdate', message);
//});


routes.get('/publish', (req, res) => {
  res.sendFile(path.resolve('public/publisher.html'));
});

routes.get('/', (req, res) => {
  //redisSubscriber.subscribe('locationUpdate');
  res.sendFile(path.resolve('public/index.html'));
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