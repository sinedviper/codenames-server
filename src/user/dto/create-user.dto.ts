import { IsNotEmpty, Matches } from 'class-validator';
import { loginRegEx, passwordRegEx } from '../../utils/constance';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(loginRegEx, {
    message:
      'Username must be from 3 to 20 characters and contain only english letters and one number',
  })
  username: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message:
      'Password must be from 6 to 20 characters and contain one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @IsNotEmpty()
  type: number;

  @IsNotEmpty()
  date_recover: Date;
}
