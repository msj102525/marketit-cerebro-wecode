import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MemoState } from './memoState.entity';

@Entity()
export class Memo extends CommonEntity {
  @Column({ name: 'memo_content', type: 'text' })
  memoContent: string;

  @Column({ name: 'influencer_platform_id', type: 'int' })
  influencerPlatformId: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => MemoState, (memoState) => memoState.memos)
  @JoinColumn({ name: 'memo_state_id' })
  memoState: MemoState;
}
