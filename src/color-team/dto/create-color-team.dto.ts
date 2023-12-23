import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CreateColorTeamDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
