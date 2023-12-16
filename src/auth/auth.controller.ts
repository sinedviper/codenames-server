import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post("registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() createUserDto: CreateUserDto){
        return this.authService.registration(createUserDto)
    }

    @Post("login")
    @UsePipes(new ValidationPipe())
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

}
