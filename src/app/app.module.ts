import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { TetrisComponent } from "./tetris/tetris.component";
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from './chat/chat.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { TetrisMultiplayerComponent } from './tetris-multiplayer/tetris-multiplayer.component';

import { RouterModule } from "@angular/router";

//Services
import { UserService } from './services/user.service';
import { GlobalVariablesService } from './services/global-variables.service';

import { HttpClientModule } from '@angular/common/http';

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
    ]),
    HttpClientModule
  ],
  providers: [UserService, GlobalVariablesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
