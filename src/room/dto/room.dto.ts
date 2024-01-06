import { Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoomStatusEntity } from '../../room-status/entities/room-status.entity';
import { CountWordEntity } from '../../count-words/entities/count-word.entity';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';
import { LanguageEntity } from '../../languages/entities/language.entity';

export class RoomDto {
  @Column({ type: 'integer' })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.rooms)
  @JoinColumn()
  creator: number;

  @ManyToOne(() => RoomStatusEntity, (room_status) => room_status.id)
  @JoinColumn()
  status: RoomStatusEntity;

  @ManyToOne(() => CountWordEntity, (count_words) => count_words.id)
  @JoinColumn()
  count_words: CountWordEntity;

  @ManyToOne(() => CategoryWordEntity, (category_words) => category_words.id, {
    nullable: true,
  })
  @JoinColumn()
  category_words?: CategoryWordEntity;

  @ManyToOne(() => LanguageEntity, (languages) => languages.id)
  @JoinColumn()
  language_words: LanguageEntity;

  @ManyToOne(() => LanguageEntity, (languages) => languages.id, {
    nullable: true,
  })
  @JoinColumn()
  translation_words?: LanguageEntity;

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
