import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserService, User } from '../services/user.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private _Router: Router, private userService: UserService) { }

  ngOnInit() {
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
        this._Router.navigateByUrl('/login');
      },
      err =>{
        console.log("Algo salio mal")
      }
    )
    
  }

}
