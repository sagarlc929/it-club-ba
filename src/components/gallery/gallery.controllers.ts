import Gallery from "./gallery.models";
import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../utils/response.utils";
import { StatusCodes } from "http-status-codes";

export class BlogsController {
  // Fetch all posts
  public async getGallery(req: Request, res: Response) {
    try {
      const gallery = await Gallery.find();
      if (gallery) {
        sendSuccessResponse(res, StatusCodes.OK, undefined, gallery);
      } else {
        sendErrorResponse(res, StatusCodes.NO_CONTENT, undefined);
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }
  }

  public async createFakeGallery(req: Request, res: Response) {
    if (req.body.password === process.env.FAKE_PASS) {
      const fakeGallery = {
        src: "my image",
        alt: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2glMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D",
      };
      try {
        // Create and save post
        const post = new Gallery(fakeGallery);
        await post.save();
        sendSuccessResponse(
          res,
          StatusCodes.OK,
          "Fake gallery created successfully",
        );
      } catch (error) {
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Error creating fake gallery: ${error}`,
        );
      }
    } else {
      sendErrorResponse(res, StatusCodes.BAD_REQUEST, undefined);
    }
  }
}
