// Dedicate a file to detect collisions
import { BallPhysic } from './ball';
import * as Constant from '../constants';

type TestCounter = {
    count: number;
}

export const TEST_CONSTANT: TestCounter = { count: 0 };

export type LabeledBallPhysic = {
    index: number;
    ballPhysic: BallPhysic;
}

function isContact(a: BallPhysic, b: BallPhysic): boolean {
    TEST_CONSTANT.count++;
    let sqdist = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
    return sqdist < ((a.r + b.r) ** 2);
}

// Export for test purposes
export function cellularize(plist: BallPhysic[]): LabeledBallPhysic[][][] {
    let size = plist.length;
    let splitX = Constant.X_SIZE / Constant.CELL_SPLIT;
    let splitY = Constant.Y_SIZE / Constant.CELL_SPLIT;
    let cells: LabeledBallPhysic[][][] = [];
    for (let i = 0; i < Constant.CELL_SPLIT; i++) {
        cells.push([]);
        for (let j = 0; j < Constant.CELL_SPLIT; j++) {
            cells[i].push([]);
        }
    }
    for (let i = 0; i < size; i++) {
        let ix = Math.floor(plist[i].x / splitX);
        let jx = Math.floor(plist[i].y / splitY);
        let lbp: LabeledBallPhysic = {
            index: i,
            ballPhysic: plist[i]
        }
        cells[ix][jx].push(lbp);
    }
    return cells;
}

// Export for test purposes
export function cellCompare(labeledBalls: LabeledBallPhysic[]) {
    let size = labeledBalls.length;
    let result: number[][] = [];
    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            if (isContact(labeledBalls[i].ballPhysic, labeledBalls[j].ballPhysic)) {
                let idx = labeledBalls[i].index;
                let jdx = labeledBalls[j].index;
                result.push([idx, jdx]);
            }
        }
    }
    return result;
}

function dedupePairs(pairs: number[][]): number[][] {
    let setPairs = new Set<string>();
    pairs.forEach(pair => {
        setPairs.add(JSON.stringify(pair));
    });
    return Array.from(setPairs).map(p => JSON.parse(p));
}

export class CollisionDetection {

    static naive(plist: BallPhysic[]): number[][] {
        TEST_CONSTANT.count = 0;
        let size = plist.length;
        let results: number[][] = [];
        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                if (isContact(plist[i], plist[j])) {
                    results.push([i, j]);
                }
            }
        }
        return results;
    }

    static cellular(plist: BallPhysic[]): number[][] {
        TEST_CONSTANT.count = 0;
        let cells = cellularize(plist);
        let results: number[][] = [];
        for (let i = 0; i < Constant.CELL_SPLIT; i++) {
            for (let j = 0; j < Constant.CELL_SPLIT; j++) {
                let currentList = [].concat(cells[i][j]);
                if (i < Constant.CELL_SPLIT - 1) {
                    currentList.push(...cells[i+1][j]);
                }
                if (j < Constant.CELL_SPLIT - 1) {
                    currentList.push(...cells[i][j+1]);
                }
                if (i < Constant.CELL_SPLIT - 1 && j < Constant.CELL_SPLIT - 1) {
                    currentList.push(...cells[i+1][j+1]);
                }
                results.push(...cellCompare(currentList));
            }
        }
        results = dedupePairs(results);
        return results;
    }
}
