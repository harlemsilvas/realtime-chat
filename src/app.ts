import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
// instalar a tipagem do express yarn add @types/express -D
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';
import { connect } from './infra/database';
import fs from 'fs';
import dotenv from 'dotenv';

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;
  private userRoutes = new UserRoutes();

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
  }
  private middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    fs.accessSync('.env', fs.constants.F_OK);
  }
  private interceptionError() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof Error) {
          return response.status(400).json({
            message: err.message,
          });
        }
        return response.status(500).json({
          message: 'Internal Server Error.',
        });
      }
    );
  }
}
//export default App;
export { App };
