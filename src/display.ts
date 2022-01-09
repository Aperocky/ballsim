import { Sim } from './sim';

// Adding functionality to control panels
export function setControl(sim: Sim): void {
    loadWidgets(sim);
}

function loadWidgets(sim: Sim): void {
    let addbtn = document.getElementById("addbtn");
    let removebtn = document.getElementById("removebtn");
    sim.show.createElements();
    addbtn.addEventListener("click", () => {
        sim.addBall();
        sim.show.updateBallCount();
    });
    removebtn.addEventListener("click", () => {
        sim.removeBall();
        sim.show.updateBallCount();
    });
}

export class ShowBiz {

    sim: Sim;
    ballCount: HTMLElement;

    constructor(sim: Sim) {
        this.sim = sim;
    }

    createElements() {
        let se = document.getElementById("showbiz");
        this.ballCount = document.createElement("div");
        se.appendChild(this.ballCount);
        this.updateBallCount();
    }

    updateBallCount() {
        let count = this.sim.balls.length;
        this.ballCount.innerHTML = `Ball Count: ${count}`;
    }
}
