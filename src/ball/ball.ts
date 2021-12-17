import * as Constant from '../constants';

export type BallPhysic = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    m: number;
    r: number;
}

function getRandomBallPhysic(): BallPhysic {
    return {
        x: (0.5 + Math.random()*0.5) * Constant.X_SIZE,
        y: (0.5 + Math.random()*0.5) * Constant.Y_SIZE,
        vx: (Math.random() - 0.5) * Constant.V_DEFAULT,
        vy: (Math.random() - 0.5) * Constant.V_DEFAULT,
        m: 1,
        r: 5
    }
}

export class Ball {

    phys: BallPhysic;

    constructor() {
        this.phys = getRandomBallPhysic();
    }

    draw(ctx) {
        // pass
        ctx.beginPath();
        ctx.arc(this.phys.x, this.phys.y, this.phys.r, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
    }
}
