import { IsNotEmpty, Matches, MinLength } from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Id can`t be empty' })
  id: number;

  @MinLength(1, { message: 'Status must have at least 1 characters' })
  status?: string;

  @Matches(passwordRegEx, {
    message:
      'Password must be from 6 to 20 characters and contain one uppercase letter, one lowercase letter and one number',
  })
  password?: string;

  @MinLength(7, { message: 'Color must have at least 7 characters' })
  color?: string;
}
