import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamEntity } from '../../team/entities/team.entity';

@Entity()
export class ColorTeamEntity {
  @OneToOne(() => TeamEntity, (team) => team.id_color_team)
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
