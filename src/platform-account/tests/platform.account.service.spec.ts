import { Test, TestingModule } from '@nestjs/testing';
import { PlatformAccountService } from '../services/platform.account.service';

describe('PlatformAccountService', () => {
  let service: PlatformAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformAccountService],
    }).compile();

    service = module.get<PlatformAccountService>(PlatformAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
