import { Express } from "express";
import { BlogsController } from "./gallery.controllers";

export class GalleryRoutes {
  private baseEndPoint = "/api/gallery";
  constructor(app: Express) {
    const controller = new BlogsController();

    app.route(this.baseEndPoint).get(controller.getGallery);
    app.route(this.baseEndPoint + "/fake").post(controller.createFakeGallery);
  }
}
