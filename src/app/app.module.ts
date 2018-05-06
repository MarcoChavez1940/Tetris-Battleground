import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { TetrisComponent } from "./tetris/tetris.component";
import { LoginComponent } from "./login/login.component";

import { RouterModule } from "@angular/router";

//Services

import { UserService } from './services/user';
import { ChatComponent } from './chat/chat.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { TetrisMultiplayerComponent } from './tetris-multiplayer/tetris-multiplayer.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    TetrisComponent,
    LoginComponent,
    ChatComponent,
    CreateRoomComponent,
    TetrisMultiplayerComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
