import { Module } from '@nestjs/common';
import { InflcaUserService } from './services/inflca-user.service';
import { InflcaUserController } from './controllers/inflca-user.controller';

@Module({
  controllers: [InflcaUserController],
  providers: [InflcaUserService],
})
export class InflcaUserModule {}
