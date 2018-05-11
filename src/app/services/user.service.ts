import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  doLogin(user: User){
    return this.http.post('http://localhost/TetrisWebService/public/user/login', user)
  }

  doSignUp(user: User){
    return this.http.post('http://localhost/TetrisWebService/public/user/signup', user);
  }

}

export interface User{
  username: string;
  password: string;
}