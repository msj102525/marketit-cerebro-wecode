import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiResponse } from 'src/common/response/api.response';
import { statusMessage } from 'src/common/response/status.message.enum';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createTag(@Body() tagData: CreateTagDto) {
    const result = await this.tagsService.createTag(tagData);
    return new ApiResponse(statusMessage.s, HttpStatus.CREATED, result);
  }

  @Get()
  async getAllTags() {
    const tags = await this.tagsService.getAllTags();
    return new ApiResponse(statusMessage.s, HttpStatus.OK, tags);
  }

  @Get('/:id')
  async getTagById(@Param('id') tagId: number) {
    const tag = await this.tagsService.getTagById(tagId);
    return new ApiResponse(statusMessage.s, HttpStatus.OK, tag);
  }

  @Patch('/:id')
  async updateTag(@Param('id') tagId: number, @Body() tagData: UpdateTagDto) {
    const result = await this.tagsService.updateTag(tagId, tagData);
    return new ApiResponse(statusMessage.s, HttpStatus.OK, result);
  }

  @Delete('/:id')
  async deleteTag(@Param('id') tagId: number) {
    const result = await this.tagsService.deleteTag(tagId);
    return new ApiResponse(statusMessage.s, HttpStatus.OK, result);
  }
}
