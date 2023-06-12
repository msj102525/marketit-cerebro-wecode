import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    const user = this.repository.create({
      name: name,
      email: email,
      password: password,
    });

    return await this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = updateUserDto;

    const user = await this.findOne(id);
    user.name = name;
    user.email = email;
    user.password = password;
    return this.repository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
