import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  constructor(
    public readonly status: string,
    public readonly statusCode: HttpStatus,
    public readonly data: T,
  ) {}
}
