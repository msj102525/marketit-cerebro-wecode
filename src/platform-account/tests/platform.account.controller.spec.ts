import { Test, TestingModule } from '@nestjs/testing';
import { PlatformAccountController } from '../controllers/platform.account.controller';

describe('PlatformAccountController', () => {
  let controller: PlatformAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformAccountController],
    }).compile();

    controller = module.get<PlatformAccountController>(
      PlatformAccountController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
