import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register.dto';
import { LoginUserDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ){}
    @Post('register')
    register(@Body() registerUserDto : RegisterUserDTO){
        return this.authService.register(registerUserDto);
    }
    @Post('login')
    login(@Body() loginUserDTO : LoginUserDTO){
        return this.authService.login(loginUserDTO);
    }
}
