import { Express } from 'express';
import { EventsController } from './events.controllers';
export class EventsRoutes {
  private baseEndPoint = '/api/events';

  constructor(app: Express) {
    const controller = new EventsController();

    app.route(this.baseEndPoint)
      .get(controller.getEvents);
    app.route(this.baseEndPoint + '/:slug')
      .get(controller.getEventBySlug);
    app.route(this.baseEndPoint + '/features')
      .get(controller.getFeatureEvents);

    app.route(this.baseEndPoint + '/fake')
      .post(controller.createFakeEvent);
  }
}
