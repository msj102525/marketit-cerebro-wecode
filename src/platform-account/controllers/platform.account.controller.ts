import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { PlatformAccountService } from '../services/platform.account.service';
import { SerializedPlatformAccount } from '../serializers/platform.account.serializer';
import { ApiResponse } from '../../common/response/api.response';
import { statusMessage } from '../../common/response/status.message.enum';

@Controller('platform')
export class PlatformAccountController {
  constructor(
    @Inject('PLATFORMACCOUNT_SERVICE')
    private readonly paService: PlatformAccountService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getPlatformAccounts() {
    const result = await this.paService.getPlatformAccounts();

    return new ApiResponse(statusMessage.s, HttpStatus.OK, result);
  }
}
