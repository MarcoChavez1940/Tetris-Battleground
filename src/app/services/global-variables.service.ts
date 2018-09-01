import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariablesService {

  public id_room: number;
  public id_user: number
  public currentUser: string;

  constructor() { }

  setIdUser(id_user){
    this.id_user = id_user
  }

  getIdUser(){
    return this.id_user;
  }

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
