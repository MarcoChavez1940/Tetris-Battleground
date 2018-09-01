import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { TetrisComponent } from "./tetris/tetris.component";
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from './chat/chat.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { TetrisMultiplayerComponent } from './tetris-multiplayer/tetris-multiplayer.component'
import { RouterModule } from "@angular/router";

//Services
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';
import { GlobalVariablesService } from './services/global-variables.service';

import { HttpModule } from '@angular/http';
import { CreateUserComponent } from './create-user/create-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    TetrisComponent,
    LoginComponent,
    ChatComponent,
    CreateRoomComponent,
    TetrisMultiplayerComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "lobby",
        component: LobbyComponent
      },
      {
        path: "createRoom",
        component: CreateRoomComponent
      },
      {
        path: "signup",
        component: CreateUserComponent
      },
      {
        path: "tetris",
        component: TetrisComponent
      },
      {
        path: "tetris-multiplayer",
        component: TetrisMultiplayerComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "lobby"
      }
    ])
  ],
  providers: [UserService, RoomService, GlobalVariablesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
