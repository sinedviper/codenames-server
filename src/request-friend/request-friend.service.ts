import { Injectable } from '@nestjs/common';
import { CreateRequestFriendDto } from './dto/create-request-friend.dto';
import { UpdateRequestFriendDto } from './dto/update-request-friend.dto';

@Injectable()
export class RequestFriendService {
  create(createRequestFriendDto: CreateRequestFriendDto) {
    return 'This action adds a new requestFriend';
  }

  findAll() {
    return `This action returns all requestFriend`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestFriend`;
  }

  update(id: number, updateRequestFriendDto: UpdateRequestFriendDto) {
    return `This action updates a #${id} requestFriend`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestFriend`;
  }
}
