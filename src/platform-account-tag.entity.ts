import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from './common/entities/common.entity';
import { PlatformAccount } from './platform-account/entities/platform.account.entity';
import { Tag } from './tags/entities/tags.entity';

@Entity()
export class PlatformAccountTag extends CommonEntity {
  @ManyToOne(
    () => PlatformAccount,
    (platformAccount) => platformAccount.platformAccountTags,
  )
  @JoinColumn({ name: 'influencer_platform_id' })
  influencerPlatformId: PlatformAccount;

  @ManyToOne(() => Tag, (tag) => tag.platformAccountTags)
  @JoinColumn({ name: 'tag_id' })
  tagId: Tag;
}
