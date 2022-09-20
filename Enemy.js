class Enemy {
    constructor() {
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.scale = 1;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 1;
        this.fps = 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.makedForDeletion = false;
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
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            this.frameX >= this.maxFrame ? (this.frameX = 0) : this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }

        if (this.x <= -this.game.width) {
            this.makedForDeletion = true;
        }
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.img = document.getElementById("enemyFly");
        this.x = this.game.width + this.width;
        this.y = (Math.random() * this.game.height) / 4;
        this.spriteWidth = 60;
        this.spriteHeight = 44;
        this.maxFrame = 5;
        this.speedX = Math.random() * 10;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update() {
        super.update();
        this.angle += this.va;
        this.speedY = 2 * Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.img = document.getElementById("enemyGround");
        this.spriteWidth = 60;
        this.spriteHeight = 87;
        this.x = this.game.width + this.width;
        this.y = this.game.height - this.game.groundMargin - this.height;
        this.maxFrame = 1;
        this.speedX = 0;
    }
}

export class ClimbEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.img = document.getElementById("enemyClimb");
        this.spriteWidth = 120;
        this.spriteHeight = 144;
        this.x =
            this.game.player.x +
            (Math.random() * this.width) / 2 -
            this.width / 2;
        this.y = -this.height;
        this.maxFrame = 5;
        this.speedX = 0;
        this.speedY = 5;
        this.maxHieght =
            Math.random() *
            (this.game.height - this.game.groundMargin - this.height);
    }

    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(this.x + this.width / 2, 0);
        this.game.ctx.lineTo(this.x + this.width / 2, this.y);
        this.game.ctx.lineWidth = 3;
        this.game.ctx.stroke();
        super.draw();
    }

    update() {
        super.update();
        if (this.y > this.maxHieght) {
            this.speedY *= -1;
        }
        if (this.y < -this.height) {
            this.makedForDeletion = true;
        }
    }
}
