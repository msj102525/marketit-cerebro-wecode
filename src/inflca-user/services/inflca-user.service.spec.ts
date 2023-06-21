import { Test, TestingModule } from '@nestjs/testing';
import { InflcaUserService } from './inflca-user.service';

describe('InflcaUserService', () => {
  let service: InflcaUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InflcaUserService],
    }).compile();

    service = module.get<InflcaUserService>(InflcaUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
