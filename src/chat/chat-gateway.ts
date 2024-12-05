// import { MessageBody, WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
// import {Server, Socket} from 'socket.io'
// @WebSocketGateway(3002, {cors:{origin:'*'}})
// export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect {
//     @WebSocketServer() server:Server ;


//     handleConnection(client:Socket) {
//         console.log('New user connected..',client.id);
//         client.broadcast.emit(`user-joined`,{
//             message:`New User Joined the chat: ${client.id}`
//         });
//      }

// handleDisconnect(client: Socket) {
//     console.log('user disconnected..',client.id)
//     this.server.emit(`user-left`,{
//         message:`User Left the chat: ${client.id}`
//     });
// }
//   @SubscribeMessage('newMessage')
//   handleNewMessage(client:Socket, message: string) {
//     // console.log(message);  // Corrected method body

//     // //client reply
//     // client.emit('reply','this is a reply')

//     // //broadcast the message
//     // this.server.emit('reply','broadcasting...')


//     this.server.emit(`message`,message)
//   }
// }


import {
    MessageBody,
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from "@nestjs/websockets";
  import { Server, Socket } from "socket.io";
  import * as fs from "fs";
  import * as path from "path";
  @WebSocketGateway(3002, { cors: { origin: "*" } })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    handleConnection(client: Socket) {
      console.log("New user connected..", client.id);
      client.broadcast.emit("user-joined", {
        message: `New User Joined the chat: ${client.id}`,
      });
    }
  
    handleDisconnect(client: Socket) {
      console.log("User disconnected..", client.id);
      this.server.emit("user-left", {
        message: `User Left the chat: ${client.id}`,
      });
    }
  
    // Receive messages and broadcast them
    @SubscribeMessage("newMessage")
    handleNewMessage(client: Socket, message: any) {
      console.log(message);
      this.server.emit("message", message);
    }
  
    // Handle media (images, audio, video)
    @SubscribeMessage("sendMedia")
    handleMedia(client: Socket, file: any) {
      console.log("Received media:", file);
      this.server.emit("media", file); // Broadcast the media file
    }
  }
  


// import { MessageBody, WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway(3002, { cors: { origin: '*' } })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//     @WebSocketServer() server: Server;

//     handleConnection(client: Socket) {
//         console.log('New user connected..', client.id);
//         this.server.emit('message', {
//             type: 'join',
//             content: client.id
//         });
//     }

//     handleDisconnect(client: Socket) {
//         console.log('User disconnected..', client.id);
//         this.server.emit('message', {
//             type: 'leave',
//             content: client.id
//         });
//     }

//     @SubscribeMessage('newMessage')
//     handleNewMessage(client: Socket, message: string) {
//         console.log('New message:', message);
//         // Broadcast the message to all clients
//         this.server.emit('message', { type: 'text', content: message });
//     }
// }
