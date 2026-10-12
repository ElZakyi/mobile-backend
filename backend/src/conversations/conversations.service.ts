import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository : Repository<Conversation>
  ){}
  async create(createConversationDto: CreateConversationDto, userId: string) {
  const conversation = await this.conversationRepository.findOne({
    where: [
      { acheteur: { id: userId }, vendeur: { id: createConversationDto.vendeurId } },
      { acheteur: { id: createConversationDto.vendeurId }, vendeur: { id: userId } },
    ]
  });

  if (conversation) {
    return conversation;
  } else {
    return await this.conversationRepository.save({
      acheteur: { id: userId },
      vendeur: { id: createConversationDto.vendeurId }
    });
  }
}

  findAll(userId: string) {
  return this.conversationRepository.find({
    where: [
      { acheteur: { id: userId } },
      { vendeur: { id: userId } },
    ],
    relations : {acheteur : true, vendeur: true},
    order: { createdAt: 'DESC' },
  });
}
  async findOne(idConversation: string) {
    return await this.conversationRepository.findOne({
      where : {id : idConversation},
      relations : {acheteur: true, vendeur: true}
  })
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
