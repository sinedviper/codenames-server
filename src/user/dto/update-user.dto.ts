import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { TypeUserEntity } from '../../type-user/entities/type-user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  id_type: TypeUserEntity;

  @IsNotEmpty()
  avatar?: string;

  @IsNotEmpty()
  color?: string;

  @IsNotEmpty()
  status?: string;

  @IsNotEmpty()
  scores?: number;

  @IsNotEmpty()
  wins?: number;

  @IsNotEmpty()
  lose?: number;

  @IsNotEmpty()
  date_recover?: Date;
}
