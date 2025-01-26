import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

//
export const sendSuccessResponse = (res: Response, statusCode: number, message?: string, data: unknown = null) => {
  res.status(statusCode).json({
    success: true,
    message: message || getReasonPhrase(statusCode),
    data: data,
  });
}

export const sendErrorResponse = (res: Response, statusCode: number, message?: string) => {
  res.status(statusCode).json({
    success: false,
    message: message || getReasonPhrase(statusCode)
  });
}

