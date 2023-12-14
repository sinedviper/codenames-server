import { Controller } from '@nestjs/common';
import { RoomStatusService } from './room-status.service';

@Controller('room-status')
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}
}
