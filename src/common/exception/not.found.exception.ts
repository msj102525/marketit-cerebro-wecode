import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor(message: NotFoundMessage) {
    super(message, HttpStatus.OK);
  }
}

export enum NotFoundMessage {
  NOT_FOUND_TAG = 'TAG_DOES_NOT_EXIST',
  NOT_FOUND_TAG_TYPE = 'TAG_TYPE_DOES_NOT_EXIST',
  NOT_FOUND_MEMO = 'MEMO_DOES_NOT_EXIST',
}
