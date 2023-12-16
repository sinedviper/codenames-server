import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import {hash,compare} from "bcrypt"

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async registration(dto:CreateUserDto) : Promise<UserEntity>{
        const userByUsername = await this.userRepository.findOne({where:{username:dto.username}})

        if(!!userByUsername){
            throw new HttpException("Username are taken",HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = new UserEntity()

        Object.assign(newUser,dto)
        newUser.password = await this.hashPassword(newUser.password)

        return await this.userRepository.save(newUser)
    }

    async login(dto:LoginDto) : Promise<UserEntity>{
        const userByUsername = await this.userRepository.findOne({where:{username:dto.username}})

        if(!userByUsername)
            throw new HttpException("User not found!",HttpStatus.BAD_REQUEST)

        const isPasswordCorrect = await compare(dto.password,userByUsername.password)

        if(!isPasswordCorrect)
            throw new HttpException("Incorrect password",HttpStatus.BAD_REQUEST)

        delete userByUsername.password
        return userByUsername
    }

    async hashPassword(password:string){
        return await hash(password,10)
    }
}

