import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({ name: 'creator_id', nullable: true })
  creatorId: number;

  @Column({ name: 'updator_id', nullable: true })
  updatorId: number;

  @BeforeInsert()
  setCreatorAndUpdatorId() {
    // Set creatorId and updatorId based on currently logged in user
    // You can use an authentication library like Passport.js to get the currently logged in user
    // and set the creatorId and updatorId fields accordingly
  }
}
