import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class CreateRoomDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  id_creator: number;

  @Column({ type: 'integer' })
  id_status: number;

  @Column({ type: 'integer' })
  id_count_words: number;

  @Column({ type: 'integer', nullable: true })
  id_category_words?: number;

  @Column({ type: 'integer' })
  id_language_words: number;

  @Column({ type: 'integer', nullable: true })
  id_translation_words?: number;

  @Column({ type: 'integer' })
  time_for_break: number;

  @Column({ type: 'integer' })
  time_for_start: number;

  @Column({ type: 'integer' })
  time_for_round: number;

  @Column({ type: 'integer' })
  time_for_guess: number;

  @Column({ type: 'boolean' })
  translation_card: boolean;

  @Column({ type: 'varchar', length: 6, nullable: true })
  password: string;

  @Column({ type: 'boolean' })
  close_room: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
