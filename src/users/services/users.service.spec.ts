import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('유저가 생성되어야한다.', async () => {
      // 데이터 생성
      const createUserDto: CreateUserDto = {
        name: '김태수',
        email: 'taesoo@test.com',
        password: '123',
      };

      jest.spyOn(repository, 'create').mockReturnValue(createUserDto as User);
      jest.spyOn(repository, 'save').mockResolvedValue(createUserDto as User);

      // 서비스에서 생성
      const result = await service.create(createUserDto);

      // 결과
      expect(result).toEqual(createUserDto);
      expect(repository.create).toBeCalledWith(createUserDto);
      expect(repository.save).toBeCalledWith(createUserDto);
    });
  });
  describe('findAll', () => {
    it('주어진 유저 전체 찾기가 가능해야한다.', async () => {
      const users = [new User(), new User()];
      jest.spyOn(repository, 'find').mockResolvedValue(users);

      const result = await service.findAll();

      expect(repository.find).toBeCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('주어진 id로 해당 유저의 정보를 조회할 수 있어야한다.', async () => {
      const user = new User();
      user.id = 1;
      user.name = '홍길동';
      user.email = 'hong@test.com';
      user.password = '123';

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(repository.findOne).toBeCalledWith({ where: { id: 1 } });
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('해당 아이디로 유저는 업데이트 되어야한다.', async () => {
      const id = 1;
      const updateUser: CreateUserDto = {
        name: '홍길동',
        email: 'hong@test.com',
        password: '123',
      };
      const user = new User();
      user.id = id;
      user.name = '감말순';
      user.email = 'kim@test.com';
      user.password = '123';

      const updatedUser = new User();
      updatedUser.id = id;
      updatedUser.name = updateUser.name;
      updatedUser.email = updateUser.email;
      updatedUser.password = updateUser.password;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedUser);

      const result = await service.update(id, updateUser);

      expect(repository.findOne).toBeCalledWith({ where: { id } });
      expect(repository.save).toBeCalledWith(updatedUser);
      expect(result).toEqual(updatedUser);
    });
  });
});
