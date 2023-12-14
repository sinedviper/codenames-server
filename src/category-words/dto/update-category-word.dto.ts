import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryWordDto } from './create-category-word.dto';

export class UpdateCategoryWordDto extends PartialType(CreateCategoryWordDto) {}
