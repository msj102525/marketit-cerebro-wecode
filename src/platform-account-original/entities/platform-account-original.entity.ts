import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PlatformAccountOriginal extends CommonEntity {
  @Column({
    name: 'platform_type',
    length: 50,
    type: 'varchar',
    nullable: false,
  })
  platformType: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Column({ name: 'display_name', length: 50, type: 'varchar', nullable: true })
  displayName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  follower: number;

  @Column({ type: 'int', nullable: true })
  following: number;

  @Column({
    name: 'engagement_rate',
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true,
  })
  engagementRate: number;

  @Column({ name: 'is_verified', nullable: true })
  isVerified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({
    name: 'cellphone_country_code',
    length: 50,
    type: 'varchar',
    nullable: true,
  })
  cellphoneCountryCode: string;

  @Column({
    name: 'cellphone_number',
    length: 50,
    type: 'varchar',
    nullable: true,
  })
  cellphoneNumber: string;

  @Column({
    name: 'phone_country_code',
    length: 50,
    type: 'varchar',
    nullable: true,
  })
  phoneCountryCode: string;

  @Column({ name: 'phone_number', length: 50, type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'text', nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  label: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  region: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({
    name: 'detailed_address',
    length: 100,
    type: 'varchar',
    nullable: true,
  })
  detailedAddress: string;

  @Column({ name: 'zip_code', type: 'varchar', length: 50, nullable: true })
  zipCode: string;

  @Column({ type: 'double', nullable: true })
  latitude: number;

  @Column({ type: 'double', nullable: true })
  longitude: number;

  @Column({ name: 'inflca_user_id', type: 'int', nullable: true })
  inflcaUserId: number;

  @Column({ name: 'inflma_user_id', type: 'int', nullable: true })
  inflmaUserId: number;

  @Column({ name: 'hypeauditor_user_id', type: 'int', nullable: true })
  hypeauditorUserId: number;

  @Column({
    name: 'influencer_platform_id',
    type: 'int',
    nullable: true,
  })
  influencerPlatformId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  height: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  citizenship: string;

  @Column({ name: 'platform_uid', type: 'varchar', length: 50, nullable: true })
  platformUid: string;
}
