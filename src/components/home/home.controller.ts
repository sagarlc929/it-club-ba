import ITClub from './home.models';
import { Request, Response } from 'express';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response.utils';
import { StatusCodes } from 'http-status-codes';

export class HomeController {
  public async getAllHandler(req: Request, res: Response) {
    try {

      const homeData = await ITClub.findOne(); // Retrieve the single document
      if (homeData) {
        sendSuccessResponse(res, StatusCodes.OK, undefined, homeData);
      } else {
        sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
      }

    } catch (error) {
      console.log(error);
      sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined);
    }

  }
}
