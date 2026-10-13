import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages/messages.service';
import { UsersService } from './users/users.service';
@WebSocketGateway({cors : true})
export class AppGateway{
    constructor(
        private messageService: MessagesService,
        private userService: UsersService
    ){}
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
        const destinataire = await this.userService.findOne(playload.destinataireId);
        const message = await this.messageService.create({
            conversationId : playload.conversationId,
            text: playload.text
        },playload.expediteurId);
        this.server.to(playload.destinataireId).emit('nouveauMessage',message);
        this.server.to(playload.expediteurId).emit('nouveauMessage',message);
        if(destinataire?.pushToken){
            const reponseExpo = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    to: destinataire.pushToken,
                    title: 'Nouveau message',
                    body: playload.text,
                }),
            });
        }
    }
}