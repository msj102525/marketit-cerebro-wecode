import { Module } from '@nestjs/common';
import { PlatformAccountService } from './services/platform.account.service';
import { PlatformAccountController } from './controllers/platform.account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformAccount } from './entities/platform.account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformAccount])],
  providers: [
    {
      provide: 'PLATFORMACCOUNT_SERVICE',
      useClass: PlatformAccountService,
    },
  ],
  controllers: [PlatformAccountController],
})
export class PlatformAccountModule {}
