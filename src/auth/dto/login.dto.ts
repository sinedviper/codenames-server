import { IsNotEmpty, Matches } from 'class-validator';
import { loginRegEx, passwordRegEx } from '../../utils/constance';

export class LoginDto {
  @IsNotEmpty({ message: 'Username can`t be empty' })
  @Matches(loginRegEx, {
    message:
      'Username must be from 3 to 20 characters and contain only english letters and one number',
  })
  username: string;

  @IsNotEmpty({ message: 'Password can`t be empty' })
  @Matches(passwordRegEx, {
    message:
      'Password must be from 6 to 20 characters and contain one uppercase letter, one lowercase letter and one number',
  })
  password: string;
}
