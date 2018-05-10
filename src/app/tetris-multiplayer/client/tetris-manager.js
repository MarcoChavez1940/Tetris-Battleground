const Tetris = require('./tetris');

class TetrisManager {

    constructor(document) {
        this.document = document;
        this.template = this.document.querySelector('#player-template');

        this.instances = [];
    }

    createPlayer() {


        const element = this.document
            .importNode(this.template, true)
            .children[0];

        const tetris = new Tetris(element);

        this.document.getElementById("container-players").appendChild(tetris.element);

        this.instances.push(tetris);

        return tetris;
    }

    removePlayer(tetris) {
        this.document.getElementById("container-players").removeChild(tetris.element);

        this.instances = this.instances.filter(instance => instance !== tetris);
    }

    sortPlayers(tetri) {
        tetri.forEach(tetris => {
            this.document.getElementById("container-players").appendChild(tetris.element);
        });
    }
}

module.exports = TetrisManager;