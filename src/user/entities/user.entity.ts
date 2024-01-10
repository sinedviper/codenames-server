import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RequestFriendEntity } from '../../request-friend/entities/request-friend.entity';
import { TypeUserEntity } from '../../type-user/entities/type-user.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { FriendEntity } from '../../friend/entities/friend.entity';
import { CustomersEntity } from '../../customers/entities/customers.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  status?: string;

  @Column({ type: 'integer', default: 0 })
  scores: number;

  @Column({ type: 'integer', default: 0 })
  wins: number;

  @Column({ type: 'integer', default: 0 })
  lose: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => TypeUserEntity, (type_user) => type_user.id)
  @JoinColumn()
  idType: TypeUserEntity;

  @OneToMany(() => CustomersEntity, (customers) => customers.id_user)
  customers: CustomersEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.id_user)
  friends: FriendEntity[];

  @ManyToOne(() => RoomEntity, (room) => room.id_creator)
  rooms: RoomEntity[];

  @OneToMany(
    () => RequestFriendEntity,
    (request_friend) => request_friend.id_user,
  )
  friendRequests: RequestFriendEntity[];
}
