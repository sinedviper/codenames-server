import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class FriendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  id_user: number;

  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinColumn()
  id_friend: number;
}
