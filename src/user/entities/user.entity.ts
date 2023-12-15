import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RequestFriendEntity } from '../../request-friend/entities/request-friend.entity';
import { PlayerEntity } from '../../players/entities/player.entity';
import { TypeUserEntity } from '../../type-user/entities/type-user.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { FriendEntity } from '../../friend/entities/friend.entity';
import { CustomersEntity } from '../../customers/entities/customers.entity';

@Entity()
export class UserEntity {
  @OneToMany(() => CustomersEntity, (customers) => customers.id_user)
  @OneToMany(() => FriendEntity, (friend) => friend.id_user)
  @ManyToMany(() => FriendEntity, (friend) => friend.id_friend)
  @OneToMany(() => RoomEntity, (room) => room.id_creator)
  @OneToMany(
    () => RequestFriendEntity,
    (request_friend) => request_friend.id_user,
  )
  @ManyToMany(
    () => RequestFriendEntity,
    (request_friend) => request_friend.id_request,
  )
  @ManyToMany(() => PlayerEntity, (players) => players.id_user)
  @PrimaryGeneratedColumn()
  @JoinColumn()
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

  @OneToOne(() => TypeUserEntity, (type_user) => type_user.id)
  @JoinColumn()
  id_type: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
