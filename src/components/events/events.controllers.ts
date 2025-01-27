import EventModel from './events.models'; // Adjust the import path
import { Request, Response } from 'express';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response.utils';
import { StatusCodes } from 'http-status-codes';

export class EventsController {

  // Fetch all events
  public async getEvents(req: Request, res: Response) {
    try {
      const events = await EventModel.find().select('title date location description image slug');

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
  public async getFeatureEvents(req: Request, res: Response) {
    try {

      const events = await EventModel.find({
        date: { $gte: new Date().toISOString() } // Fetch events with a date >= current date
      })
        .select('title date image slug')
        .sort({ date: 1 })
        .limit(3);

      if (events) {
        sendSuccessResponse(res, StatusCodes.OK, undefined, events);
      } else {
        sendErrorResponse(res, StatusCodes.NO_CONTENT, undefined);
      }
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }
  }
  public async createFakeEvent(req: Request, res: Response) {
    // Directly use JSON data to define the event
    if (req.body.pass === process.env.FAKE_PASS) {

      const fakeEvent = {
        title: 'Tech Conference 2025',
        date: '2025-05-25T09:00:00Z',
        location: 'Tech Convention Center, Silicon Valley',
        description: 'A premier tech conference for industry leaders and innovators.',
        image: 'https://example.com/tech-conference-2025.jpg',
        slug: 'tech-conference-2025',
        schedule: '9:00 AM - 6:00 PM',
        speakers: [
          {
            name: 'Alice Johnson',
            bio: 'Alice is a leading innovator in AI and machine learning, with 15 years of experience.',
          },
          {
            name: 'Bob Lee',
            bio: 'Bob is a software engineer and cybersecurity expert, specializing in cloud technologies.',
          },
        ],
        registrationLink: 'https://example.com/register',
      };

      try {
        // Create and save the event using the predefined JSON object
        const event = new EventModel(fakeEvent);
        await event.save();
        sendSuccessResponse(res, StatusCodes.OK, 'Fake event created successfully', event);
      } catch (error) {
        sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error creating fake event: ${error}`);
      }
    }
    else {
      sendErrorResponse(res, StatusCodes.BAD_REQUEST, undefined);
    }
  };
}
