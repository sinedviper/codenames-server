import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './entities/room.entity';
import { TeamEntity } from '../team/entities/team.entity';
import { ColorTeamEntity } from '../color-team/entities/color-team.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CategoryWordEntity } from '../category-words/entities/category-word.entity';
import { LanguageEntity } from '../languages/entities/language.entity';
import { CountWordEntity } from '../count-words/entities/count-word.entity';
import { RoomStatusEntity } from '../room-status/entities/room-status.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly room: Repository<RoomEntity>,
    @InjectRepository(TeamEntity)
    private readonly team: Repository<TeamEntity>,
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
    @InjectRepository(CategoryWordEntity)
    private readonly categoryWord: Repository<CategoryWordEntity>,
    @InjectRepository(LanguageEntity)
    private readonly language: Repository<LanguageEntity>,
    @InjectRepository(CountWordEntity)
    private readonly countWord: Repository<CountWordEntity>,
    @InjectRepository(RoomStatusEntity)
    private readonly roomStatus: Repository<RoomStatusEntity>,
    @InjectRepository(ColorTeamEntity)
    private readonly colorTeam: Repository<ColorTeamEntity>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const room = new RoomEntity();

    if (!createRoomDto.id_creator) {
      throw new HttpException(
        "Body haven't creator",
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      const user = await this.user.findOne({
        where: { id: createRoomDto.id_creator },
      });
      if (user) {
        room.id_creator = createRoomDto.id_creator;
      } else {
        throw new HttpException(
          'Creator has`t found in database',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (!createRoomDto.id_category_words) {
      room.id_category_words = undefined;
    } else {
      const categoryWord = await this.categoryWord.findOne({
        where: { id: createRoomDto.id_category_words },
      });
      if (categoryWord) {
        room.id_category_words = createRoomDto.id_category_words;
      } else {
        throw new HttpException(
          'Category word has`t found in database',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (!createRoomDto.id_language_words) {
      throw new HttpException(
        "Body haven't language",
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      const language = await this.language.findOne({
        where: { id: createRoomDto.id_language_words },
      });
      if (language) {
        room.id_language_words = createRoomDto.id_language_words;
      } else {
        throw new HttpException(
          'Language has`t found in database',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (!createRoomDto.id_count_words) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    } else {
      const countWord = await this.countWord.findOne({
        where: { id: createRoomDto.id_count_words },
      });
      if (countWord) {
        room.id_count_words = createRoomDto.id_count_words;
      } else {
        throw new HttpException(
          'Count word has`t found in database',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (
      typeof createRoomDto.translation_card === 'boolean' &&
      createRoomDto.translation_card
    ) {
      if (!createRoomDto.id_translation_words) {
        throw new HttpException(
          'Something was wrong',
          HttpStatus.EXPECTATION_FAILED,
        );
      } else {
        const language = await this.language.findOne({
          where: { id: createRoomDto.id_translation_words },
        });
        if (language) {
          room.id_translation_words = createRoomDto.id_translation_words;
        } else {
          throw new HttpException(
            'Count word has`t found in database',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    } else {
      room.translation_card = false;
      room.id_translation_words = undefined;
    }

    const roomStatus = await this.roomStatus.findOne({
      where: { typeStatus: 'start' },
    });
    if (roomStatus) {
      createRoomDto.id_status = roomStatus.id;
    } else {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    if (
      typeof createRoomDto.close_room === 'boolean' &&
      createRoomDto.close_room
    ) {
      room.close_room = createRoomDto.close_room;
      if (createRoomDto.password) {
        room.password = createRoomDto.password;
      } else {
        throw new HttpException(
          'Body has`t password when close room is true',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      room.close_room = false;
      room.password = undefined;
    }

    if (typeof createRoomDto.time_for_start === 'number') {
      room.time_for_start = createRoomDto.time_for_start;
    } else {
      room.time_for_start = 120;
    }

    if (typeof createRoomDto.time_for_round === 'number') {
      room.time_for_round = createRoomDto.time_for_round;
    } else {
      room.time_for_round = 60;
    }

    if (typeof createRoomDto.time_for_break === 'number') {
      room.time_for_break = createRoomDto.time_for_break;
    } else {
      room.time_for_break = 30;
    }

    if (typeof createRoomDto.time_for_guess === 'number') {
      room.time_for_guess = createRoomDto.time_for_guess;
    } else {
      room.time_for_guess = 15;
    }

    try {
      const newRoom = await this.room.save(room);

      const teams = [];

      const colorTeamRed = await this.colorTeam.findOne({
        where: { color: 'red' },
      });
      if (colorTeamRed) {
        const team = new TeamEntity();
        team.id_room = newRoom.id;
        team.id_color_team = colorTeamRed.id;
        const newTeam = await this.team.save(team);
        teams.push(newTeam);
      } else {
        throw new HttpException(
          'Something was wrong',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      const colorTeamBlue = await this.colorTeam.findOne({
        where: { color: 'blue' },
      });
      if (colorTeamBlue) {
        const team = new TeamEntity();
        team.id_room = newRoom.id;
        team.id_color_team = colorTeamBlue.id;
        const newTeam = await this.team.save(team);
        teams.push(newTeam);
      } else {
        throw new HttpException(
          'Something was wrong',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: { room: newRoom, teams },
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  findAll() {
    return `This action returns all room`;
  }

  async findOne(id: number) {
    if (!id) {
      throw new HttpException("Room id isn't in body", HttpStatus.BAD_REQUEST);
    }
    const room = await this.room.findOne({ where: { id } });
    if (!room) {
      throw new HttpException("Room isn't found", HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, data: room };
  }

  update(updateRoomDto: UpdateRoomDto) {
    return `This action updates a ыroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
