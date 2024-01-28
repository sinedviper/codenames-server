import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
