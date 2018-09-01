import { Injectable } from '@angular/core';

import { Http } from "@angular/http";

import "rxjs/add/operator/timeout";
import "rxjs/add/operator/map";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  doLogin(user: User){
    return this.http
      .post('http://localhost/TetrisWebService/public/user/login',user)
      .map(result => result.json());

  }

  doSignUp(user: User){
    return this.http
      .post('http://localhost/TetrisWebService/public/user/signup', user)
      .map(result => result.json());
  }

}

export interface User{
  username: string;
  password: string;
}