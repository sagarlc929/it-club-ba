import { Express } from "express";
import { EventsController } from "./events.controllers";
export class EventsRoutes {
  private baseEndPoint = "/api/events";

  constructor(app: Express) {
    const controller = new EventsController();
    console.log("from evnets_routes");
    app.route(this.baseEndPoint).get(controller.getEvents);
    app.route(this.baseEndPoint + "/features").get(controller.getFeatureEvents);
    app.route(this.baseEndPoint + "/fake").post(controller.createFakeEvent);
    app.route(this.baseEndPoint + "/:slug").get(controller.getEventBySlug);
  }
}
