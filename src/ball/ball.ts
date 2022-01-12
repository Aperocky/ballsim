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
        x: (0.1 + Math.random()*0.8) * Constant.X_SIZE,
        y: (0.1 + Math.random()*0.8) * Constant.Y_SIZE,
        vx: (Math.random() - 0.5) * Constant.V_DEFAULT,
        vy: (Math.random() - 0.5) * Constant.V_DEFAULT,
        m: 1,
        r: 10
    }
}

function getSimAddBallPhysics(): BallPhysic {
    return {
        x: 0.1 * Constant.X_SIZE,
        y: 0.1 * Constant.Y_SIZE,
        vx: (Math.random() * 0.5) * Constant.V_DEFAULT,
        vy: (Math.random() * 0.5) * Constant.V_DEFAULT,
        m: 1,
        r: 10
    }
}

export class Ball {

    phys: BallPhysic;
    hurt: number;
    collided: boolean;
    speed: number;

    static getSimBall(): Ball {
        return new Ball(getSimAddBallPhysics());
    }

    constructor(phys?: BallPhysic) {
        if (phys == null) {
            this.phys = getRandomBallPhysic();
        } else {
            this.phys = phys;
        }
        this.hurt = 0;
        this.getSpeed();
    }

    draw(ctx) {
        // pass
        ctx.beginPath();
        ctx.arc(this.phys.x, this.phys.y, this.phys.r, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();

        if (this.hurt > 0) {
            ctx.lineWidth = this.hurt;
            ctx.strokeStyle = "yellow";
            ctx.stroke();
            this.hurt -= 1;
        }
        this.collided = false;
    }

    getSpeed(): void {
        let vx = this.phys.vx;
        let vy = this.phys.vy;
        this.speed = Math.pow(vx*vx + vy*vy, 0.5);
    }
}
