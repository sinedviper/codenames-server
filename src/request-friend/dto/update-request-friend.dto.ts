import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestFriendDto } from './create-request-friend.dto';

export class UpdateRequestFriendDto extends PartialType(CreateRequestFriendDto) {}
