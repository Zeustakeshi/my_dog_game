export const states = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 1,
    SITTING_RIGHT: 2,
    SITTING_LEFT: 3,
    RUNING_RIGHT: 4,
    RUNING_LEFT: 5,
    JUMPING_RIGHT: 6,
    JUMPING_LEFT: 7,
    FALLING_RIGHT: 8,
    FALLING_LEFT: 9,
    ROLLING_UP_RIGHT: 10,
    ROLLING_UP_LEFT: 11,
    ROLLING_DOWN_RIGHT: 12,
    ROLLING_DOWN_LEFT: 13,
};

const speed = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 0,
    SITTING_RIGHT: 0,
    SITTING_LEFT: 0,
    RUNING_RIGHT: 12,
    RUNING_LEFT: -12,
    JUMPING_RIGHT: 14,
    JUMPING_LEFT: -14,
    FALLING_RIGHT: 14,
    FALLING_LEFT: -14,
    ROLLING_UP_RIGHT: 16,
    ROLLING_UP_LEFT: -16,
    ROLLING_DOWN_RIGHT: 0,
    ROLLING_DOWN_LEFT: 0,
};

class State {
    constructor(state) {
        this.state = state;
    }
}

export class StandingRight extends State {
    constructor(player) {
        super("STANDING_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 0;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input === "PRESS left") {
            this.player.setState(states.STANDING_LEFT, speed.STANDING_LEFT);
        } else if (input === "PRESS right") {
            this.player.setState(states.RUNING_RIGHT, speed.RUNING_RIGHT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_RIGHT, speed.SITTING_RIGHT);
        } else if (input === "PRESS up") {
            this.player.setState(states.JUMPING_RIGHT, speed.JUMPING_RIGHT);
        }
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super("STANDING_LEFT");
        this.player = player;
    }

    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 1;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input === "PRESS right") {
            this.player.setState(states.STANDING_RIGHT, speed.STANDING_RIGHT);
        } else if (input === "PRESS left") {
            this.player.setState(states.RUNING_LEFT, speed.RUNING_LEFT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_LEFT, speed.SITTING_LEFT);
        } else if (input === "PRESS up") {
            this.player.setState(states.JUMPING_LEFT, speed.JUMPING_LEFT);
        }
    }
}

export class SittingRight extends State {
    constructor(player) {
        super("SITTING_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 4;
        this.player.frameY = 8;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input === "PRESS left") {
            this.player.setState(states.SITTING_LEFT, speed.SITTING_LEFT);
        } else if (input === "PRESS right") {
            this.player.setState(states.RUNING_LEFT, speed.RUNING_LEFT);
        } else if (input === "PRESS up") {
            this.player.setState(
                states.ROLLING_UP_RIGHT,
                speed.ROLLING_UP_RIGHT
            );
        }
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super("SITTING_LEFT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 4;
        this.player.frameY = 9;
        this.player.speed = 0;
    }
    handleInput(input) {
        if (input === "PRESS right") {
            this.player.setState(states.SITTING_RIGHT, speed.SITTING_RIGHT);
        } else if (input === "PRESS left") {
            this.player.setState(states.RUNING_LEFT, speed.RUNING_LEFT);
        } else if (input === "PRESS up") {
            this.player.setState(states.ROLLING_UP_LEFT, speed.ROLLING_UP_LEFT);
        }
    }
}

export class RuningRight extends State {
    constructor(player) {
        super("RUNING_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 8;
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
    }
    handleInput(input) {
        if (input === "PRESS left") {
            this.player.setState(states.STANDING_LEFT, speed.STANDING_LEFT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_RIGHT, speed.SITTING_RIGHT);
        } else if (input === "RELEASE right") {
            this.player.setState(states.STANDING_RIGHT, speed.STANDING_RIGHT);
        } else if (input === "PRESS up") {
            this.player.setState(states.JUMPING_RIGHT, speed.JUMPING_RIGHT);
        }
    }
}

export class RuningLeft extends State {
    constructor(player) {
        super("RUNING_LEFT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 8;
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;
    }
    handleInput(input) {
        if (input === "PRESS right") {
            this.player.setState(states.STANDING_RIGHT, speed.STANDING_RIGHT);
        } else if (input === "PRESS down") {
            this.player.setState(states.SITTING_LEFT, speed.SITTING_LEFT);
        } else if (input === "RELEASE left") {
            this.player.setState(states.STANDING_LEFT, speed.STANDING_LEFT);
        } else if (input === "PRESS up") {
            this.player.setState(states.JUMPING_LEFT, speed.JUMPING_LEFT);
        }
    }
}

export class JumpingRight extends State {
    constructor(player) {
        super("JUMPING_RIGNT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 2;
        this.player.speed = this.player.maxSpeed * 0.5;
        if (this.player.onGround()) this.player.vy = -this.player.power;
    }
    handleInput(input) {
        if (input === "PRESS left" && this.player.vy < 0) {
            this.player.setState(states.JUMPING_LEFT, speed.JUMPING_LEFT);
        } else if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT, speed.STANDING_RIGHT);
        } else if (this.player.vy > 0) {
            this.player.setState(states.FALLING_RIGHT, speed.FALLING_RIGHT);
        } else if (input === "PRESS down") {
            this.player.setState(
                states.ROLLING_DOWN_RIGHT,
                speed.ROLLING_DOWN_RIGHT
            );
        }
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super("JUMPING_LEFT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 3;
        this.player.speed = -this.player.maxSpeed * 0.5;
        if (this.player.onGround()) this.player.vy = -this.player.power;
    }
    handleInput(input) {
        if (input === "PRESS right" && this.player.vy < 0) {
            this.player.setState(states.JUMPING_RIGHT, speed.JUMPING_RIGHT);
        } else if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT, speed.STANDING_LEFT);
        } else if (this.player.vy > 0) {
            this.player.setState(states.FALLING_LEFT, speed.FALLING_LEFT);
        } else if (input === "PRESS down") {
            this.player.setState(
                states.ROLLING_DOWN_LEFT,
                speed.ROLLING_DOWN_LEFT
            );
        }
    }
}

export class FallingRight extends State {
    constructor(player) {
        super("FALLING_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 4;
        this.player.speed = this.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT, speed.STANDING_RIGHT);
        } else if (input === "PRESS left" && this.player.vy > 0) {
            this.player.setState(states.FALLING_LEFT, speed.FALLING_LEFT);
        } else if (input === "PRESS down") {
            this.player.setState(
                states.ROLLING_DOWN_RIGHT,
                speed.ROLLING_DOWN_RIGHT
            );
        }
    }
}

