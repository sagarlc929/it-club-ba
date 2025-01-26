import express, { Express } from 'express';
import { IServerConfig, config } from './utils/config';
import { Routes } from './routes';
export class ExpressServer {
  private static server = null;
  public server_config: IServerConfig = config;

  constructor() {
    const port = this.server_config.port ?? 3000;

    // initialize express app
    const app: Express = express();

    app.get('/ping', (req, res) => {
      res.send('pong');
    });

    const routes = new Routes(app);
    if (routes) {
      console.log('Server routes stared for server');
    }
    ExpressServer.server = app.listen(port, () => {
      console.log(`Server is running on port ${port} which pid = ${process.pid}`);
    })
  }
  // close the express server for safe on uncaughtException
  public closeServer(): void {
    ExpressServer.server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  }
}
