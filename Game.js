import Background from "./Background.js";
import { ClimbEnemy, FlyingEnemy, GroundEnemy } from "./Enemy.js";
import InputHandler from "./InputHandler.js";
import Player from "./Player.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.width = this.canvas.width = 1000;
        this.height = this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d");

        this.groundMargin = 100;
        this.speed = 0;

        this.input = new InputHandler(this);
        this.player = new Player(this);
        this.background = new Background(this);

        this.deltaTime = 0;

        this.enemies = [];
        this.enemyInterval = 1000;
        this.enemyTimer = 0;

        this.fullScreenButton = document.getElementById("fullscreen");

        this.fullScreenButton.addEventListener("click", () => {
            this.toggleFullScreen();
        });

        this.update(0);
    }

    draw() {
        this.background.draw();
        this.enemies.forEach((enemy) => enemy.draw());
        this.player.draw();
    }

    #lastTime = 0;
    update(timeStamp) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.deltaTime = timeStamp - this.#lastTime;
        this.#lastTime = timeStamp;

        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += this.deltaTime;
        }

        this.background.update();
        this.player.update();
        this.enemies.forEach((enemy) => enemy.update());

        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }

    addEnemy() {
        this.enemies.push(new FlyingEnemy(this));

        if (this.speed > 0 && Math.random() < 0.5) {
            this.enemies.push(new GroundEnemy(this));
        }
        if (this.speed === 0 && Math.random() < 0.5) {
            this.enemies.push(new ClimbEnemy(this));
        }
        this.enemies = this.enemies.filter((enemy) => !enemy.makedForDeletion);
        this.enemies.sort((a, b) => a.y - b.y);
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen().catch((err) => {
                alert(`Error , can't enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

const g = new Game();
// window.addEventListener("load", () => {
//     loading.style.display = "none";
// });
