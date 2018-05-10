import { Component, OnInit } from "@angular/core";

import * as socketIo from "socket.io-client";

import { Router } from "@angular/router";

import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"]
})
export class LobbyComponent implements OnInit{
  
  public socket: any;

  private rooms: Room[] = [
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
  private roomSelectedId: number;

  private initGame: boolean = false;
  private time:number = 10;

  constructor(private _Router: Router, private _Global: GlobalVariablesService) {}

  entryRoom(roomId: number) {
    if(this.isInsideRoom === false){
      this.isInsideRoom = true;
      this.roomSelectedId = roomId;

      this._Global.setIdRoom(roomId);
      
      let roomSelected = this.rooms.find(function (room) { return room.id === roomId; });

      roomSelected.players++;

      this.socket.emit('entry Player', roomId);

      if(roomSelected.players == roomSelected.maxPlayers){

        if(roomSelected.maxPlayers === 1){
          this._Router.navigateByUrl('/tetris');  
        }else{
          this.initGame = true;
          this.socket.emit('game_ready', roomId);
          //Cuenta regresiva.
          setInterval(()=>{
            this.time--;
            if(this.time === 0){
              this._Router.navigateByUrl('/tetris-multiplayer');  
            }
          }, 1000)
        }
      }
    //Deja la sala
    }else{
      this.isInsideRoom = false;
      this._Global.setIdRoom(null);
      this.rooms.find(function (room) { return room.id === roomId; }).players--;
      this.socket.emit('leave Player', roomId);
    }
     
  }

  ngOnInit(): void {
    this.socket = socketIo('http://localhost:3000');

    this.socket.on('entry Player', (id_room) =>{
      this.rooms.find(room => room.id === id_room).players++;
    });

    this.socket.on('leave Player', (id_room) =>{
      this.rooms.find(room => room.id === id_room).players--;
    });

    this.socket.on('game_ready', ()=>{
      this.initGame = true; 
      //Cuenta regresiva.
      setInterval(()=>{
        this.time--;
      }, 1000)
    })

    this.socket.on('init_game', (id_game) => {     
        this._Router.navigateByUrl('/tetris-multiplayer#' + id_game);
    })

  }

}

export interface Room {
  id: number;
  name: string;
  players: number;
  maxPlayers: number;
  description: string;
}
