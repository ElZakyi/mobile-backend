import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages/messages.service';
@WebSocketGateway({cors : true})
export class AppGateway{
    constructor(private messageService: MessagesService){}
    @WebSocketServer()
    server : Server
    @SubscribeMessage('ping')
    handlePing(@MessageBody() texte: string) : {event: string, data: string}{
        return {event: 'pong', data: texte};
    }
    @SubscribeMessage('join')
    handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket ){
        client.join(userId);
    }
    @SubscribeMessage('envoyerMessage')
    async handleMessage(@MessageBody() playload: {conversationId: string, text: string, expediteurId: string, destinataireId: string}){
        const message = await this.messageService.create({
            conversationId : playload.conversationId,
            text: playload.text
        },playload.expediteurId);
        this.server.to(playload.destinataireId).emit('nouveauMessage',message);
        this.server.to(playload.expediteurId).emit('nouveauMessage',message);
    }
}