import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestFriendService } from './request-friend.service';
import { CreateRequestFriendDto } from './dto/create-request-friend.dto';
import { UpdateRequestFriendDto } from './dto/update-request-friend.dto';

@Controller('request-friend')
export class RequestFriendController {
  constructor(private readonly requestFriendService: RequestFriendService) {}

  @Post()
  create(@Body() createRequestFriendDto: CreateRequestFriendDto) {
    return this.requestFriendService.create(createRequestFriendDto);
  }

  @Get()
  findAll() {
    return this.requestFriendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestFriendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestFriendDto: UpdateRequestFriendDto) {
    return this.requestFriendService.update(+id, updateRequestFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestFriendService.remove(+id);
  }
}
