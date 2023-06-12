import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from '../dtos/create.team.dto';
import { UpdateTeamDto } from '../dtos/update.team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private repository: Repository<Team>) {}
  create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { getName } = createTeamDto;
    const team = this.repository.create({
      name: getName(),
    });
    return this.repository.save(team);
  }

  findAll() {
    return `This action returns all teams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
