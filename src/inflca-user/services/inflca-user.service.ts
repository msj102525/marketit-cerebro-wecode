import { Injectable } from '@nestjs/common';
import { CreateInflcaUserDto } from '../dto/create-inflca-user.dto';
import { UpdateInflcaUserDto } from '../dto/update-inflca-user.dto';

@Injectable()
export class InflcaUserService {
  create(createInflcaUserDto: CreateInflcaUserDto) {
    return 'This action adds a new inflcaUser';
  }

  findAll() {
    return `This action returns all inflcaUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inflcaUser`;
  }

  update(id: number, updateInflcaUserDto: UpdateInflcaUserDto) {
    return `This action updates a #${id} inflcaUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} inflcaUser`;
  }
}
