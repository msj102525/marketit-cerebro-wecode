import { Test, TestingModule } from '@nestjs/testing';
import { MemosController } from './memos.controller';
import { MemosService } from '../services/memos.service';

describe('MemosController', () => {
  let controller: MemosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemosController],
      providers: [MemosService],
    }).compile();

    controller = module.get<MemosController>(MemosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
