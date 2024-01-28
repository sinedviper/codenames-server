import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['user', 'admin']))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @Body('id') id: number) {
    return this.imageService.update(id, file);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['user', 'admin']))
  @Delete()
  @UsePipes(new ValidationPipe())
  update(@Body('id') id: number) {
    return this.imageService.delete(id);
  }
}
