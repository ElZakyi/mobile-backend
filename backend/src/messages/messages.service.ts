import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository : Repository<Message>
  ){}
  create(createMessageDto: CreateMessageDto, idAuth: string) {
    return this.messageRepository.save({
      conversation : {id : createMessageDto.conversationId},
      auth : {id : idAuth},
      text : createMessageDto.text
    })
  }

  findAll(idConversation: string) {
    return this.messageRepository.find({
      where: {conversation : {id : idConversation}},
      relations: {auth: true},
      order: {createdAt : 'ASC'}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
