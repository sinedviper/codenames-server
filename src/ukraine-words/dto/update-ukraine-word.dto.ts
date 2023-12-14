import { PartialType } from '@nestjs/mapped-types';
import { CreateUkraineWordDto } from './create-ukraine-word.dto';

export class UpdateUkraineWordDto extends PartialType(CreateUkraineWordDto) {}
