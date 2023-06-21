import { Test, TestingModule } from '@nestjs/testing';
import { PlatformAccountChangeLogController } from './platform-account-change-log.controller';
import { PlatformAccountChangeLogService } from '../services/platform-account-change-log.service';

describe('PlatformAccountChangeLogController', () => {
  let controller: PlatformAccountChangeLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformAccountChangeLogController],
      providers: [PlatformAccountChangeLogService],
    }).compile();

    controller = module.get<PlatformAccountChangeLogController>(
      PlatformAccountChangeLogController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
