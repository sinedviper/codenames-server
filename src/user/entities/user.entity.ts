import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  avatar: number;

  @Column({ type: 'varchar', length: 7 })
  color: number;

  @Column({ type: 'varchar', length: 10 })
  status: number;

  @Column({ type: 'integer' })
  scores: number;

  @Column({ type: 'integer' })
  wins: number;

  @Column({ type: 'integer' })
  lose: number;
}
