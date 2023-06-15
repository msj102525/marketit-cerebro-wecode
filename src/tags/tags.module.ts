import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from './entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagType } from './entities/tagTypes.entity';
import { TagState } from './entities/tagState.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, TagType, TagState])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
