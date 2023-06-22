import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { Tag } from './entities/tags.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagType } from './entities/tagTypes.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Payload } from 'src/auth/utils/jwtPayload';

describe('TagsService', () => {
  let service: TagsService;
  let tagrepo: Repository<Tag>;
  let tagtyperepo: Repository<TagType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TagType),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    tagrepo = module.get<Repository<Tag>>(getRepositoryToken(Tag));
    tagtyperepo = module.get<Repository<TagType>>(getRepositoryToken(TagType));
  });

  describe('Tag', () => {
    it('태그 생성하기', async () => {
      const createTagDto: CreateTagDto = {
        tagName: 'tagName',
        tagTypeId: 1,
      };
      const mockTagType = new TagType();

      jest
        .spyOn(tagtyperepo, 'findOne')
        .mockImplementation(async () => mockTagType);
      jest.spyOn(tagrepo, 'save').mockResolvedValue(undefined);

      const result = await service.createTag(createTagDto);

      expect(result).toEqual(undefined);
      expect(tagtyperepo.findOne).toBeCalledWith({
        where: { id: createTagDto.tagTypeId },
      });
      expect(tagrepo.save).toBeCalledWith({
        tagName: createTagDto.tagName,
        tagType: mockTagType,
      });
    });

    it('태그 불러오기', async () => {
      const user: Payload = {
        id: 1,
        email: 'test@test.com',
      };

      const mockTags = [new Tag(), new Tag()];

      jest.spyOn(tagrepo, 'find').mockResolvedValue(mockTags);

      const result = await service.getAllTags(user);

      expect(result).toEqual(mockTags);
    });

    it('태그 수정하기', async () => {
      const tagId = 1;
      const updateTagDto: UpdateTagDto = {
        tagName: 'tagName',
        tagTypeId: 1,
      };

      const mockTag = new Tag();
      const mockTagType = new TagType();

      jest.spyOn(service, 'getTagById').mockImplementation(async () => mockTag);
      jest.spyOn(service as any, 'getTagTypeById').mockReturnValue(mockTagType);
      jest.spyOn(tagrepo, 'update').mockResolvedValue(undefined);

      const result = await service.updateTag(tagId, updateTagDto);

      expect(result).toEqual(undefined);
      expect(service.getTagById).toBeCalledWith(tagId);
      expect(tagrepo.update).toBeCalledWith(
        { tagId },
        {
          tagName: updateTagDto.tagName,
          tagType: mockTagType,
        },
      );
    });

    it('태그 삭제하기', async () => {
      const tagId = 1;
      const deleteResult = { raw: [], affected: 1 };

      jest.spyOn(tagrepo, 'delete').mockResolvedValue(deleteResult);

      const result = await service.deleteTag(tagId);

      expect(result).toEqual(undefined);
      expect(tagrepo.delete).toBeCalledWith(tagId);
    });
  });
});
