import { PartialType } from '@nestjs/mapped-types';
import { CreateEnglishWordDto } from './create-english-word.dto';

export class UpdateEnglishWordDto extends PartialType(CreateEnglishWordDto) {}
