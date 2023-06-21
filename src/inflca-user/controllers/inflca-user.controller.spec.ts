import { Test, TestingModule } from '@nestjs/testing';
import { InflcaUserController } from './inflca-user.controller';
import { InflcaUserService } from '../services/inflca-user.service';

describe('InflcaUserController', () => {
  let controller: InflcaUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InflcaUserController],
      providers: [InflcaUserService],
    }).compile();

    controller = module.get<InflcaUserController>(InflcaUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