export class FallingLeft extends State {
    constructor(player) {
        super("FALLING_LEFT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 5;
        this.player.speed = -this.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT, speed.STANDING_LEFT);
        } else if (input === "PRESS right" && this.player.vy > 0) {
            this.player.setState(states.FALLING_RIGHT, speed.FALLING_RIGHT);
        } else if (input === "PRESS down") {
            this.player.setState(
                states.ROLLING_DOWN_LEFT,
                speed.ROLLING_DOWN_LEFT
            );
        }
    }
}

export class RollingUpRight extends State {
    constructor(player) {
        super("ROLLING_UP_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 10;
        this.player.speed = this.player.maxSpeed;
        if (this.player.onGround()) this.player.vy = -this.player.power * 1.2;
    }

    handleInput(input) {
        if (this.player.vy > 0) {
            this.player.setState(states.FALLING_RIGHT, speed.FALLING_RIGHT);
        } else if (input === "PRESS left") {
            this.player.setState(states.ROLLING_UP_LEFT, speed.ROLLING_UP_LEFT);
        }
    }
}

export class RollingUpLeft extends State {
    constructor(player) {
        super("ROLLING_UP_LEFT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 11;
        this.player.speed = -this.player.maxSpeed;
        if (this.player.onGround()) this.player.vy = -this.player.power * 1.2;
    }

    handleInput(input) {
        if (this.player.vy > 0) {
            this.player.setState(states.FALLING_LEFT, speed.FALLING_LEFT);
        } else if (input === "PRESS right") {
            this.player.setState(
                states.ROLLING_UP_RIGHT,
                speed.ROLLING_UP_RIGHT
            );
        }
    }
}

export class RollingDownRight extends State {
    constructor(player) {
        super("ROLLING_DOWN_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 10;
        if (!this.player.onGround()) this.player.vy = this.player.power * 1.2;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT, speed.STANDING_RIGHT);
        } else if (input === "PRESS left") {
            this.player.setState(
                states.ROLLING_DOWN_LEFT,
                speed.ROLLING_DOWN_LEFT
            );
        }
    }
}

export class RollingDownLeft extends State {
    constructor(player) {
        super("ROLLING_DOWN_LEFT");
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 11;
        if (!this.player.onGround()) this.player.vy = this.player.power * 1.2;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT, speed.STANDING_LEFT);
        } else if (input === "PRESS right") {
            this.player.setState(
                states.ROLLING_DOWN_RIGHT,
                speed.ROLLING_DOWN_RIGHT
            );
        }
    }
}
