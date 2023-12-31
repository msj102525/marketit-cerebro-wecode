import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagType } from './tagTypes.entity';

@Entity('tag_state')
export class TagState {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'tag_state' })
  tagState: string;

  @OneToMany(() => TagType, (tagType) => tagType.tagState)
  tagType: TagType[];
}
