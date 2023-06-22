import { HttpException, HttpStatus } from '@nestjs/common';

export class Duplicate extends HttpException {
  constructor(message: DuplicateMessage) {
    super(message, HttpStatus.OK);
  }
}

export enum DuplicateMessage {
  DUPLICATE_EMAIL = 'EMAIL_ALREADY_EXIST',
  DUPLICATE_USER_NAME = 'USERNAME_ALREADY_EXIST',
  DUPLICATE_TAG_TYPE = 'TAG_TYPE_ALREADY_EXIST',
  DUPLICATE_TAG_NAME = 'TAG_NAME_ALREADY_EXIST',
}
