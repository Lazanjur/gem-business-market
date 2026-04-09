import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/b2b-chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const entityId = client.handshake.query.entityId;
    if (entityId) client.join(`entity_${entityId}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('send_message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: { receiverId: string; content: string }) {
    const savedMessage = { sender_id: client.data.user.userId, receiver_id: payload.receiverId, content: payload.content, created_at: new Date() };
    this.server.to(`entity_${payload.receiverId}`).emit('receive_message', savedMessage);
    return { status: 'sent', data: savedMessage };
  }
}
