import http from "http";
import express, { Application, NextFunction, Request, Response } from "express"; // instalar a tipagem do express yarn add @types/express -D
import { Server } from "socket.io";
import { UserRoutes } from "./routes/user.routes";
import { connected } from "./infra/database";

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
    this.initializeHtml();
  }
  listen() {
    //this.http.listen(3333, () => console.log("Server is running"));
    this.http.listen(3333, async () => {
      try {
        await connected();
        console.log("Conectado porta 3333 Ok");
      } catch (error) {
        console.log("this.app.listen", error);
      }
    });
  }
  listenSocket() {
    this.io.on("connection", (userSocket) => {
      console.log("a user connected");
    });
  }
  initializeHtml() {
    this.app.get("/index", (req, res) => {
      //console.log("HTML is running.");
      res.sendFile(__dirname + "/index.html");
    });
  }
  private initializeRoutes() {
    this.app.use("/users", this.userRoutes.router); // passo aqui a instancia, e cria lá em cima
  }
  private middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}
//export default App;
export { App };
