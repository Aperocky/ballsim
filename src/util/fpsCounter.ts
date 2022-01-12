export class FpsCounter {
    
    startIter: number;
    startTime: number;
    currFps: number;

    constructor() {
        this.startIter = 0;
        this.startTime = Date.now();
        this.currFps = -1;
    }

    measure(iter: number): void {
        let currTime = Date.now();
        if (currTime - this.startTime > 1000) {
            this.currFps = (iter - this.startIter) / (currTime - this.startTime) * 1000;
            this.startIter = iter;
            this.startTime = currTime;
        }
    }
}
