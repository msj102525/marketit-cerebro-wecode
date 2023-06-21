import { Injectable } from '@nestjs/common';
import { CreatePlatformAccountChangeLogDto } from '../dto/create-platform-account-change-log.dto';
import { UpdatePlatformAccountChangeLogDto } from '../dto/update-platform-account-change-log.dto';

@Injectable()
export class PlatformAccountChangeLogService {
  create(createPlatformAccountChangeLogDto: CreatePlatformAccountChangeLogDto) {
    return 'This action adds a new platformAccountChangeLog';
  }

  findAll() {
    return `This action returns all platformAccountChangeLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} platformAccountChangeLog`;
  }

  update(
    id: number,
    updatePlatformAccountChangeLogDto: UpdatePlatformAccountChangeLogDto,
  ) {
    return `This action updates a #${id} platformAccountChangeLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} platformAccountChangeLog`;
  }
}
