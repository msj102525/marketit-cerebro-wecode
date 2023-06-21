import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlatformAccountOriginalCategory {
  @PrimaryGeneratedColumn({ name: 'pao_category_id' })
  paoCategoryId: number;

  @Column({ type: 'varchar', length: 100 })
  category: string;
}
