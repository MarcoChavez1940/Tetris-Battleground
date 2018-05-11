import { Component, OnInit } from "@angular/core";

import * as socketIo from "socket.io-client";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit{

  public socket: any;

  private usersOnline: User[] = [
    {
      id_user: 1,
      username: 'Marco',
      id_chat_correspondent: 400
    },
    {
      id_user: 2,
      username: 'Braulio',
      id_chat_correspondent: 323
    }
  ];

  private idChatSelected: number = 0;

  private globalChat: Chat = {
    id_chat: 0,
    user_contact: 'Global',
    messages: [
      {
        id_chat: 0,
        username: "MLGPro",
        content: "Retas putos"
      },
      {
        id_chat: 0,
        username: "ChinoAsiticoJapones",
        content: "ora ora ora ora!"
      }
    ]
  };

  private chats = [
    this.globalChat
  ]; 

  private messages: Message[];

  constructor() {
    this.socket = socketIo('http://localhost:3002');
    this.messages = this.chats.find(function (chat) { return chat.id_chat === 0}).messages;
  }

  ngOnInit(): void {
    this.socket.on('new_message_general', (message) =>{
      var newMessage: Message = {
        id_chat: message.id_chat,
        username: message.username,
        content: message.content  
      }

      this.chats[0].messages.push(newMessage);

      setTimeout(this.scrollToBottom, 10);
    })
    
    this.socket.on('init_chat_Braulio' /* + current_user */, (chat) =>{

      let remoteChat: Chat = {
        id_chat: chat.id_chat,
        user_contact: chat.user_sender,
        messages:  chat.messages
      };
     
      this.chats.push(remoteChat);
      
      this.socket.emit('entry_chat', chat.id_chat);

    });

    this.socket.on('new_message_particular', (message) =>{
      var newMessage: Message = {
        id_chat: message.id_chat,
        username: message.username,
        content: message.content  
      }
      //Si el user ya cerro su chat, marcara un error al querer buscar el chat para
      //añadir el chat
      var chat = this.chats.find(function (chat) { return chat.id_chat === message.id_chat})
      .messages.push(newMessage);

      setTimeout(this.scrollToBottom, 10);
    });

    
  }

  sendMessage(id_chat: number, username: string, content: HTMLInputElement) {
    var newMessage: Message = {
      id_chat: id_chat,
      username: username,
      content: content.value
    };

    if(id_chat === 0){
      this.socket.emit('new_message_general', newMessage); 
    }else{
      this.socket.emit('new_message_particular', newMessage);
    }
    
    var chat = this.chats.find(function (chat) { return chat.id_chat === id_chat}).messages.push(newMessage);

    content.value = null;
    setTimeout(this.scrollToBottom, 10);
  }

  changeChat(id_chat: number){
    this.idChatSelected = id_chat;

    this.messages = this.chats.find(function (chat) { return chat.id_chat === id_chat}).messages; 
  }

  addChat(username: string, id_chat_correspondent: number){
    let chat = {
      id_chat: id_chat_correspondent,
      user_sender: 'Marco', /* current User */
      user_contact: username,
      messages: []
    };  
    

    this.socket.emit('init_chat', chat);

    this.chats.push(chat);
  }

  removeChat(id_chat: number){
    this.chats = this.chats.filter(function( chat ) {
      return chat.id_chat !== id_chat;
    });
    
    this.changeChat(0);

    this.socket.emit('close_chat', this.idChatSelected);

  }


  scrollToBottom() {
    var scroll: any = document.getElementById("scroll");
    scroll.scrollTop = scroll.scrollHeight;
  }
}

export interface Message {
  id_chat: number;
  username: string;
  content: string;
}

export interface Chat{
  id_chat: number;
  user_contact: string;
  messages: Message[];
}

export interface User{
  id_user: number;
  username: string;
  id_chat_correspondent: number;
}

