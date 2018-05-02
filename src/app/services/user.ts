import { Injectable } from '@angular/core';

@Injectable()
export class UserService{
    
    constructor(){

    }

    login(){

    }

}

export interface User{
    username: string;
    password: string;
}