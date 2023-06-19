import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Memo } from './memo.entity';

@Entity()
export class MemoState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'memo_state' })
  memoState: string;

  @OneToMany(() => Memo, (memo) => memo.memoState)
  memos: Memo[];
}
