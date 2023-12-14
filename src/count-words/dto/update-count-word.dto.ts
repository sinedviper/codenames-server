import { PartialType } from '@nestjs/mapped-types';
import { CreateCountWordDto } from './create-count-word.dto';

export class UpdateCountWordDto extends PartialType(CreateCountWordDto) {}
