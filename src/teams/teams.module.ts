import { Module } from '@nestjs/common';
import { TeamsController } from './controllers/teams.controller';
import { TeamsService } from './services/teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
