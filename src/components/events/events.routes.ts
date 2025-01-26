import { Express } from 'express';
import { EventsController } from './events.controllers';

export class EventsRoutes {
  private baseEndPoint = '/api/home';

  constructor(app: Express) {
    const controller = new EventsController();

    app.route(this.baseEndPoint)
      .get(controller.getEvents);
    app.route(this.baseEndPoint + '/:slug')
      .get(controller.getEventBySlug);
  }
}
