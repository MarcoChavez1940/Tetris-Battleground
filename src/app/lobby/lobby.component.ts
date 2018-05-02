import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"]
})
export class LobbyComponent {
  private salas: Sala[] = [
    {
      id: 1,
      name: "Sala 1",
      players: 2,
      maxPlayers: 6,
      description: "Solo MLG"
    },
    {
      id: 2,
      name: "Sala 2",
      players: 3,
      maxPlayers: 6,
      description: "Casuales"
    },
    {
      id: 3,
      name: "Sala 3",
      players: 25,
      maxPlayers: 100,
      description: "Sala 3"
    },
    {
      id: 4,
      name: "Sala 4",
      players: 1,
      maxPlayers: 2,
      description: "1 VS 1"
    },
    {
      id: 5,
      name: "Sala 5",
      players: 1,
      maxPlayers: 3,
      description: "Sala 5"
    },
    {
      id: 6,
      name: "Sala Solitario :(",
      players: 0,
      maxPlayers: 1,
      description: "Una sala dedicado para ti que no tiene amigos </3."
    },
    {
      id: 7,
      name: "Sala 7",
      players: 2,
      maxPlayers: 4,
      description: "Sala 7"
    },
    {
      id: 8,
      name: "Sala Solitario :(",
      players: 0,
      maxPlayers: 1,
      description: "Una sala dedicado para ti que no tiene amigos </3."
    },
    {
      id: 9,
      name: "Sala 9",
      players: 2,
      maxPlayers: 5,
      description: "Sala 9"
    },
    {
      id: 10,
      name: "Sala Solitario :(",
      players: 0,
      maxPlayers: 1,
      description: "Una sala dedicado para ti que no tiene amigos </3."
    },
    {
      id: 11,
      name: "Sala 11",
      players: 2,
      maxPlayers: 4,
      description: "Sala 11"
    },
    {
      id: 12,
      name: "Sala Solitario :(",
      players: 0,
      maxPlayers: 1,
      description: "Una sala dedicado para ti que no tiene amigos </3."
    }
  ];

  private isInsideRoom: boolean = false;
  private roomId: number;

  constructor(private _Router: Router) {}

  goToSala(salaId: number) {
    if(this.isInsideRoom === false){
      this.roomId = salaId;
      this.isInsideRoom = true;
      
      this.salas[salaId-1].players++;

      if(this.salas[salaId-1].players === this.salas[salaId-1].maxPlayers){
        this._Router.navigateByUrl('/tetris');
      }

    }else{
      this.isInsideRoom = false;
      this.salas[salaId-1].players--;
    }
     
  }

}

export interface Sala {
  id: number;
  name: string;
  players: number;
  maxPlayers: number;
  description: string;
}
