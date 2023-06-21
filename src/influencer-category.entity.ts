import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common/entities/common.entity';
import { PlatformAccountInfluencerCategory } from './platform-account-influencer-category.entity';

@Entity()
export class InfluencerCategory extends CommonEntity {
  @Column()
  category: string;

  @Column({ name: 'category_type' })
  categoryType: string;

  @OneToMany(
    () => PlatformAccountInfluencerCategory,
    (paInfluencerCategory) => paInfluencerCategory.influencerCategoryId,
  )
  paInfluencerCategories: PlatformAccountInfluencerCategory[];
}
