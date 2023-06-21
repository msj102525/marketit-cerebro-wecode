import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MemoState } from './memoState.entity';
import { PlatformAccount } from 'src/platform-account/entities/platform.account.entity';

@Entity()
export class Memo extends CommonEntity {
  @Column({ name: 'memo_content', type: 'text' })
  memoContent: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => MemoState, (memoState) => memoState.memos)
  @JoinColumn({ name: 'memo_state_id' })
  memoState: MemoState;

  @ManyToOne(() => PlatformAccount, (platformAccount) => platformAccount.memos)
  @JoinColumn({ name: 'influencer_platform_id' })
  influencerPlatformId: PlatformAccount;
}
