import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateColorTeamDto } from './dto/create-color-team.dto';
import { UpdateColorTeamDto } from './dto/update-color-team.dto';
import { ColorTeamEntity } from './entities/color-team.entity';
import { typeHttpResponse } from '../types';

@Injectable()
export class ColorTeamService {
  constructor(
    @InjectRepository(ColorTeamEntity)
    private readonly colorTeam: Repository<ColorTeamEntity>,
  ) {}

  async create(
    createColorTeamDto: CreateColorTeamDto,
  ): Promise<typeHttpResponse<ColorTeamEntity>> {
    const colorTeam = new ColorTeamEntity();
    if (!createColorTeamDto.color) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }

    colorTeam.color = createColorTeamDto.color;

    try {
      const newColor = await this.colorTeam.save(colorTeam);

      return {
        statusCode: HttpStatus.CREATED,
        data: newColor,
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll() {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.colorTeam.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<ColorTeamEntity>> {
    if (!id) {
      throw new HttpException(
        "Color team id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const colorTeam = await this.colorTeam.findOne({ where: { id } });
    if (!colorTeam) {
      throw new HttpException("Color team isn't found", HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, data: colorTeam };
  }

  async update(
    updateColorTeamDto: UpdateColorTeamDto,
  ): Promise<typeHttpResponse<ColorTeamEntity>> {
    if (!updateColorTeamDto?.id || !updateColorTeamDto?.color) {
      throw new HttpException(
        "Color team params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const colorTeamFind = await this.colorTeam.findOne({
      where: { id: updateColorTeamDto?.id },
    });

    if (!colorTeamFind) {
      throw new HttpException("Color team isn't found", HttpStatus.NOT_FOUND);
    }
    colorTeamFind.color = updateColorTeamDto.color;

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.colorTeam.save(colorTeamFind),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async remove(id: number): Promise<typeHttpResponse<null>> {
    if (!id) {
      throw new HttpException(
        "Color team id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const language = await this.colorTeam.findOne({ where: { id } });
    if (!language) {
      throw new HttpException("Color team isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.colorTeam.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
