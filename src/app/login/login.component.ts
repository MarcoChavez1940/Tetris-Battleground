import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserService, User } from '../services/user.service';

import { Observable } from 'rxjs/Observable';

import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 

  constructor(private _Router: Router, private userService: UserService,
  private _Global: GlobalVariablesService) { }

  doLogin(username: string, password: string){
    var User = {
      username: username,
      password: password
    }
    
    let response = this.userService.doLogin( User );

    response.subscribe(
      succeful =>{
        this._Global.setCurrentUser(username);
        this.goToLobby();
      },
      err =>{
        console.log("Usuario no encontrado")
      }
    )

  }

  doSignUp(username: string, password: string){

    var User = {
      username: username,
      password: password
    }

    let response = this.userService.doSignUp( User );

    response.subscribe(
      succeful =>{
        console.log("done")
      },
      err =>{
        console.log("Algo salio mal")
      }
    )
    
  }

  doLogout(){
    this._Global.setCurrentUser('');  
  }

  

  goToLobby(){
    this._Router.navigateByUrl('/lobby');
  }


}
