import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemoDto } from '../dto/create-memo.dto';
import { Memo } from '../entities/memo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemoStatus } from '../memoState.enum';
import { UpdateMemoDto } from '../dto/update-memo.dto';
import { Payload } from 'src/auth/utils/jwtPayload';
import {
  NotFound,
  NotFoundMessage,
} from 'src/common/exception/not.found.exception';
import {
  NoChange,
  NoChangeMessage,
} from 'src/common/exception/no.change.exception';

@Injectable()
export class MemosService {
  constructor(@InjectRepository(Memo) private memoRepo: Repository<Memo>) {}

  async createMemo(createMemoDto: CreateMemoDto, user: Payload): Promise<Memo> {
    const { memoContent, influencerPlatformId } = createMemoDto;
    const userId = user['id'];

    const result = await this.memoRepo.create({
      memoContent: memoContent,
      influencerPlatformId: { id: influencerPlatformId },
      memoState: { id: MemoStatus.ACTIVE },
      userId: userId,
      creatorId: userId,
    });

    return this.memoRepo.save(result);
  }

  async getMemos(influencerPlatformId: number) {
    const result = await this.memoRepo.find({
      where: {
        memoState: { id: MemoStatus.ACTIVE },
        influencerPlatformId: { id: influencerPlatformId },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!result) {
      throw new NotFound(NotFoundMessage.NOT_FOUND_MEMO);
    }

    return result;
  }

  async getMemoById(influencerPlatformId: number, id: number) {
    const result = await this.memoRepo.findOne({
      where: {
        id: id,
        influencerPlatformId: { id: influencerPlatformId },
      },
    });

    if (!result) {
      throw new NotFound(NotFoundMessage.NOT_FOUND_MEMO);
    }

    return result;
  }

  async updateMemo(
    id: number,
    influencerPlatformId: number,
    memoData: UpdateMemoDto,
    user: Payload,
  ) {
    const userId = user['id'];
    const memo = await this.getMemoById(influencerPlatformId, id);

    if (userId != memo.userId) {
      throw new HttpException('ACCESS_DENIED', HttpStatus.FORBIDDEN);
    }

    const result = await this.memoRepo.update(memo.id, {
      memoContent: memoData.memoContent,
      updatorId: userId,
    });

    if (!result.affected) throw new NoChange(NoChangeMessage.NO_UPDATES_MADE);

    return result;
  }

  async deleteMemo(id: number, influencerPlatformId: number, user: Payload) {
    const userId = user['id'];
    const memo = await this.getMemoById(influencerPlatformId, id);

    if (userId != memo.userId) {
      throw new HttpException('Invalid Resource ID', HttpStatus.BAD_REQUEST);
    }

    const result = await this.memoRepo.update(memo.id, {
      memoState: { id: MemoStatus.INACTIVE },
    });

    if (!result.affected) throw new NoChange(NoChangeMessage.NO_DELETES_MADE);

    return result;
  }
}
