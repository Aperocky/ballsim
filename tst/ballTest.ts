import { Ball } from '../src/ball/ball';
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
        expect(p.x - xprev - p.vx).to.be.below(0.0001);
        expect(p.x - xprev - p.vx).to.be.above(-0.0001);
    });
});

