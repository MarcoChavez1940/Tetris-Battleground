import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserService, User } from '../services/user.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 

  constructor(private _Router: Router, private userService: UserService) { }

  doSignUp(username: string, password: string){
    console.log(username);
    console.log(password);

    var User = {
      username: username,
      password: password
    }

    let response = this.userService.doSignUp(username, password);

    response.subscribe(
      succeful =>{
        console.log("done")
      },
      err =>{
        console.log("Algo salio mal")
      }
    )
  }

  

  goToLobby(){
    this._Router.navigateByUrl('/lobby');
  }


}
