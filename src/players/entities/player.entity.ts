import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamEntity } from '../../team/entities/team.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { TypeUserEntity } from '../../type-user/entities/type-user.entity';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamEntity, (team) => team.players)
  @JoinColumn()
  id_team: TeamEntity;

  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinColumn()
  id_user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn()
  id_room: RoomEntity;

  @OneToOne(() => TypeUserEntity, (type_user) => type_user.id)
  @JoinColumn()
  id_type_user: TypeUserEntity;
}
