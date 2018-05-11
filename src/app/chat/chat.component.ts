import { Component, OnInit } from "@angular/core";

import * as socketIo from "socket.io-client";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit{

  public socket: any;

  private messages: Message[] = [
    {
      username: "WillyRex",
      content: "Reta en la sala 2"
    },
    {
      username: "BlackMetal666",
      content: "Deja entro"
    }
  ];

  constructor() {
    this.socket = socketIo('http://localhost:3000');
  }

  ngOnInit(): void {
    this.socket.on('new Message General', (message) =>{
      var newMessage: Message = {
        username: message.username,
        content: message.content  
      }

      this.messages.push(newMessage);
      setTimeout(this.scrollToBottom, 10);
    })

    
  }

  sendMessage(username: string, content: HTMLInputElement) {
    var newMessage: Message = {
      username: username,
      content: content.value
    };

    this.socket.emit('new Message General', newMessage);

    this.messages.push(newMessage);
    content.value = null;
    setTimeout(this.scrollToBottom, 10);
  }

  scrollToBottom() {
    var scroll: any = document.getElementById("scroll");
    scroll.scrollTop = scroll.scrollHeight;
  }
}

export interface Message {
  username: string;
  content: string;
}
