import { Injectable } from '@angular/core';

import { Http } from "@angular/http";

import "rxjs/add/operator/timeout";
import "rxjs/add/operator/map";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomService {

  constructor(private http: Http) { }

  getAllRooms(){
    return this.http
      .get('http://localhost/TetrisWebService/public/room/getAll')
      .map(result => result.json());
  }

  newRoom(id_user: number, name: string, description: string, players: number, difficulty: number){

    let newRoom: newRoom = {
      id_user: id_user,
      name: name,
      description: description,
      max_players: players,
      difficulty: difficulty
    }
    
    return this.http
    .post('http://localhost/TetrisWebService/public/room/new', newRoom)
    .map(result => result.json());
  }

}

export interface newRoom {
  id_user: number;
  name: string;
  description: string;
  max_players: number;
  difficulty: number;
}
