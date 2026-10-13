import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PushTokenDto } from './dto/update-push-token.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>
  ){}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      order : {createdAt : 'DESC'}
    }
    );
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }
  async updatePushToken(userId: string, pushToken: PushTokenDto){
    return await this.userRepository.update(userId,{pushToken : pushToken.pushToken});
  }
  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
  async findByEmail(email: string){
    return await this.userRepository.findOneBy({email});
  }
}
