import { Ball, BallPhysic } from './ball';
import * as Constant from '../constants';
import { CollisionDetection } from './collision';

function bounceOffWall(p: BallPhysic): void {
    if (p.x < p.r) {
        p.x = p.r;
        p.vx = -p.vx;
    } else if (p.x > Constant.X_SIZE - p.r) {
        p.x = Constant.X_SIZE - p.r;
        p.vx = -p.vx;
    }
    if (p.y < p.r) {
        p.y = p.r;
        p.vy = -p.vy;
    } else if (p.y > Constant.Y_SIZE - p.r) {
        p.y = Constant.Y_SIZE - p.r;
        p.vy = -p.vy;
    }
}

function bounceOffOther(a: BallPhysic, b: BallPhysic): void {
    // https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
    let dx = a.x - b.x;
    let dy = a.y - b.y;

    if (dx == 0 && dy == 0) {
        // On rare occasions where this happen, don't do anything and let the balls fly apart.
        // This is possible because balls over both x and y edge at the same time
        // with the same radius will be dragged back to the same center location.
        console.log("Duplicate Center Location");
        return;
    }

    let sqdist = dx * dx + dy * dy;
    let dvx = a.vx - b.vx;
    let dvy = a.vy - b.vy;
    let vddot = dx * dvx + dy * dvy;

    // Scalars
    let ams = 2 * a.m / (a.m + b.m);
    let bms = 2 * b.m / (a.m + b.m);
    let vds = vddot / sqdist;

    a.vx = a.vx - bms * vds * dx;
    a.vy = a.vy - bms * vds * dy;
    b.vx = b.vx + ams * vds * dx;
    b.vy = b.vy + ams * vds * dy;

    let dist = sqdist ** 0.5;
    a.x -= (1 - (a.r + b.r)/dist) * dx / 2;
    a.y -= (1 - (a.r + b.r)/dist) * dy / 2;
    b.x += (1 - (a.r + b.r)/dist) * dx / 2;
    b.y += (1 - (a.r + b.r)/dist) * dy / 2;
}

function applyGravity(p: BallPhysic) {
    // Pass, allow for gravity
}

export class BallMath {

    static move(balls: Ball[]): void {
        balls.forEach(ball => {
            let p = ball.phys;
            p.x += p.vx;
            p.y += p.vy;
            applyGravity(p);
            bounceOffWall(p);
        });
    }

    static decline(balls: Ball[]): void {
        balls.forEach(ball => {
            let p = ball.phys;
            p.vx *= 0.995;
            p.vy *= 0.995;
            ball.getSpeed();
        });
    }

    static collide(balls: Ball[]): number {
        let plist = balls.map(b => b.phys);
        let pairs = CollisionDetection.cellular(plist);
        pairs.forEach(pair => {
            bounceOffOther(plist[pair[0]], plist[pair[1]]);
            balls[pair[0]].hurt += 5;
            balls[pair[1]].hurt += 5;
            balls[pair[0]].collided = true;
            balls[pair[1]].collided = true;
            balls[pair[0]].getSpeed();
            balls[pair[1]].getSpeed();
            balls[pair[0]].expAndLevel();
            balls[pair[1]].expAndLevel();
        });
        return pairs.length;
    }
}

// Naive implementation
