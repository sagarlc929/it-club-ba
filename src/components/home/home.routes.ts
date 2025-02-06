import { Express } from "express";
import { HomeController } from "./home.controller";

export class HomeRoutes {
  private baseEndPoint = "/api/home";

  constructor(app: Express) {
    const controller = new HomeController();

    app.route(this.baseEndPoint).get(controller.getAllHandler);
  }
}
