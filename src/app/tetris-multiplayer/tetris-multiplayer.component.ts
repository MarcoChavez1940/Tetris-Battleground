import { Component, OnInit } from "@angular/core";

import * as Arena from "./client/arena";
import * as ConnectionManager from "./client/connection-manager";
import * as Events from "./client/events";
import * as Player from "./client/player";
import * as TetrisManager from "./client/tetris-manager";
import * as Tetris from "./client/tetris";

import * as socketIo from "socket.io-client";

import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: "app-tetris-multiplayer",
  templateUrl: "./tetris-multiplayer.component.html",
  styleUrls: ["./tetris-multiplayer.component.css"]
})
export class TetrisMultiplayerComponent {
  public socket: any;

  constructor(private _Global: GlobalVariablesService) {
    this.socket = socketIo("http://localhost:3002");

    setTimeout(() => {
      const tetrisManager = new TetrisManager(document);
      const tetrisLocal = tetrisManager.createPlayer();
      tetrisLocal.element.classList.add("local");
      tetrisLocal.run();

      const connectionManager = new ConnectionManager(tetrisManager);

      setTimeout(() => {
        var id_game = connectionManager.idSesion;
        this.socket.emit("init_game", {
            id_room: this._Global.getIdRoom(),
            id_game: id_game
        });
      }, 100);

      //connectionManager.connect('ws://' + window.location.hostname + ':9000');
      connectionManager.connect("ws://localhost:9000");


      //Eventos a las teclas del jugador.
      const keyListener = event => {
        [[65, 68, 81, 69, 83]].forEach((key, index) => {
          const player = tetrisLocal.player;
          if (event.type === "keydown") {
            if (event.keyCode === key[0]) {
              player.move(-1);
            } else if (event.keyCode === key[1]) {
              player.move(1);
            } else if (event.keyCode === key[2]) {
              player.rotate(-1);
            } else if (event.keyCode === key[3]) {
              player.rotate(1);
            }
          }

          if (event.keyCode === key[4]) {
            if (event.type === "keydown") {
              if (player.dropInterval !== player.DROP_FAST) {
                player.drop();
                player.dropInterval = player.DROP_FAST;
              }
            } else {
              player.dropInterval = player.DROP_SLOW;
            }
          }
        });
      };

      document.addEventListener("keydown", keyListener);
      document.addEventListener("keyup", keyListener);
    }, 50);

  }


}
