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

  @ManyToMany(() => UserEntity, (user) => user.friends)
  @JoinColumn()
  id_user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  id_friend: UserEntity;
}
