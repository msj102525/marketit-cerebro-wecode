import { CommonEntity } from 'src/common/entities/common.entity';
import { PlatformAccount } from 'src/platform-account/entities/platform.account.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class PlatformAccountChangeLog extends CommonEntity {
  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'varchar', length: 30 })
  state: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @ManyToOne(
    () => PlatformAccount,
    (platformAccount) => platformAccount.platformAccountChangeLogs,
  )
  @JoinColumn({ name: 'influencer_platform_id' })
  influencerPlatformId: PlatformAccount;
}
