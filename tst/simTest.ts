import { Sim } from '../src/sim';
import { expect } from 'chai';


describe('sim', () => {
    it('sim:initiation', () => {
        let sim = new Sim(3);
        expect(sim.balls.length).to.equal(3);
    });

    it('sim:removeBall', () => {
        let sim = new Sim(3);
        expect(sim.balls.length).to.equal(3);
        sim.removeBall();
        expect(sim.balls.length).to.equal(2);
    });
});
