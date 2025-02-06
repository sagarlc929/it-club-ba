import { Express } from "express";
import { BlogsController } from "./blogs.controllers";

export class BlogsRoutes {
  private baseEndPoint = "/api/blogs";
  constructor(app: Express) {
    const controller = new BlogsController();

    app.route(this.baseEndPoint).get(controller.getBlogs);
    app.route(this.baseEndPoint + "/features").get(controller.getFeatureBlogs);
    app.route(this.baseEndPoint + "/fake").post(controller.createFakeEvent);
    app.route(this.baseEndPoint + "/:slug").get(controller.getBlogBySlug);
  }
}
