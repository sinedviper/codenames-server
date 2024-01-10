import { IsNotEmpty, Matches } from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
const loginRegEx = /^[a-zA-Z]{3,20}$/;

export class LoginDto {
  @IsNotEmpty({ message: 'Username can`t be empty' })
  @Matches(loginRegEx, {
    message:
      'Username must be from 3 to 20 characters and contain only english letters',
  })
  username: string;

  @IsNotEmpty({ message: 'Password can`t be empty' })
  @Matches(passwordRegEx, {
    message:
      'Password must be from 6 to 20 characters and contain one uppercase letter, one lowercase letter and one number',
  })
  password: string;
}
