import { Module } from '@nestjs/common';
import { MemosService } from './services/memos.service';
import { MemosController } from './controllers/memos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entities/memo.entity';
import { MemoState } from './entities/memoState.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memo, MemoState])],
  controllers: [MemosController],
  providers: [MemosService],
})
export class MemosModule {}
