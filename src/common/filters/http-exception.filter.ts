import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from '../interfaces/api-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let errorMessage: string;
    let errors: any;

    if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      errorMessage =
        (exceptionResponse as any).message || 'Internal server error';
      errors = (exceptionResponse as any).errors || undefined;
    } else {
      errorMessage = 'Internal server error';
    }

    const errorResponse: ApiErrorResponse = {
      success: false,
      statusCode: status,
      message: errorMessage,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    return response.status(status).json(errorResponse);
  }
}
