import {
  IsDateString,
  IsNotEmpty,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { loginRegEx, passwordRegEx } from '../../utils/constance';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Id can`t be empty' })
  id: number;

  @ValidateIf((o) => o.status)
  @MinLength(1, { message: 'Status must have at least 1 characters' })
  status?: string;

  @ValidateIf((o) => o.username)
  @Matches(loginRegEx, {
    message:
      'Username must be from 3 to 20 characters and contain only english letters and one number',
  })
  username?: string;

  @ValidateIf((o) => o.new_password && o.password)
  @Matches(passwordRegEx, {
    message:
      'Password must be from 6 to 20 characters and contain one uppercase letter, one lowercase letter and one number',
  })
  password?: string;

  @ValidateIf((o) => o.new_password && o.password)
  @Matches(passwordRegEx, {
    message:
      'Old password must be from 6 to 20 characters and contain one uppercase letter, one lowercase letter and one number',
  })
  new_password?: string;

  @ValidateIf((o) => o.color)
  @MinLength(7, {
    message: 'Color must have at least 7 characters',
  })
  color?: string;

  @ValidateIf((o) => o.date_recover)
  @IsDateString({}, { message: 'Date must be date' })
  date_recover?: Date;
}
