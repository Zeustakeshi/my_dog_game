export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.lastKey = "";
        this.touchY = "";
        this.touchX = "";
        this.touchTreshold = 30;

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowDown":
                case "s":
                    this.lastKey = "PRESS down";
                    break;
                case "ArrowUp":
                case "w":
                    this.lastKey = "PRESS up";
                    break;
                case "ArrowRight":
                case "d":
                    this.lastKey = "PRESS right";
                    break;
                case "ArrowLeft":
                case "a":
                    this.lastKey = "PRESS left";
                    break;

                default:
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowDown":
                case "s":
                    this.lastKey = "RELEASE down";
                    break;
                case "ArrowUp":
                case "w":
                    this.lastKey = "RELEASE up";
                    break;
                case "ArrowRight":
                case "d":
                    this.lastKey = "RELEASE right";
                    break;
                case "ArrowLeft":
                case "a":
                    this.lastKey = "RELEASE left";
                    break;
                default:
                    break;
            }
        });

        window.addEventListener("touchstart", (e) => {
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
        });

        window.addEventListener("touchmove", (e) => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;

            if (swipeDistanceY < -this.touchTreshold) {
                this.lastKey = "PRESS up";
            } else if (swipeDistanceY > this.touchTreshold) {
                this.lastKey = "PRESS down";
            } else if (swipeDistanceX > this.touchTreshold) {
                this.lastKey = "PRESS right";
            } else if (swipeDistanceX < -this.touchTreshold) {
                this.lastKey = "PRESS left";
            } else {
                this.lastKey = "";
            }
        });

        window.addEventListener("touchend", () => {
            switch (this.lastKey) {
                case "PRESS up":
                    this.lastKey = "RELEASE up";
                    break;
                case "PRESS down":
                    this.lastKey = "RELEASE down";
                    break;
                case "PRESS right":
                    this.lastKey = "RELEASE right";
                    break;
                case "PRESS left":
                    this.lastKey = "RELEASE left";
                    break;

                default:
                    break;
            }
        });
    }
}

//release
