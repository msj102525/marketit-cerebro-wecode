import { Test, TestingModule } from '@nestjs/testing';
import { PlatformAccountChangeLogService } from './platform-account-change-log.service';

describe('PlatformAccountChangeLogService', () => {
  let service: PlatformAccountChangeLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformAccountChangeLogService],
    }).compile();

    service = module.get<PlatformAccountChangeLogService>(
      PlatformAccountChangeLogService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
