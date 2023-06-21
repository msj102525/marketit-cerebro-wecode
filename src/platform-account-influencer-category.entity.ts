import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from './common/entities/common.entity';
import { PlatformAccount } from './platform-account/entities/platform.account.entity';
import { InfluencerCategory } from './influencer-category.entity';

@Entity()
export class PlatformAccountInfluencerCategory extends CommonEntity {
  @Column()
  category: string;

  @Column({ name: 'category_type' })
  categoryType: string;

  @ManyToOne(
    () => PlatformAccount,
    (platformAccount) => platformAccount.paInfluencerCategories,
  )
  @JoinColumn({ name: 'influencer_platform_id' })
  influencerPlatformId: PlatformAccount;

  @ManyToOne(
    () => InfluencerCategory,
    (influencerCategory) => influencerCategory.paInfluencerCategories,
  )
  @JoinColumn({ name: 'influencer_category_id' })
  influencerCategoryId: InfluencerCategory;
}
