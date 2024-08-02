import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
// instalar a tipagem do express yarn add @types/express -D
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';
import { connect } from './infra/database';
import fs from 'fs';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.middleware';
import { RoomsRoutes } from './routes/rooms.routes';

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;
  private userRoutes = new UserRoutes();
  private roomsRoutes = new RoomsRoutes();

  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http);
    this.middlewaresInitialize();
    this.initializeRoutes();
    this.interceptionError();
    this.initializeHtml();
  }
  listen() {
    //this.http.listen(3333, () => console.log("Server is running"));
    this.http.listen(3333, async () => {
      try {
        dotenv.config();
        await connect();
        console.log('Conectado ao Banco de dados');
      } catch (error) {
        console.log('this.app.listen', error);
      }
    });
  }
  listenSocket() {
    this.io.on('connection', (userSocket) => {
      console.log('a user connected');
      userSocket.on('join_room', (room) => {
        userSocket.join(room);
      });
    });
  }
  initializeHtml() {
    this.app.get('/index', (req, res) => {
      //console.log("HTML is running.");
      res.sendFile(__dirname + '/index.html');
    });
  }
  private initializeRoutes() {
    this.app.use('/users', this.userRoutes.router); // passo aqui a instancia, e cria lá em cima
    this.app.use('/rooms', this.roomsRoutes.router);
  }
  private middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    fs.accessSync('.env', fs.constants.F_OK);
  }
  private interceptionError() {
    this.app.use(errorMiddleware);
  }
}
//export default App;
export { App };
