import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MemosService } from '../services/memos.service';
import { CreateMemoDto } from '../dto/create-memo.dto';
import { UpdateMemoDto } from '../dto/update-memo.dto';
import { ApiResponse } from 'src/common/response/api.response';
import { statusMessage } from '../../common/enums/status.message.enum';
import { JwtAuthGuard } from 'src/auth/utils/jwt.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/utils/jwtPayload';

@Controller('memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMemo(
    @Body() createMemoDto: CreateMemoDto,
    @Req() request: Request,
  ) {
    const user: Payload = request.user as Payload;
    const createdMemo = await this.memosService.createMemo(createMemoDto, user);
    return new ApiResponse(statusMessage.s, HttpStatus.CREATED, createdMemo);
  }

  @Get('/all')
  async getMemos(@Query('influencerPlatformId') influencerPlatformId: number) {
    const getMemos = await this.memosService.getMemos(influencerPlatformId);
    return new ApiResponse(statusMessage.s, HttpStatus.OK, getMemos);
  }

  @Get('')
  async getMemoById(
    @Query('influencerPlatformId') influencerPlatformId: number,
    @Query('memoId') id: number,
  ) {
    const getMemoById = await this.memosService.getMemoById(
      influencerPlatformId,
      id,
    );
    return new ApiResponse(statusMessage.s, HttpStatus.OK, getMemoById);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  async updateMemo(
    @Query('memoId') id: number,
    @Query('influencerPlatformId') influencerPlatformId: number,
    @Body() memoData: UpdateMemoDto,
    @Req() request: Request,
  ) {
    const user: Payload = request.user as Payload;
    await this.memosService.updateMemo(
      id,
      influencerPlatformId,
      memoData,
      user,
    );
    return new ApiResponse(statusMessage.s, HttpStatus.OK, null);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deleteMemo(
    @Query('memoId') id: number,
    @Query('influencerPlatformId') influencerPlatformId: number,
    @Req() request: Request,
  ) {
    const user: Payload = request.user as Payload;
    await this.memosService.deleteMemo(id, influencerPlatformId, user);
    return new ApiResponse(statusMessage.s, HttpStatus.OK, null);
  }
}
