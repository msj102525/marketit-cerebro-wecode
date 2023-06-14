import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { TagType } from './entities/tagTypes.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagrepo: Repository<Tag>,
    @InjectRepository(TagType)
    private readonly tagtyperepo: Repository<TagType>,
  ) {}

  async createTag(tagData: CreateTagDto): Promise<void> {
    const tagType = await this.tagtyperepo.findOne({
      where: { tagType: tagData.tagType },
    });

    await this.tagrepo.save({
      tagName: tagData.tagName,
      tagType: tagType,
    });
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagrepo.find({
      relations: ['tagType', 'tagType.tagState'],
    });
  }

  async getTagById(tagId: number): Promise<Tag> {
    const tag: Tag = await this.tagrepo.findOne({
      relations: ['tagType', 'tagType.tagState'],
      where: { tagId },
    });

    if (!tag) {
      throw new HttpException(
        `Tag with id: ${tagId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return tag;
  }

  async updateTag(tagId: number, tagData: UpdateTagDto): Promise<void> {
    const updateTagType: TagType = await this.tagtyperepo.findOneBy({
      tagType: tagData.tagType,
    });

    if (!updateTagType) {
      throw new HttpException(`tag type not found`, HttpStatus.NOT_FOUND);
    }

    await this.tagrepo.update(
      { tagId },
      {
        tagName: tagData.tagName,
        tagType: updateTagType,
      },
    );
  }

  async deleteTag(tagId: number): Promise<void> {
    const tag: Tag = await this.tagrepo.findOneBy({ tagId });

    if (!tag) {
      throw new HttpException(
        `Tag with id: ${tagId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.tagrepo.delete(tagId);
  }
}
