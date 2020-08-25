import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import ws from './ws';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.static('public'))
    this.server.use(bodyParser.urlencoded({
      extended: true
    }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;