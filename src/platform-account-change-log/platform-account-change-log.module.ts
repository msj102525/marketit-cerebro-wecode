import { Module } from '@nestjs/common';
import { PlatformAccountChangeLogService } from './services/platform-account-change-log.service';
import { PlatformAccountChangeLogController } from './controllers/platform-account-change-log.controller';

@Module({
  controllers: [PlatformAccountChangeLogController],
  providers: [PlatformAccountChangeLogService],
})
export class PlatformAccountChangeLogModule {}
