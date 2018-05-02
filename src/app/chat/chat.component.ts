import { Component } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent {
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

  constructor() {}

  sendMessage(username: string, content: HTMLInputElement) {
    var newMessage: Message = {
      username: username,
      content: content.value
    };

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
