import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagType } from './tagTypes.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ name: 'id' })
  tagId: number;

  @Column({ name: 'tag_name' })
  tagName: string;

  @ManyToOne(() => TagType, (tagType) => tagType.tag)
  @JoinColumn({ name: 'tag_type_id' })
  tagType: TagType;
}
