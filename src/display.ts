import { Sim } from './sim';

// Adding functionality to control panels
export function setControl(sim: Sim): void {
    loadWidgets(sim);
}

function loadWidgets(sim: Sim): void {
    let addbtn = document.getElementById("addbtn");
    let removebtn = document.getElementById("removebtn");
    let restartbtn = document.getElementById("resetbtn");
    sim.show.createElements();
    addbtn.addEventListener("click", () => {
        sim.addBall();
        sim.show.updateBallCount();
    });
    removebtn.addEventListener("click", () => {
        sim.removeBall();
        sim.show.updateBallCount();
    });
    restartbtn.addEventListener("click", () => {
        sim.reset();
        sim.show.updateBallCount();
    });
}

export class ShowBiz {

    sim: Sim;
    fpsCounter: HTMLElement;
    ballCount: HTMLElement;
    collisionCount: HTMLElement;
    fastestSpeed: HTMLElement;
    iterationCount: HTMLElement;

    constructor(sim: Sim) {
        this.sim = sim;
    }

    createAndAttachTableRow(name: string, tbody: HTMLElement): HTMLElement {
        let tr = document.createElement("tr");
        let rh = document.createElement("th");
        rh.scope = "row";
        rh.innerHTML = name;
        tr.appendChild(rh);
        let datatd = document.createElement("td");
        tr.appendChild(datatd);
        tbody.appendChild(tr);
        return datatd;
    }

    createElements() {
        let se = document.getElementById("data-area");
        this.fpsCounter = this.createAndAttachTableRow("FPS", se);
        this.ballCount = this.createAndAttachTableRow("Ball Count", se);
        this.iterationCount = this.createAndAttachTableRow("Iteration #", se);
        this.collisionCount = this.createAndAttachTableRow("Collision #", se);
        this.fastestSpeed = this.createAndAttachTableRow("Fastest Speed", se);
        this.updateBallCount();
    }

    updateBallCount() {
        let count = this.sim.balls.length;
        this.ballCount.innerHTML = `${count}`;
    }

    update() {
        this.fpsCounter.innerHTML = this.sim.fpsCounter.currFps.toFixed(0);
        this.collisionCount.innerHTML = `${this.sim.collisionCount}`;
        this.iterationCount.innerHTML = `${this.sim.iterationCount}`;
        this.fastestSpeed.innerHTML = this.sim.fastest.toFixed(2);
    }
}
