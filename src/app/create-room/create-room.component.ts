import { Component } from '@angular/core';

import { GlobalVariablesService } from '../services/global-variables.service';

import { RoomService } from '../services/room.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  constructor(private _Global: GlobalVariablesService, private roomService: RoomService,
    private _Router: Router) { }

  createRoom(name: string, description: string, players: number, difficulty: string){
    
    var difficultyNumber;

    if(difficulty === 'Fácil'){
      difficultyNumber = 1;
    }else{
      difficultyNumber = 2
    }

    var result = this.roomService.newRoom(
      this._Global.getIdUser(),
      name,
      description,
      players,
      difficultyNumber
    ) 


    result.subscribe(
      result =>{
        if(result.message === 'Successful registry'){
          this.goToLobby();
          console.log(result);  
        }else{
          alert('Algo mal ocurrio');
        }
        
      },
      err =>{
        console.log(err)
      }
    )

  }

  goToLobby(){
    this._Router.navigateByUrl('/lobby');
  }

}
