
import sinon from 'sinon';
import chai from 'chai';
import G from '../src/Gradient.js';

chai.should();
let expect = require('chai').expect;

xdescribe('Gradient', () => {

    describe('createGradientFunction', () => {

        let gradientFunctions;

        describe('linear with stops', () => {

            beforeEach(() => {
                gradientFunctions = {
                    linear: sinon.spy(),
                    linearMatrix: sinon.stub().throws(),
                    circular: sinon.stub().throws(),
                    circularMatrix: sinon.stub().throws()
                }
            });

            let color1 = {x: 0, r: 255, g: 0, b: 0, a: 255};
            let color2 = {x: 0.25, r: 0, g: 255, b: 0, a: 255};
            let color3 = {x: 0.5, r: 0, g: 0, b: 255, a: 255};
            let color4 = {x: 1, r: 255, g: 255, b: 0, a: 255};

            it('should call correct method for linear gradient with stops', () => {

                G.createGradientFunction({colors: [color1]}, gradientFunctions)();

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

                G.createGradientFunction({colors: [color1]}, gradientFunctions)(1, 2);
            });

            it('should not modify the original data', () => {

                let colors = [color1];

                gradientFunctions.linear = (x, y, options) => {
                    expect(options.colors === colors).to.be.false;
                    expect(options.colors[0] === colors[0]).to.be.false;
                };

                G.createGradientFunction({colors: colors}, gradientFunctions)();
            });

            it('should have correct partial gradient function', () => {

                gradientFunctions.linear = (x, y, options) => {
                    expect(options.partialGradient === G.partialGradientWithStops).to.be.true;
                };

                G.createGradientFunction({colors: [color1]}, gradientFunctions)();
            });

            it('should sort by gradient stops', () => {

                gradientFunctions.linear = (x, y, options) => {
                    options.colors[0].should.eql(color1);
                    options.colors[1].should.eql(color2);
                    options.colors[2].should.eql(color3);
                    options.colors[3].should.eql(color4);
                };

                G.createGradientFunction({colors: [color3, color2, color4, color1]}, gradientFunctions)();
            });

            xit('should add missing stops to the right end', () => {

                gradientFunctions.linear = (x, y, options) => {
                    options.colors[0].should.eql(color1);
                    options.colors[1].should.eql(color2);
                    options.colors[2].should.eql({x: 1, r: 0, g: 255, b: 0, a: 255});
                };

                G.createGradientFunction({colors: [color1, color2]}, gradientFunctions)();
            });
        });
    });

    xdescribe('twoStopGradient', () => {

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
