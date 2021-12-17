// Dedicate a file to detect collisions
import { BallPhysic } from './ball';
import * as Constant from '../constants';

function isContact(a: BallPhysic, b: BallPhysic): boolean {
    let sqdist = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
    return sqdist < ((a.r + b.r) ** 2);
}

export class CollisionDetection {

    static naive(plist: BallPhysic[]): number[][] {
        let size = plist.length;
        let result: number[][] = []
        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                if (isContact(plist[i], plist[j])) {
                    result.push([i, j]);
                }
            }
        }
        return result;
    }
}
