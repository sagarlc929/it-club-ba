import { Router, Express } from 'express';
// import { HomeRoutes } from '../components/home/home.routes';
import { EventsRoutes } from '../components/events/events.routes'
import { BlogsRoutes } from '../components/blogs/blogs.routes';
export class Routes {
  public router: Router;
  constructor(app: Express) {
    const routeClasses = [
      // HomeRoutes,
      EventsRoutes,
      BlogsRoutes
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

