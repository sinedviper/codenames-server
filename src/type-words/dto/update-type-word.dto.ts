import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeWordDto } from './create-type-word.dto';

export class UpdateTypeWordDto extends PartialType(CreateTypeWordDto) {}
