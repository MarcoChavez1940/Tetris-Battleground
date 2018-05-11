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

  private idChatSelected: number = 1;

  private globalChat: Chat = {
    id_chat: 1,
    user_contact: 'Global',
    messages: [
      {
        id_chat: 1,
        username: "MLGPro",
        content: "Retas putos"
      },
      {
        id_chat: 1,
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
    this.messages = this.chats.find(function (chat) { return chat.id_chat === 1}).messages;
  }

  ngOnInit(): void {
    this.socket.on('new Message', (message) =>{
      var newMessage: Message = {
        id_chat: message.id_chat,
        username: message.username,
        content: message.content  
      }

      var chat = this.chats.find(function (chat) { return chat.id_chat === message.id_chat});
      
      if(chat !== undefined){
        chat.messages.push(newMessage);
      }

      setTimeout(this.scrollToBottom, 10);
    })

    
  }

  sendMessage(id_chat: number, username: string, content: HTMLInputElement) {
    var newMessage: Message = {
      id_chat: id_chat,
      username: username,
      content: content.value
    };

    this.socket.emit('new Message', newMessage);

    var chat = this.chats.find(function (chat) { return chat.id_chat === id_chat}).messages.push(newMessage);



    //this.messages.push(newMessage);
    content.value = null;
    setTimeout(this.scrollToBottom, 10);
  }

  changeChat(id_chat: number){
    this.idChatSelected = id_chat;

    this.messages = this.chats.find(function (chat) { return chat.id_chat === id_chat}).messages; 
  }

  addChat(username: string, id_chat_correspondent: number){
    let chat: Chat = {
      id_chat: id_chat_correspondent,
      user_contact: username,
      messages: [
        {
          id_chat: id_chat_correspondent,
          username: "CharlieUwU",
          content: "Te amo <3"
        },
        {
          id_chat: id_chat_correspondent,
          username: "Marco",
          content: "Yo mas bb :*"
        }
      ]
    };  

    this.chats.push(chat);
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

