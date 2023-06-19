import { HttpException, HttpStatus } from '@nestjs/common';

export class Exist extends HttpException {
  constructor(message: ExistMessage) {
    super(message, HttpStatus.CONFLICT);
  }
}

export enum ExistMessage {
  ALREADY_EXIST = 'TAG_TYPE_ALREADY_EXIST',
}
