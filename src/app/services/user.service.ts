import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  doSignUp(username: string, password: string){

    var User = {
      username: username,
      password: password
    }

    let Headers = new HttpHeaders().set('Access-Control-Allow-Origin:', '*');
    Headers.set('Access-Control-Allow-Methods:', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    Headers.set('Access-Control-Allow-Headers:', 'Origin, Content-Type, X-Auth-Token');

    return this.http.post('http://localhost/TetrisWebService/public/user/signup', {
      User,
      Headers 
    });
  }

}

export interface User{
  username: string;
  password: string;
}