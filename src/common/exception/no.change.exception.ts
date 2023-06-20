import { HttpException, HttpStatus } from '@nestjs/common';

export class NoChange extends HttpException {
  constructor(message: NoChangeMessage) {
    super(message, HttpStatus.OK);
  }
}

export enum NoChangeMessage {
  NO_UPDATES_MADE = 'DID_NOT_UPDATE',
  NO_DELETES_MADE = 'DID_NOT_DELETE',
}
