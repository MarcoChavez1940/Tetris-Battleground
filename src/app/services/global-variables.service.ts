import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariablesService {

  public id_room: number;

  constructor() { }

  setIdRoom(id_room: number){
    this.id_room = id_room;
  }

  getIdRoom(){
    return this.id_room;  
  }

}
