import { PartialType } from '@nestjs/mapped-types';
import { CreateColorTeamDto } from './create-color-team.dto';

export class UpdateColorTeamDto extends PartialType(CreateColorTeamDto) {}
