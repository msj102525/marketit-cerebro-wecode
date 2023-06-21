import { PlatformAccount } from 'src/platform-account/entities/platform.account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InflcaUser {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @OneToOne(() => PlatformAccount)
  @JoinColumn({ name: 'influencer_platform_id' })
  influencerPlatformId: PlatformAccount;
}
