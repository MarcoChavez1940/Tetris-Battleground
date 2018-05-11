import { Component, OnInit } from "@angular/core";

import * as socketIo from "socket.io-client";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit{

  public socket: any;

  private messages: Message[];

  private idChatSelected: number = 1;

  private chat1: Chat = {
    id_chat: 1,
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

  private chat2: Chat = {
    id_chat: 2,
    messages: [
      {
        id_chat: 2,
        username: "CharlieUwU",
        content: "Te amo <3"
      },
      {
        id_chat: 2,
        username: "Marco",
        content: "Yo mas bb :*"
      }
    ]
  };

  private chats = [
    this.chat1,
    this.chat2
  ]; 

  constructor() {
    this.socket = socketIo('http://localhost:3000');
    this.messages = this.chats.find(function (chat) { return chat.id_chat === 1}).messages;
  }

  ngOnInit(): void {
    this.socket.on('new Message', (message) =>{
      var newMessage: Message = {
        id_chat: 1,
        username: message.username,
        content: message.content  
      }

      this.chats.find(function (chat) { return chat.id_chat === message.id_chat}).messages.push(newMessage);
      //this.messages.push(newMessage);
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

    this.chats.find(function (chat) { return chat.id_chat === id_chat}).messages.push(newMessage);

    //this.messages.push(newMessage);
    content.value = null;
    setTimeout(this.scrollToBottom, 10);
  }

  changeChat(id_chat: number){
    this.idChatSelected = id_chat;

    this.messages = this.chats.find(function (chat) { return chat.id_chat === id_chat}).messages; 
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
  messages: Message[];
}

