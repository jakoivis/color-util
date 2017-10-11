
import chai from 'chai';
import G from '../src/Gradient.js';

chai.should();
let expect = require('chai').expect;

describe('Gradient', () => {

    describe('twoStopGradient', () => {

        it('should calculate gradient from 1 point gradient', () => {
            G.twoStopGradient([1], 0.5).array.should.eql([1,1]);
            G.twoStopGradient([1], 0.5).position.should.equal(0);
        });

        it('should calculate gradient from 2 point gradient', () => {
            G.twoStopGradient([1,2], .25).array.should.eql([1,2]);
            G.twoStopGradient([1,2], .25).position.should.equal(.25);
        });

        it('should calculate gradient from 3 point gradient', () => {
            G.twoStopGradient([1,2,3], 0).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3], 0).position.should.equal(0);
            G.twoStopGradient([1,2,3], 1).array.should.eql([3,3]);
            G.twoStopGradient([1,2,3], 1).position.should.equal(0);
            G.twoStopGradient([1,2,3], 0.25).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3], 0.25).position.should.equal(0.5);
        });

        it('should calculate gradient from 4 point gradient', () => {
            G.twoStopGradient([1,2,3,4], 0).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3,4], 0).position.should.equal(0);
            G.twoStopGradient([1,2,3,4], 1).array.should.eql([4,4]);
            G.twoStopGradient([1,2,3,4], 1).position.should.be.closeTo(0, 0.00000000000001);
            G.twoStopGradient([1,2,3,4], 0.25).array.should.eql([1,2]);
            G.twoStopGradient([1,2,3,4], 0.25).position.should.equal(0.75);
        });
    });

    describe('twoPointGradientWithStops', function() {
        xit('should calculate gradient from 1 point gradient', () => {
            G.twoPointGradientWithStops([{p:0}], 0.5).array.should.eql([1,1]);
            // G.twoPointGradientWithStops([1], 0.5).position.should.equal(0);
        });

        xit('should calculate gradietn from 2 point gradient', () => {
            var data = [{p:0},{p:0.5}]

            // var a = G.twoPointGradientWithStops(data, 0);
            // a.array[0].p.should.eql(0);
            // a.array[1].p.should.equal(0);
            // a.position.should.equal(0);

            a = G.twoPointGradientWithStops(data, 1);
            // a.array[0].p.should.equal(0);
            // a.array[1].p.should.equal(0.5);
            // a.position.should.be.closeTo(1, 0.00001);

            // a = G.twoPointGradientWithStops(data, 0.3);
            // a.array[0].p.should.equal(0);
            // a.array[1].p.should.equal(0.4);
            // a.position.should.be.closeTo(3/4, 0.00001);

            // a = G.twoPointGradientWithStops(data, 0.6);
            // a.array[0].p.should.equal(0.4);
            // a.array[1].p.should.equal(1);
            // a.position.should.be.closeTo(1/3, 0.00001);
        });

        it('should calculate gradietn from 3 point gradient', () => {
            var data = [{p:0},{p:0.4},{p:1}]

            var a = G.twoPointGradientWithStops(data, 0);
            a.array[0].p.should.eql(0);
            a.array[1].p.should.equal(0);
            a.position.should.equal(0);

            a = G.twoPointGradientWithStops(data, 1);
            a.array[0].p.should.equal(0.4);
            a.array[1].p.should.equal(1);
            a.position.should.be.closeTo(1, 0.00001);

            a = G.twoPointGradientWithStops(data, 0.3);
            a.array[0].p.should.equal(0);
            a.array[1].p.should.equal(0.4);
            a.position.should.be.closeTo(3/4, 0.00001);

            a = G.twoPointGradientWithStops(data, 0.6);
            a.array[0].p.should.equal(0.4);
            a.array[1].p.should.equal(1);
            a.position.should.be.closeTo(1/3, 0.00001);
        });
    });

});
