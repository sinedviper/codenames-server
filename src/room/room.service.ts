import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { TeamEntity } from '../team/entities/team.entity';
import { ColorTeamEntity } from '../color-team/entities/color-team.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CategoryWordEntity } from '../category-words/entities/category-word.entity';
import { LanguageEntity } from '../languages/entities/language.entity';
import { CountWordEntity } from '../count-words/entities/count-word.entity';
import { RoomStatusEntity } from '../room-status/entities/room-status.entity';
import { RoomDto } from './dto/room.dto';
import { TeamDto } from '../team/dto/team.dto';
import { CreateTeamDto } from '../team/dto/create-team.dto';
import { typeHttpResponse } from '../types';

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

  async getCreateParams(): Promise<
    typeHttpResponse<{
      languages: LanguageEntity[];
      countWords: CountWordEntity[];
    }>
  > {
    const languages = await this.language.find();
    if (languages.length === 0) {
      throw new HttpException("Sorry, haven't languages", HttpStatus.NOT_FOUND);
    }

    const countWords = await this.countWord.find();

    if (countWords.length === 0) {
      throw new HttpException(
        "Sorry, haven't count words",
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: { languages, countWords },
    };
  }

  async create(createRoomDto: CreateRoomDto) {
    const room = new RoomEntity();
    const roomSend = new RoomDto();

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
        roomSend.creator = createRoomDto.id_creator;
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
        roomSend.category_words = categoryWord;
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
        roomSend.language_words = language;
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
        roomSend.count_words = countWord;
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
          room.translation_card = createRoomDto.translation_card;
          room.id_translation_words = createRoomDto.id_translation_words;
          roomSend.translation_card = createRoomDto.translation_card;
          roomSend.translation_words = language;
        } else {
          throw new HttpException(
            'Translation has`t found in database',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    } else {
      room.translation_card = false;
      room.id_translation_words = undefined;
      roomSend.translation_card = false;
      roomSend.translation_words = undefined;
    }

    const roomStatus = await this.roomStatus.findOne({
      where: { typeStatus: 'start' },
    });
    if (roomStatus) {
      createRoomDto.id_status = roomStatus.id;
      roomSend.status = roomStatus;
    } else {
      throw new HttpException(
        'Can`t find a start',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    if (
      typeof createRoomDto.close_room === 'boolean' &&
      createRoomDto.close_room
    ) {
      if (createRoomDto.password) {
        room.close_room = createRoomDto.close_room;
        room.password = createRoomDto.password;
        roomSend.close_room = createRoomDto.close_room;
        roomSend.password = createRoomDto.password;
      } else {
        throw new HttpException(
          'Body has`t password when close room is true',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      room.close_room = false;
      room.password = undefined;
      roomSend.close_room = false;
      roomSend.password = undefined;
    }

    if (typeof createRoomDto.time_for_start === 'number') {
      room.time_for_start = createRoomDto.time_for_start;
      roomSend.time_for_start = createRoomDto.time_for_start;
    } else {
      room.time_for_start = 120;
      roomSend.time_for_start = 120;
    }

    if (typeof createRoomDto.time_for_round === 'number') {
      room.time_for_round = createRoomDto.time_for_round;
      roomSend.time_for_round = createRoomDto.time_for_round;
    } else {
      room.time_for_round = 60;
      roomSend.time_for_round = 60;
    }

    if (typeof createRoomDto.time_for_break === 'number') {
      room.time_for_break = createRoomDto.time_for_break;
      roomSend.time_for_break = createRoomDto.time_for_break;
    } else {
      room.time_for_break = 30;
      roomSend.time_for_break = 30;
    }

    if (typeof createRoomDto.time_for_guess === 'number') {
      room.time_for_guess = createRoomDto.time_for_guess;
      roomSend.time_for_guess = createRoomDto.time_for_guess;
    } else {
      room.time_for_guess = 15;
      roomSend.time_for_guess = 15;
    }

    try {
      const newRoom = await this.room.save(room).catch(() => {
        throw new HttpException(
          'Can`t save room',
          HttpStatus.EXPECTATION_FAILED,
        );
      });
      roomSend.id = newRoom.id;

      const teams = [];

      const colorTeamRed = await this.colorTeam.findOne({
        where: { color: 'red' },
      });
      if (colorTeamRed) {
        const team = new CreateTeamDto();
        const teamSend = new TeamDto();
        team.id_room = newRoom.id;
        teamSend.id_room = newRoom.id;
        team.id_color_team = colorTeamRed.id;
        teamSend.color_team = colorTeamRed;
        await this.team.save(team).catch(() => {
          throw new HttpException(
            'Can`t save color for team',
            HttpStatus.EXPECTATION_FAILED,
          );
        });
        teams.push(teamSend);
      } else {
        throw new HttpException(
          'Can`t find color for team red',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      const colorTeamBlue = await this.colorTeam.findOne({
        where: { color: 'blue' },
      });
      if (colorTeamBlue) {
        const team = new CreateTeamDto();
        const teamSend = new TeamDto();
        team.id_room = newRoom.id;
        teamSend.id_room = newRoom.id;
        team.id_color_team = colorTeamBlue.id;
        teamSend.color_team = colorTeamBlue;
        await this.team.save(team).catch(() => {
          throw new HttpException(
            'Can`t save color for team',
            HttpStatus.EXPECTATION_FAILED,
          );
        });
        teams.push(teamSend);
      } else {
        throw new HttpException(
          'Can`t find color for team blue',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: { room: roomSend, teams, words: [] },
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll(): Promise<typeHttpResponse<RoomEntity[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.room.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<RoomEntity>> {
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
    return `This action updates a room`;
  }

  async remove(id: number): Promise<typeHttpResponse<null>> {
    if (!id) {
      throw new HttpException("Room id isn't in body", HttpStatus.BAD_REQUEST);
    }
    const room = await this.room.findOne({ where: { id } });
    if (!room) {
      throw new HttpException("Room isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.room.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
