import { IsNotEmpty, Matches, MinLength, IsDateString } from 'class-validator';
import { loginRegEx, passwordRegEx } from '../../utils/constance';

export class CreateUserDto {
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

  @IsNotEmpty({ message: 'Color can`t be empty' })
  @MinLength(7, { message: 'Color must have at least 7 characters' })
  color: string;

  @IsNotEmpty({ message: 'Date can`t be empty' })
  @IsDateString({}, { message: 'Date must be date' })
  date_recover: Date;
}
