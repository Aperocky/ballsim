import { Ball } from './ball/ball';
import { BallMath } from './ball/ballmath';
import * as Constant from './constants';
import { ShowBiz } from './display';
import { FpsCounter } from './util/fpsCounter';
import { LEVELS } from './ball/levels';

export class Sim {

    balls: Ball[];
    ctx: CanvasRenderingContext2D;
    show: ShowBiz;
    collisionCount: number;
    fastest: number;
    exptest: number;
    avglevel: number;
    iterationCount: number;
    fpsCounter: FpsCounter;

    constructor(count: number = 50) {
        this.balls = [];
        this.show = new ShowBiz(this);
        this.collisionCount = 0;
        this.iterationCount = 0;
        this.fpsCounter = new FpsCounter();
        for (let i = 0; i < count; i++) {
            this.balls.push(new Ball());
        }
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

    draw() {
        this.balls.forEach(ball => {
            ball.draw(this.ctx);
        });
    }

    step(): void {
        this.ctx.fillStyle = '#cccccc';
        this.ctx.fillRect(0, 0, Constant.X_SIZE, Constant.Y_SIZE);
        BallMath.move(this.balls);
        this.collisionCount += BallMath.collide(this.balls);
        if (this.avglevel == LEVELS.length - 1) {
            BallMath.decline(this.balls);
        }
        this.iterationCount++;
        this.getData();
        this.draw(); // Resets collided flag, execute last
        this.fpsCounter.measure(this.iterationCount);
        this.ballDeath()
        this.show.update();
        window.requestAnimationFrame(() => this.step());
    }

    ballDeath(): void {
        // excessively hurt balls die.
        this.balls = this.balls.filter(ball => ball.hurt < 200);
    }

/*
    Manual control actions
*/
    reset() {
        this.balls = [];
        this.collisionCount = 0;
        this.iterationCount = 0;
        this.fpsCounter = new FpsCounter();
        for (let i = 0; i < 50; i++) {
            this.balls.push(new Ball());
        }
    }

    addBall(): void {
        this.balls.push(Ball.getSimBall());
    }

    removeBall(): void {
        this.balls.pop();
    }

/*
    Data meter
*/
    getData(): void {
        this.fastest = 0;
        this.exptest = 0;
        let levelsum = 0;
        this.balls.forEach(ball => {
            if (ball.speed > this.fastest) {
                this.fastest = ball.speed;
            }
            if (ball.exp > this.exptest) {
                this.exptest = ball.exp;
            }
            levelsum += ball.level;
        });
        if (this.balls.length > 0) {
            this.avglevel = levelsum / this.balls.length;
        }
    }
}
