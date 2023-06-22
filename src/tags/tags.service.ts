import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { TagType } from './entities/tagTypes.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagTypeDto } from './dto/create-tag_type.dto';
import { UpdateTagTypeDto } from './dto/update-tag_type.dto';
import {
  NotFound,
  NotFoundMessage,
} from 'src/common/exception/not.found.exception';
import {
  Duplicate,
  DuplicateMessage,
} from 'src/common/exception/duplicate.exception';
import { Payload } from 'src/auth/utils/jwtPayload';
import { SerializedTagType } from 'src/common/serializers/serialized.tagType';
import { TagTypeStatus } from 'src/common/response/tagType.status.enum';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagrepo: Repository<Tag>,
    @InjectRepository(TagType)
    private readonly tagtyperepo: Repository<TagType>,
  ) {}

  async createTag(tagData: CreateTagDto): Promise<void> {
    const tagType = await this.getTagTypeById(tagData.tagTypeId);
    const tag = await this.getTagByName(tagData.tagName);

    if (tag) {
      throw new Duplicate(DuplicateMessage.DUPLICATE_TAG_NAME);
    }

    await this.tagrepo.save({
      tagName: tagData.tagName,
      tagType: tagType,
    });
  }

  async getAllTags(user: Payload): Promise<Tag[]> {
    const userId: number = user.id;

    return await this.tagrepo.find({
      relations: ['tagType', 'tagType.tagState'],
      where: [
        { tagType: { tagState: { id: 1 } } }, // tag is public
        {
          tagType: { tagState: { id: 2 }, userId }, // tag is private and owned by user
        },
      ],
    });
  }

  async getTagById(tagId: number): Promise<Tag> {
    const tag: Tag = await this.tagrepo.findOne({
      relations: ['tagType', 'tagType.tagState'],
      where: { tagId },
    });

    if (!tag) {
      throw new NotFound(NotFoundMessage.NOT_FOUND_TAG);
    }

    return tag;
  }

  async updateTag(tagId: number, tagData: UpdateTagDto): Promise<void> {
    await this.getTagById(tagId);

    const tagType: TagType = await this.getTagTypeById(tagData.tagTypeId);

    await this.tagrepo.update(
      { tagId },
      {
        tagName: tagData.tagName,
        tagType: tagType,
      },
    );
  }

  async deleteTag(tagId: number): Promise<void> {
    const result = await this.tagrepo.delete(tagId);

    if (!result.affected) {
      throw new NotFound(NotFoundMessage.NOT_FOUND_TAG);
    }
  }

  async createTagType(createTagTypeDto: CreateTagTypeDto): Promise<TagType> {
    const tagTypeFind = await this.isExistTagTypeByCreatedDto(createTagTypeDto);

    if (tagTypeFind) {
      throw new Duplicate(DuplicateMessage.DUPLICATE_TAG_TYPE);
    }

    await this.tagtyperepo.save({
      tagType: createTagTypeDto.tagType,
      tagState: { id: createTagTypeDto.tagState },
      userId: createTagTypeDto.userId,
    });

    const tagTypeResult = await this.isExistTagTypeByCreatedDto(
      createTagTypeDto,
    );

    return tagTypeResult;
  }

  async findAllTagTpyesByStatus(
    status: number,
    userId: number,
  ): Promise<SerializedTagType[]> {
    const tagTypesArray = await this.findAllTagTypeByStatusUserId(
      status,
      userId,
    );
    return tagTypesArray;
  }

  async updateTagType(
    id: number,
    updateTagTypeDto: UpdateTagTypeDto,
  ): Promise<TagType> {
    const tagTypeFindById = await this.isExistTagTypeById({
      relations: ['tagState'],
      where: { id },
    });

    Object.assign(tagTypeFindById, updateTagTypeDto);

    return await this.tagtyperepo.save(tagTypeFindById);
  }

  async removeTagType(id: number): Promise<string> {
    const tagTypeFindById = await this.isExistTagTypeById({ where: { id } });

    await this.tagtyperepo.remove(tagTypeFindById);

    return `This action removes a tagTypeId: ${id}`;
  }

  private async findAllTagTypeByStatusUserId(
    status: number,
    userId?: number,
  ): Promise<SerializedTagType[]> {
    const whereCondition: any = {
      tagState: Equal(status),
    };

    if (status == TagTypeStatus.Private) {
      whereCondition.userId = Equal(userId);
    }

    const tagTypesArray = await this.tagtyperepo.find({
      where: whereCondition,
      relations: ['tagState', 'tag.tagType'],
      order: {
        tag: { tagId: 'ASC' },
      },
    });

    const modifiedTagTypesArray = tagTypesArray.map((tagType) => {
      const modifiedTags = tagType.tag.map(({ tagType, ...rest }) => rest);
      return { ...tagType, tag: modifiedTags };
    });

    return modifiedTagTypesArray;
  }

  private async getTagTypeById(tagTypeId: number) {
    const tagType: TagType = await this.tagtyperepo.findOne({
      where: { id: tagTypeId },
    });

    if (!tagType) {
      throw new NotFound(NotFoundMessage.NOT_FOUND_TAG_TYPE);
    }

    return tagType;
  }

  private async isExistTagTypeById(
    option: FindOneOptions<TagType>,
  ): Promise<TagType> {
    const tagTypeFindById = await this.tagtyperepo.findOne(option);

    if (!tagTypeFindById) {
      throw new NotFound(NotFoundMessage.NOT_FOUND_TAG_TYPE);
    }

    return tagTypeFindById;
  }

  private async isExistTagTypeByCreatedDto(
    createTagTypeDto: CreateTagTypeDto,
  ): Promise<TagType> {
    const { tagType, tagState, userId } = createTagTypeDto;

    const tagTypeFind: TagType | undefined = await this.tagtyperepo.findOne({
      relations: ['tagState'],
      where: {
        tagState: Equal(tagState),
        tagType: tagType,
        userId: userId,
      },
    });

    return tagTypeFind;
  }

  private async getTagByName(tagName: string): Promise<Tag> {
    return await this.tagrepo.findOne({
      relations: ['tagType', 'tagType.tagState'],
      where: { tagName },
    });
  }
}
