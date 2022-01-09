import { Ball } from './ball/ball';
import { BallMath } from './ball/ballmath';
import * as Constant from './constants';
import { ShowBiz } from './display';

export class Sim {

    balls: Ball[];
    ctx: CanvasRenderingContext2D;
    show: ShowBiz;

    constructor(count: number) {
        this.balls = [];
        this.show = new ShowBiz(this);
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

    step() {
        this.ctx.fillStyle = '#AAAAAA';
        this.ctx.fillRect(0, 0, Constant.X_SIZE, Constant.Y_SIZE);
        BallMath.move(this.balls);
        BallMath.collide(this.balls);
        this.draw();
        window.requestAnimationFrame(() => this.step());
    }

/* 
    Manual control actions
*/
    addBall() {
        this.balls.push(Ball.getSimBall());
    }

    removeBall() {
        this.balls.pop();
    }
}
