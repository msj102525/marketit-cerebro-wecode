import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagType } from './tagTypes.entity';
import { PlatformAccountTag } from 'src/platform-account-tag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ name: 'id' })
  tagId: number;

  @Column({ name: 'tag_name' })
  tagName: string;

  @ManyToOne(() => TagType, (tagType) => tagType.tag)
  @JoinColumn({ name: 'tag_type_id' })
  tagType: TagType;

  @OneToMany(
    () => PlatformAccountTag,
    (platformAccountTag) => platformAccountTag.tagId,
  )
  platformAccountTags: PlatformAccountTag[];
}
