import { Component, OnInit } from "@angular/core";

import * as socketIo from "socket.io-client";

import { Router } from "@angular/router";

import { RoomService } from '../services/room.service';

import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"]
})
export class LobbyComponent implements OnInit{
  
  public socket: any;

  
  public rooms: Room[] = [];

  private isInsideRoom: boolean = false;
  private roomSelectedId: number;

  private initGame: boolean = false;
  private time:number = 5;

  constructor(private _Router: Router, private _Global: GlobalVariablesService,
  private roomService: RoomService) {
    this.getAllRooms();
  }

  getAllRooms(){
    let response = this.roomService.getAllRooms();

    response.subscribe(
      result => {

        result.message.forEach((room) => {
          room.current_players--;
          this.rooms.push(room);
        });

        //this.rooms = result.message
      },
      err => {
        console.log(err);
      }
    )
  }

  entryRoom(roomId: number) {
    if(this.isInsideRoom === false){
      this.isInsideRoom = true;
      this.roomSelectedId = roomId;

      this._Global.setIdRoom(roomId);
      
      let roomSelected = this.rooms.find(function (room) { return room.id_room === roomId; });

      roomSelected.current_players++;

      this.socket.emit('entry Player', roomId);

      if(roomSelected.current_players == roomSelected.max_players){

        if(roomSelected.max_players === 1){
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
      this.rooms.find(function (room) { return room.id_room === roomId; }).current_players--;
      this.socket.emit('leave Player', roomId);
    }
     
  }

  ngOnInit(): void {
    this.socket = socketIo('http://localhost:3002');

    this.socket.on('entry Player', (id_room) =>{
      this.rooms.find(room => room.id_room === id_room).current_players++;
    });

    this.socket.on('leave Player', (id_room) =>{
      this.rooms.find(room => room.id_room === id_room).current_players--;
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
  id_room: number;
  name: string;
  description: string;
  max_players: number;
  current_players: number;
  difficulty: number;
}
