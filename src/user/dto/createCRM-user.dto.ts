import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCRMUserDto {
  @IsNotEmpty()
  @MinLength(1, { message: 'Username must have at least 3 characters.' })
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: number;
}
