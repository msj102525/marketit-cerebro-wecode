import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { databaseConfig } from 'ormconfig/database.config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth/auth.service';
import { UsersService } from './users/services/users.service';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/controllers/users.controller';
import { AuthController } from './auth/controllers/auth/auth.controller';
import { TagsModule } from './tags/tags.module';
import { PlatformAccount } from './platform-account/entities/platform.account.entity';
import { PlatformAccountController } from './platform-account/controllers/platform.account.controller';
import { PlatformAccountService } from './platform-account/services/platform.account.service';
import { MemosModule } from './memos/memos.module';
import { InflcaUserModule } from './inflca-user/inflca-user.module';
import { PlatformAccountChangeLogModule } from './platform-account-change-log/platform-account-change-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User, PlatformAccount]),
    UsersModule,
    TeamsModule,
    AuthModule,
    TagsModule,
    MemosModule,
    InflcaUserModule,
    PlatformAccountChangeLogModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    PlatformAccountController,
  ],
  providers: [
    AppService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    {
      provide: 'PLATFORMACCOUNT_SERVICE',
      useClass: PlatformAccountService,
    },
  ],
})
export class AppModule {}
