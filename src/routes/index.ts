import { Router, Express } from 'express';
import { HomeRoutes } from '../components/home/home.route';
export class Routes {
  public router: Router;
  constructor(app: Express) {
    const routeClasses = [
      HomeRoutes
    ];
    for (const routeClass of routeClasses) {
      try {
        new routeClass(app);
        console.log(`Router: ${routeClass.name} - Connected`);
      } catch (error) {
        console.log(`Router: ${routeClass.name} - Failed`, error);
      }
    }
  }
}

