import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    // console.log(server);
    console.log("Socket server started successfully");
  }


  @SubscribeMessage('connect')
  handleConnection(socket: Socket) {
    console.log(`socket ${socket.id} connected`);
    console.log('Total connected clients:', this.server.engine.clientsCount);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`socket ${socket.id} disconnect`);
    console.log('Total connected clients:', this.server.engine.clientsCount);
  }

  // @SubscribeMessage('notification')
  // handleSendNotification(@MessageBody() data) {
  //   this.server.emit('notification', data);
  // }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, room) {
    console.log(`Client ${client.id} joined room: ${room.id}`);
    client.join(`room-${room.id}`);
  }

  @SubscribeMessage('person-created')
  handlePersonCreated(@MessageBody() data) {
    this.server.emit('person-created', data);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, room) {
    console.log(`Client ${client.id} left room: ${room.id}`);
    client.leave(`room-${room.id}`);
  }
}
