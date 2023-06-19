import { HttpException, HttpStatus } from '@nestjs/common';

export class Unauthorized extends HttpException {
  constructor(message: UnAuthroizedMessage) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export enum UnAuthroizedMessage {
  NOT_VALIDATED_USER = 'ACCESS_DENIED',
}
