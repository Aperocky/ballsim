import { Ball, BallPhysic } from '../src/ball/ball';
import * as Constant from '../src/constants';
import { expect } from 'chai';
import { BallMath } from '../src/ball/ballmath';

describe('ball', () => {
    it('ball:initiation', () => {
        let ball = new Ball();
        let p = ball.phys;
        expect(p.x).to.be.above(0);
        expect(p.y).to.be.below(Constant.Y_SIZE);
        expect(p.vx).to.be.below(Constant.V_DEFAULT/2);
        expect(p.m).to.equal(1);
    });

    it('ball:move', () => {
        let ball = new Ball();
        let p = ball.phys;
        let xprev = p.x;
        let yprev = p.y;
        BallMath.move([ball]);
        expect(p.x - xprev - p.vx).to.be.closeTo(0, 0.0001);
    });

    it('ball:bounceOffWall', () => {
        let phys: BallPhysic = {
            x: Constant.X_SIZE - 6,
            y: 100,
            vx: 5,
            vy: 2,
            m: 10,
            r: 5
        }
        let ball = new Ball(phys);
        let p = ball.phys;
        BallMath.move([ball]);
        expect(p.vx).to.equal(-5);
        expect(p.x).to.equal(Constant.X_SIZE - 5);
    });

    it('ball:bounceOffOther:basicCase', () => {
        let phys1: BallPhysic = {
            x: 200,
            y: 100,
            vx: 5,
            vy: 0,
            m: 1,
            r: 5
        }
        let phys2: BallPhysic = {
            x: 209,
            y: 100,
            vx: -5,
            vy: 0,
            m: 1,
            r: 5
        }
        let ball1 = new Ball(phys1);
        let ball2 = new Ball(phys2);
        BallMath.collide([ball1, ball2]);
        let p1 = ball1.phys;
        let p2 = ball2.phys;
        expect(p1.vx).to.be.closeTo(-5, 0.0001);
        expect(p2.vx).to.be.closeTo(5, 0.0001);
        expect(p1.x).to.be.closeTo(199.5, 0.0001);
        expect(p2.x).to.be.closeTo(209.5, 0.0001);
    });
});

