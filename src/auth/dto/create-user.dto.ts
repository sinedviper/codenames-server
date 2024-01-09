import {
  IsAlphanumeric,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters' })
  @IsAlphanumeric(null, {
    message: 'The nickname should be long',
  })
  username: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message:
      'Password must be from 6 to 20 characters and contain one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(7, { message: 'Color must have at least 7 characters' })
  color: string;
}
