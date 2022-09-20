class Layer {
    constructor(game, width, height, speedModifier, img) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.img = img;
        this.x = 0;
        this.y = 0;
    }

    draw() {
        this.game.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.game.ctx.drawImage(
            this.img,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        );

        this.game.ctx.drawImage(
            this.img,
            this.x - this.width,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        if (this.game.speed > 0) {
            if (this.x < -this.width) {
                this.x = 0;
            } else {
                this.x -= this.game.speed * this.speedModifier;
            }
        } else if (this.game.speed < 0) {
            if (this.x > this.game.width) {
                this.x = this.x - this.width;
            } else {
                this.x -= this.game.speed * this.speedModifier;
            }
        }
    }
}

export default class Background {
    constructor(game) {
        this.game = game;
        this.width = 2400;
        this.height = 600;
        this.bgs = [
            new Layer(this.game, this.width, this.height, 0.8, bg1),
            new Layer(this.game, this.width, this.height, 0.6, bg2),
            new Layer(this.game, this.width, this.height, 1, bg3),
            new Layer(this.game, this.width, this.height, 0.8, bg4),
            new Layer(this.game, this.width, this.height, 0.9, bg5),
        ];
    }

    draw() {
        this.bgs.forEach((bg) => {
            bg.draw();
        });
    }
    update() {
        this.bgs.forEach((bg) => {
            bg.update();
        });
    }
}
