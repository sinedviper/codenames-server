import { Injectable } from '@nestjs/common';
import { CreateColorTeamDto } from './dto/create-color-team.dto';
import { UpdateColorTeamDto } from './dto/update-color-team.dto';

@Injectable()
export class ColorTeamService {
  create(createColorTeamDto: CreateColorTeamDto) {
    return 'This action adds a new colorTeam';
  }

  findAll() {
    return `This action returns all colorTeam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colorTeam`;
  }

  update(id: number, updateColorTeamDto: UpdateColorTeamDto) {
    return `This action updates a #${id} colorTeam`;
  }

  remove(id: number) {
    return `This action removes a #${id} colorTeam`;
  }
}
