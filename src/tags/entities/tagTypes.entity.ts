import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tag } from './tags.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { TagState } from './tagState.entity';

@Entity('tag_type')
export class TagType extends CommonEntity {
  @Column({ name: 'tag_type' })
  tagType: string;

  @OneToMany(() => Tag, (tag) => tag.tagType, { onDelete: 'CASCADE' })
  tag: Tag[];

  @ManyToOne(() => TagState, (tagState) => tagState.tagType, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_state_id' })
  tagState: TagState;
}
