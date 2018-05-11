import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariablesService {

  public id_room: number;
  public currentUser: string;

  constructor() { }

  setCurrentUser(currentUser: string){
    this.currentUser = this.currentUser
  }

  getCurrentUser(){
    return this.currentUser;
  }

  setIdRoom(id_room: number){
    this.id_room = id_room;
  }

  getIdRoom(){
    return this.id_room;  
  }

}
