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
      result => {

        if(result.message === 'Successful login'){
          alert('Bienvenido');
          this._Global.setIdUser(result.value);
          this._Global.setCurrentUser(username);
          this.goToLobby();
        }else{
          alert('Usuario invalido');
        }
       
      },
      err => {
        console.log(err);
      }
    )

  }

  doLogout(){
    this._Global.setCurrentUser('');
    this._Global.setIdUser(0);  
  }

  

  goToLobby(){
    this._Router.navigateByUrl('/lobby');
  }


}
