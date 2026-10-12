import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Req() req: any,) {
    return this.messagesService.create(createMessageDto,req.user.userId);
  } 
  @UseGuards(AuthGuard('jwt'))
  @Get('conversation/:idConversation')
  findAll(@Param('idConversation') idConversation: string) {
    return this.messagesService.findAll(idConversation);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
