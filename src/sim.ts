import { Ball } from './ball/ball';
import { BallMath } from './ball/ballmath';
import * as Constant from './constants';
import { ShowBiz } from './display';
import { FpsCounter } from './util/fpsCounter';

export class Sim {

    balls: Ball[];
    ctx: CanvasRenderingContext2D;
    show: ShowBiz;
    collisionCount: number;
    fastest: number;
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
        this.ctx.fillStyle = '#AAAAAA';
        this.ctx.fillRect(0, 0, Constant.X_SIZE, Constant.Y_SIZE);
        BallMath.move(this.balls);
        this.collisionCount += BallMath.collide(this.balls);
        this.iterationCount++;
        this.getFastest();
        this.draw(); // Resets collided flag, execute last
        this.fpsCounter.measure(this.iterationCount);
        this.show.update();
        window.requestAnimationFrame(() => this.step());
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
    getFastest(): void {
        this.fastest = 0;
        this.balls.forEach(ball => {
            if (ball.speed > this.fastest) {
                this.fastest = ball.speed;
            }
        });
    }
}
