import { Router } from 'express';
import path from 'path';

const routes = new Router();

routes.get('/publish', (req, res) => {
  res.sendFile(path.resolve('public/publisher.html'));
});

routes.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

export default routes;