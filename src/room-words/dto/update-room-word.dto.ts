import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomWordDto } from './create-room-word.dto';

export class UpdateRoomWordDto extends PartialType(CreateRoomWordDto) {}
