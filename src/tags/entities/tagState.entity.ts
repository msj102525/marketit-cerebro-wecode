import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from 'src/common/entity/common.entity';
import { TagType } from './tagTypes.entity';

@Entity('tag_state')
export class TagState {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'tag_state' })
  tagState: string;

  @OneToMany(() => TagType, (tagType) => tagType.tagState, {
    onDelete: 'CASCADE',
  })
  tagType: TagType[];
}
