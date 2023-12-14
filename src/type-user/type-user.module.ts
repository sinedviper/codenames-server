import { Module } from '@nestjs/common';
import { TypeUserService } from './type-user.service';
import { TypeUserController } from './type-user.controller';

@Module({
  controllers: [TypeUserController],
  providers: [TypeUserService],
})
export class TypeUserModule {}
