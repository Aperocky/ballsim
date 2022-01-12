import { BallPhysic } from '../src/ball/ball';
import * as Constant from '../src/constants';
import { expect } from 'chai';
import { getRandomBallPhysic } from './ballTest';
import { CollisionDetection, cellularize, cellCompare, TEST_CONSTANT } from '../src/ball/collision';

function getBalls(count: number): BallPhysic[] {
    let results = [];
    for (let i = 0; i < count; i++) {
        results.push(getRandomBallPhysic());
    }
    return results;
}

function getBallPhysicLocation(x: number, y: number, vx: number = 0, vy: number = 0): BallPhysic {
    let phys: BallPhysic = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        m: 1,
        r: 5
    }
    return phys;
}

describe('collision', () => {
    it('collision:cellularize', () => {
        let ballphysics = getBalls(100);
        let cells = cellularize(ballphysics);
        expect(cells.length).to.equal(Constant.CELL_SPLIT);
        expect(cells[0].length).to.equal(Constant.CELL_SPLIT);
        expect(cells.flat(2).length).to.equal(100);
    });

    it('collision:cellularize:allocation', () => {
        let cellWidth = Constant.X_SIZE / Constant.CELL_SPLIT;
        let cellHeight = Constant.Y_SIZE / Constant.CELL_SPLIT;
        let bp1 = getBallPhysicLocation(10, 10);
        let bp2 = getBallPhysicLocation(10 + cellWidth*2, 10 + cellHeight*4);
        let cells = cellularize([bp1, bp2]);
        expect(cells[0][0].length).to.equal(1);
        expect(cells[2][4].length).to.equal(1);
        expect(cells[0][0][0].index).to.equal(0);
        expect(cells[2][4][0].index).to.equal(1);
    });

    it('collision:cells:compareCell', () => {
        let cellWidth = Constant.X_SIZE / Constant.CELL_SPLIT;
        let cellHeight = Constant.Y_SIZE / Constant.CELL_SPLIT;
        let bp1 = getBallPhysicLocation(cellWidth - 3, 10);
        let bp2 = getBallPhysicLocation(cellWidth + 3, 10);
        let cells = cellularize([bp1, bp2]);
        expect(cells[0][0].length).to.equal(1);
        expect(cells[1][0].length).to.equal(1);
        let result = cellCompare([].concat(cells[0][0], cells[1][0]));
        expect(result.length).to.equal(1);
    });

    it('collision:cells:cellularStrategy', () => {
        let ballphysics = getBalls(150);
        let resultFromBruteForce = CollisionDetection.naive(ballphysics);
        let bruteCount = TEST_CONSTANT.count;
        let resultFromCells = CollisionDetection.cellular(ballphysics);
        let cellCount = TEST_CONSTANT.count;
        expect(resultFromBruteForce.length).to.equal(resultFromCells.length);
        expect(cellCount).to.be.below(bruteCount);
    })
});
