
import chai from 'chai';
import G from '../src/Gradient.js';

chai.should();
let expect = require('chai').expect;

describe('Gradient', () => {

    describe('twoStopGradient', () => {

        it('should gradient from 1 point gradient', () => {
            G.twoStopGradient([1], 0.5).array.should.eql([1,1]);
            G.twoStopGradient([1], 0.5).position.should.equal(0);
        });

        it('should gradient from 2 point gradient', () => {
            G.twoStopGradient([1,2], .25).array.should.eql([1,2]);
            G.twoStopGradient([1,2], .25).position.should.equal(.25);
        });

        it('should gradient from 3 point gradient', () => {
            G.twoStopGradient([1,2,3], 0).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3], 0).position.should.equal(0);
            G.twoStopGradient([1,2,3], 1).array.should.eql([3,3]);
            G.twoStopGradient([1,2,3], 1).position.should.equal(0);
            G.twoStopGradient([1,2,3], 0.25).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3], 0.25).position.should.equal(0.5);
        });

        it('should gradient from 4 point gradient', () => {
            G.twoStopGradient([1,2,3,4], 0).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3,4], 0).position.should.equal(0);
            G.twoStopGradient([1,2,3,4], 1).array.should.eql([4,4]);
            G.twoStopGradient([1,2,3,4], 1).position.should.be.closeTo(0, 0.00000000000001);
            G.twoStopGradient([1,2,3,4], 0.25).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3,4], 0.25).position.should.equal(0.75);
        });
    });

});
