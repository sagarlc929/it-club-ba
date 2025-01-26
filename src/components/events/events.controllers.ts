import EventModel from './events.models'; // Adjust the import path
import { Request, Response } from 'express';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response.utils';
import { StatusCodes } from 'http-status-codes';

export class EventsController {

  // Fetch all events
  public async getEvents(req: Request, res: Response) {
    try {
      const events = await EventModel.find(); // You can apply filters here if needed
      if (events) {
        sendSuccessResponse(res, StatusCodes.OK, undefined, events);
      } else {
        sendErrorResponse(res, StatusCodes.NO_CONTENT, undefined);
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }
  };

  // Fetch a specific event by slug
  // public async getEventBySlug(req: Request, res: Response) {
  public async getEventBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    try {
      const event = await EventModel.findOne({ slug });
      if (event) {

        sendSuccessResponse(res, StatusCodes.OK, undefined, event);
      } else {
        sendErrorResponse(res, StatusCodes.NO_CONTENT, undefined);
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }
  };
}
