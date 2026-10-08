import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDTO } from './dto/register.dto';
import { LoginUserDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private jwtService : JwtService
    ){}

    async register(dto: RegisterUserDTO){  
        const {password} = dto;
        const hashPassword = await bcrypt.hash(password, 10)
        const userData = {...dto, password: hashPassword}
        const user = await this.usersService.create(userData);
        return { message: "Utilisateur créé avec succès", userId: user.id };
    }
    async login(dto: LoginUserDTO){
        const {email} = dto;
        const user = await this.usersService.findByEmail(email);
        if(!user){
            throw new UnauthorizedException('Utilisateur non trouvé');
        }
        const validPassword = await bcrypt.compare(dto.password,user.password);
        if(!validPassword){
            throw new UnauthorizedException('Email ou mot de passe invalide');
            
        }
        const token = this.jwtService.sign({sub : user.id, email : user.email});
        return { access_token: token };
        
    }
}
