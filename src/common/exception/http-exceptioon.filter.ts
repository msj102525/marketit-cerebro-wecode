import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { statusMessage } from '../enums/status.message.enum';
import { CustomErrorStatusCode } from '../enums/customError.statusCode.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    let customStatusCode: number;

    switch (error) {
      case 'NO_DELETES_MADE':
        customStatusCode = CustomErrorStatusCode.DUPLICATE_EMAIL;
        break;
      case 'USERNAME_ALREADY_EXIST':
        customStatusCode = CustomErrorStatusCode.DUPLICATE_USER_NAME;
        break;
      case 'TAG_TYPE_ALREADY_EXIST':
        customStatusCode = CustomErrorStatusCode.DUPLICATE_TAG_TYPE;
        break;
      case 'TAG_NAME_ALREADY_EXIST':
        customStatusCode = CustomErrorStatusCode.DUPLICATE_TAG_NAME;
        break;
      case 'EMAIL_ALREADY_EXIST':
        customStatusCode = CustomErrorStatusCode.DUPLICATE_EMAIL;
        break;
      case 'DID_NOT_UPDATE':
        customStatusCode = CustomErrorStatusCode.NO_UPDATES_MADE;
        break;
      case 'DID_NOT_DELETE':
        customStatusCode = CustomErrorStatusCode.NO_DELETES_MADE;
        break;
      case 'TAG_DOES_NOT_EXIST':
        customStatusCode = CustomErrorStatusCode.NOT_FOUND_TAG;
        break;
      case 'TAG_TYPE_DOES_NOT_EXIST':
        customStatusCode = CustomErrorStatusCode.NOT_FOUND_TAG_TYPE;
        break;
      case 'MEMO_DOES_NOT_EXIST':
        customStatusCode = CustomErrorStatusCode.NOT_FOUND_MEMO;
        break;

      default:
        customStatusCode = status;
        break;
    }

    response.status(status).json({
      status: statusMessage.f,
      statusCode: customStatusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: error['message'] || error,
    });
  }
}
