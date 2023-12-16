import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) userRepository: Repository<UserEntity>) {}

    async registration(dto:CreateUserDto){

    }
}
