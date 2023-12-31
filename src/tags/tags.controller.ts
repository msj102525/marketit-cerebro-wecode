import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiResponse } from 'src/common/response/api.response';
import { statusMessage } from '../common/enums/status.message.enum';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagTypeDto } from './dto/create-tag_type.dto';
import { UpdateTagTypeDto } from './dto/update-tag_type.dto';
import { JwtAuthGuard } from 'src/auth/utils/jwt.guard';
import { Request } from 'express';
import { Tag } from './entities/tags.entity';
import { Payload } from 'src/auth/utils/jwtPayload';
import { stat } from 'fs';

@Controller('tag')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createTag(@Body() tagData: CreateTagDto) {
    const result = await this.tagsService.createTag(tagData);
    return new ApiResponse(statusMessage.s, HttpStatus.CREATED, result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTags(@Req() request: Request) {
    const user: Payload = request.user as Payload;
    const tags: Tag[] = await this.tagsService.getAllTags(user);
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

  @Post('/type')
  @UseGuards(JwtAuthGuard)
  async createTagType(
    @Body() createTagTypeDto: CreateTagTypeDto,
    @Req() req: Request,
  ) {
    const user: Payload = req.user as Payload;

    createTagTypeDto.userId = user.id;

    const createTagType = await this.tagsService.createTagType(
      createTagTypeDto,
    );
    return new ApiResponse(statusMessage.s, HttpStatus.CREATED, createTagType);
  }

  @Get('/type/all')
  @UseGuards(JwtAuthGuard)
  async findAllTagTypesByStatus(
    @Query('status') status: number,
    @Req() req: Request,
  ) {
    const user: Payload = req.user as Payload;

    const userId = user.id;

    const tagTypes = await this.tagsService.findAllTagTpyesByStatus(
      status,
      userId,
    );
    return new ApiResponse(statusMessage.s, HttpStatus.OK, tagTypes);
  }

  @Patch('/type/:id')
  async updateTagType(
    @Param('id') id: number,
    @Body() updateTagTypeDto: UpdateTagTypeDto,
  ) {
    const updateTagType = await this.tagsService.updateTagType(
      id,
      updateTagTypeDto,
    );
    return new ApiResponse(statusMessage.s, HttpStatus.OK, updateTagType);
  }

  @Delete('/type/:id')
  async removeTagType(@Param('id') id: number) {
    const deleteTagType = await this.tagsService.removeTagType(id);
    return new ApiResponse(
      statusMessage.s,
      HttpStatus.NO_CONTENT,
      deleteTagType,
    );
  }
}
