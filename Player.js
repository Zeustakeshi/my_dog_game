import {
    FallingLeft,
    FallingRight,
    JumpingLeft,
    JumpingRight,
    RollingDownLeft,
    RollingDownRight,
    RollingUpLeft,
    RollingUpRight,
    RuningLeft,
    RuningRight,
    SittingLeft,
    SittingRight,
    StandingLeft,
    StandingRight,
} from "./State.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 200;
        this.spriteHeight = 181.83;
        this.scale = 0.8;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;

        this.img = document.getElementById("player");

        this.x = 10;
        this.y = this.game.height - this.height - this.game.groundMargin;

        this.states = [
            new StandingRight(this),
            new StandingLeft(this),
            new SittingRight(this),
            new SittingLeft(this),
            new RuningRight(this),
            new RuningLeft(this),
            new JumpingRight(this),
            new JumpingLeft(this),
            new FallingRight(this),
            new FallingLeft(this),
            new RollingUpRight(this),
            new RollingUpLeft(this),
            new RollingDownRight(this),
            new RollingDownLeft(this),
        ];
        this.currentState = this.states[0];

        this.fps = 20;
        this.maxFrame = 6;
        this.frameX = 0;
        this.frameY = 0;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;

        this.speed = 0;
        this.maxSpeed = 12;
        this.power = 16;
        this.vy = 0;
        this.weight = 0.5;
    }
    draw() {
        this.game.ctx.drawImage(
            this.img,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        this.x += this.speed;
        this.y += this.vy;

        if (this.x <= this.game.width / 5) {
            this.x = this.game.width / 5;
            // this.game.speed = -10;
        } else if (
            this.x >=
            this.game.width - this.width - this.game.width / 5
        ) {
            this.x = this.game.width - this.width - this.game.width / 5;
            // this.game.speed = 10;
        }

        if (this.onGround()) {
            this.vy = 0;
            this.y = this.game.height - this.height - this.game.groundMargin;
        } else {
            this.vy += this.weight;
        }

        this.currentState.handleInput(this.game.input.lastKey);

        if (this.frameTimer > this.frameInterval) {
            this.frameX < this.maxFrame ? this.frameX++ : (this.frameX = 0);
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = speed;
        this.currentState.enter();
    }

    onGround() {
        return (
            this.y >= this.game.height - this.height - this.game.groundMargin
        );
    }
}
