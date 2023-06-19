import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { CerebroInfluencer } from '../../cerebro.influencer.entity';

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
  cerebroInfluencer: CerebroInfluencer;
}
