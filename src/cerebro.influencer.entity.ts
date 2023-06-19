import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlatformAccount } from './platform-account/entities/platform.account.entity';

@Entity()
export class CerebroInfluencer {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    name: 'phone_number',
    length: 50,
    type: 'varchar',
    nullable: true,
  })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  citizenship: string;

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
  detailed_address: string;

  @Column({ type: 'double', nullable: true })
  latitude: number;

  @Column({ type: 'double', nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  height: number;

  @OneToMany(
    () => PlatformAccount,
    (platformAccount) => platformAccount.cerebroInfluencer,
  )
  platformAccounts: PlatformAccount;
}
