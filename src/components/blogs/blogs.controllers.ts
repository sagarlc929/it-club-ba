import BlogModel from "./blogs.models";
import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../utils/response.utils";
import { StatusCodes } from "http-status-codes";

export class BlogsController {
  // Fetch all posts
  public async getBlogs(req: Request, res: Response) {
    try {
      const blogs = await BlogModel.find().select(
        "title date summary image slug",
      );
      if (blogs) {
        sendSuccessResponse(res, StatusCodes.OK, undefined, blogs);
      } else {
        sendErrorResponse(res, StatusCodes.NO_CONTENT, undefined);
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }
  }
  public async getBlogBySlug(req: Request, res: Response) {
    try {
      const blogs = await BlogModel.find();
      if (blogs) {
        sendSuccessResponse(res, StatusCodes.OK, undefined, blogs);
      } else {
        sendErrorResponse(res, StatusCodes.NO_CONTENT, undefined);
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }
  }
  public async getFeatureBlogs(req: Request, res: Response) {
    try {
      const blogs = await BlogModel.find()
        .select("id title date summary slug")
        .sort({ updatedAt: -1 })
        .limit(3);

      if (blogs) {
        sendSuccessResponse(res, StatusCodes.OK, undefined, blogs);
      } else {
        sendErrorResponse(res, StatusCodes.NO_CONTENT, undefined);
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }
  }

  public async createFakeEvent(req: Request, res: Response) {
    if (req.body.password === process.env.FAKE_PASS) {
      const fakeBlog = {
        title: "The Future of Technology",
        date: "2025-01-20",
        summary: "Exploring the technologies that will define the next decade.",
        content:
          "In this post, we discuss the cutting-edge technology that will shape our future. From quantum computing to AI advancements...",
        image: "/images/blog/future-tech.jpg",
        slug: "the-future-of-technology",
        author: "Jane Doe",
        tags: ["Tech", "AI", "Future"],
      };
      try {
        // Create and save post
        const post = new BlogModel(fakeBlog);
        await post.save();
        sendSuccessResponse(
          res,
          StatusCodes.OK,
          "Fake event created successfully",
          event,
        );
      } catch (error) {
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Error creating fake event: ${error}`,
        );
      }
    } else {
      sendErrorResponse(res, StatusCodes.BAD_REQUEST, undefined);
    }
  }
}
