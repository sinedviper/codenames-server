import { UserEntity } from '../../user/entities/user.entity';

export interface UserResponseInterface {
  user: Omit<UserEntity, 'password'>;
}
