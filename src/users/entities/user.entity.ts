import { Column, Entity, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Team, (team) => team.users, { onDelete: 'CASCADE' })
  team: Team;
}
