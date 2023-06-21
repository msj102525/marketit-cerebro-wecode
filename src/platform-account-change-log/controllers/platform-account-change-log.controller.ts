import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlatformAccountChangeLogService } from '../services/platform-account-change-log.service';
import { CreatePlatformAccountChangeLogDto } from '../dto/create-platform-account-change-log.dto';
import { UpdatePlatformAccountChangeLogDto } from '../dto/update-platform-account-change-log.dto';

@Controller('platform-account-change-log')
export class PlatformAccountChangeLogController {
  constructor(
    private readonly platformAccountChangeLogService: PlatformAccountChangeLogService,
  ) {}

  @Post()
  create(
    @Body()
    createPlatformAccountChangeLogDto: CreatePlatformAccountChangeLogDto,
  ) {
    return this.platformAccountChangeLogService.create(
      createPlatformAccountChangeLogDto,
    );
  }

  @Get()
  findAll() {
    return this.platformAccountChangeLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformAccountChangeLogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updatePlatformAccountChangeLogDto: UpdatePlatformAccountChangeLogDto,
  ) {
    return this.platformAccountChangeLogService.update(
      +id,
      updatePlatformAccountChangeLogDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformAccountChangeLogService.remove(+id);
  }
}
