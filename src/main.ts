import { Sim } from './sim';
import { setControl } from './display';
import * as Constant from './constants';

let canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = Constant.X_SIZE;
canvas.height = Constant.Y_SIZE;
canvas.style.border = "thick solid black";
canvas.style.marginTop = "2vh";
canvas.style.marginBottom = "2vh";
let ctx = canvas.getContext("2d");

let sim = new Sim();
sim.setContext(ctx);
setControl(sim);

window.requestAnimationFrame(() => sim.step());
