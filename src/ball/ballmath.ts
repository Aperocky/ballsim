import { Ball, BallPhysic } from './ball';
import * as Constant from '../constants';
import { CollisionDetection } from './collision';

function bounceOffWall(p: BallPhysic): void {
    if (p.x < 0) {
        p.x = 0;
        p.vx = -p.vx;
    } else if (p.x > Constant.X_SIZE) {
        p.x = Constant.X_SIZE;
        p.vx = -p.vx;
    }
    if (p.y < 0) {
        p.y = 0;
        p.vy = -p.vy;
    } else if (p.y > Constant.Y_SIZE) {
        p.y = Constant.Y_SIZE;
        p.vy = -p.vy;
    }
}

function bounceOffOther(a: BallPhysic, b: BallPhysic): void {
    // https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    let dist = dx * dx + dy * dy;
    let dvx = a.vx - b.vx;
    let dvy = a.vy - b.vy;
    let vddot = dx * dvx + dy * dvy;

    // Scalars
    let ams = 2 * a.m / (a.m + b.m);
    let bms = 2 * b.m / (a.m + b.m);
    let vds = vddot / dist;

    a.vx = a.vx - ams * vds * dx;
    a.vy = a.vy - ams * vds * dy;
    b.vx = b.vx + bms * vds * dx;
    b.vy = b.vy + bms * vds * dy;
}

export class BallMath {

    static move(balls: Ball[]): void {
        balls.forEach(ball => {
            let p = ball.phys;
            p.x += p.vx;
            p.y += p.vy;
            bounceOffWall(p);
        });
    }

    static collide(balls: Ball[]): void {
        let plist = balls.map(b => b.phys);
        let pairs = CollisionDetection.naive(plist);
        pairs.forEach(pair => {
            bounceOffOther(plist[pair[0]], plist[pair[1]]);
        });
    }
}

// Naive implementation
