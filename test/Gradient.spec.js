
import sinon from 'sinon';
import chai from 'chai';
import G from '../src/Gradient.js';
import C from '../src/ColorUtil.js';

chai.should();
let expect = require('chai').expect;

describe('Gradient', () => {

    xdescribe('createGradientFunction', () => {

        let typeOptions;

        describe('linear with stops', () => {

            beforeEach(() => {
                typeOptions = {
                    gradientPointColor: sinon.spy()
                }
            });

            let color1 = {x: 0, r: 255, g: 0, b: 0, a: 255};
            let color2 = {x: 0.25, r: 0, g: 255, b: 0, a: 255};
            let color3 = {x: 0.5, r: 0, g: 0, b: 255, a: 255};
            let color4 = {x: 1, r: 255, g: 255, b: 0, a: 255};

            it('should call correct method for linear gradient with stops', () => {

                G.createGradientFunction({colors: [color1]}, typeOptions)();

                gradientFunctions.linear.calledOnce.should.be.true;
                gradientFunctions.linearMatrix.notCalled.should.be.true;
                gradientFunctions.circular.notCalled.should.be.true;
                gradientFunctions.circularMatrix.notCalled.should.be.true;
            });

            it('should transfer x and y', () => {

                gradientFunctions.linear = (x, y, options) => {
                    x.should.equal(1);
                    y.should.equal(2);
                };

                G.createGradientFunction({colors: [color1]}, typeOptions)(1, 2);
            });
        });
    });

    describe('partialGradient', () => {

        it('should calculate gradient from 1 point gradient', () => {

            G.partialGradient([1], 0.5).should.eql({
                item1: 1,
                item2: 1,
                position: 0
            });
        });

        it('should calculate gradient from 2 point gradient', () => {

            G.partialGradient([1,2], .25).should.eql({
                item1: 1,
                item2: 2,
                position: .25
            });
        });

        it('should calculate gradient from 3 point gradient', () => {

            G.partialGradient([1,2,3], 0).should.eql({
                item1: 1,
                item2: 2,
                position: 0
            });

            G.partialGradient([1,2,3], 1).should.eql({
                item1: 3,
                item2: 3,
                position: 0
            });

            G.partialGradient([1,2,3], 0.25).should.eql({
                item1: 1,
                item2: 2,
                position: 0.5
            });
        });

        it('should calculate gradient from 4 point gradient', () => {

            G.partialGradient([1,2,3,4], 0).should.eql({
                item1: 1,
                item2: 2,
                position: 0
            });

            let result = G.partialGradient([1,2,3,4], 1);
            result.item1.should.equal(4);
            result.item2.should.equal(4);
            result.position.should.be.closeTo(0, 0.00000000000001);

            G.partialGradient([1,2,3,4], 0.25).should.eql({
                item1: 1,
                item2: 2,
                position: 0.75
            });
        });
    });

    xdescribe('twoPointGradientWithStops', function() {
        xit('should calculate gradient from 1 point gradient', () => {
            G.twoPointGradientWithStops([{x:0}], 0.5).array.should.eql([1,1]);
            // G.twoPointGradientWithStops([1], 0.5).position.should.equal(0);
        });

        xit('should calculate gradietn from 2 point gradient', () => {
            var data = [{x:0},{x:0.5}]

            // var a = G.twoPointGradientWithStops(data, 0);
            // a.array[0].x.should.eql(0);
            // a.array[1].x.should.equal(0);
            // a.position.should.equal(0);

            a = G.twoPointGradientWithStops(data, 1);
            // a.array[0].x.should.equal(0);
            // a.array[1].x.should.equal(0.5);
            // a.position.should.be.closeTo(1, 0.00001);

            // a = G.twoPointGradientWithStops(data, 0.3);
            // a.array[0].x.should.equal(0);
            // a.array[1].x.should.equal(0.4);
            // a.position.should.be.closeTo(3/4, 0.00001);

            // a = G.twoPointGradientWithStops(data, 0.6);
            // a.array[0].x.should.equal(0.4);
            // a.array[1].x.should.equal(1);
            // a.position.should.be.closeTo(1/3, 0.00001);
        });

        it('should calculate gradietn from 3 point gradient', () => {
            var data = [{x:0},{x:0.4},{x:1}]

            var a = G.twoPointGradientWithStops(data, 0);
            a.array[0].x.should.eql(0);
            a.array[1].x.should.equal(0);
            a.position.should.equal(0);

            a = G.twoPointGradientWithStops(data, 1);
            a.array[0].x.should.equal(0.4);
            a.array[1].x.should.equal(1);
            a.position.should.be.closeTo(1, 0.00001);

            a = G.twoPointGradientWithStops(data, 0.3);
            a.array[0].x.should.equal(0);
            a.array[1].x.should.equal(0.4);
            a.position.should.be.closeTo(3/4, 0.00001);

            a = G.twoPointGradientWithStops(data, 0.6);
            a.array[0].x.should.equal(0.4);
            a.array[1].x.should.equal(1);
            a.position.should.be.closeTo(1/3, 0.00001);
        });
    });

});
