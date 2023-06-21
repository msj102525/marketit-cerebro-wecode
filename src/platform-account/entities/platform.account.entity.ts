import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { CerebroInfluencer } from './cerebro.influencer.entity';
import { PlatformAccountInfluencerCategory } from 'src/platform-account-influencer-category.entity';
import { PlatformAccountChangeLog } from 'src/platform-account-change-log/entities/platform-account-change-log.entity';
import { PlatformAccountTag } from 'src/platform-account-tag.entity';
import { Memo } from 'src/memos/entities/memo.entity';

@Entity()
export class PlatformAccount extends CommonEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  platform_type: string;

  @Column({ type: 'int', nullable: false })
  follower: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  state: string;

  @ManyToOne(
    () => CerebroInfluencer,
    (cerebroInfluencer) => cerebroInfluencer.platformAccounts,
  )
  @JoinColumn({ name: 'cerebro_influencer_id' })
  cerebroInfluencer: CerebroInfluencer;

  @OneToMany(
    () => PlatformAccountInfluencerCategory,
    (paInfluencerCategory) => paInfluencerCategory.influencerPlatformId,
  )
  paInfluencerCategories: PlatformAccountInfluencerCategory[];

  @OneToMany(
    () => PlatformAccountChangeLog,
    (platformAccountChangeLog) => platformAccountChangeLog.influencerPlatformId,
  )
  platformAccountChangeLogs: PlatformAccountChangeLog[];

  @OneToMany(
    () => PlatformAccountTag,
    (platformAccountTag) => platformAccountTag.influencerPlatformId,
  )
  platformAccountTags: PlatformAccountTag[];

  @OneToMany(() => Memo, (memo) => memo.influencerPlatformId)
  memos: Memo[];
}
