import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RequestFriendEntity } from '../../request-friend/entities/request-friend.entity';
import { TypeUserEntity } from '../../type-user/entities/type-user.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { FriendEntity } from '../../friend/entities/friend.entity';
import { CustomersEntity } from '../../customers/entities/customers.entity';
import { ImagesEntity } from '../../images/entities/images.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @ManyToOne(() => TypeUserEntity, (typeUser) => typeUser.id, { eager: true })
  @JoinColumn({ name: 'id_type' })
  id_type: TypeUserEntity;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'date' })
  date_recover: Date;

  @ManyToOne(() => ImagesEntity, (image) => image.id, {
    nullable: true,
    eager: true,
    orphanedRowAction: 'nullify',
    cascade: true,
  })
  @JoinColumn()
  avatar?: ImagesEntity;

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

  @ManyToMany(() => CustomersEntity, (customers) => customers.id_user)
  customers: number;

  @ManyToMany(() => FriendEntity, (friend) => friend.id_user)
  friends: number;

  @OneToMany(() => RoomEntity, (room) => room.id_creator)
  rooms: number;

  @OneToMany(
    () => RequestFriendEntity,
    (request_friend) => request_friend.id_user,
  )
  friendRequests: RequestFriendEntity;
}
