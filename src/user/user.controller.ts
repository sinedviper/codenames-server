import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe, Post, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {CreateCRMUserDto} from "./dto/createCRM-user.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create/for/crm')
  @UsePipes(new ValidationPipe())
  createUserForCRM(@Body() dto:CreateCRMUserDto){
    return this.userService.createUserForCRM(dto)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('set/avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  setAvatar(@Param('id') id:string,@UploadedFile() file: Express.Multer.File){

    return this.userService.setAvatar(+id,file)
  }
}
