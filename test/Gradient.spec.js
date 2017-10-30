
import sinon from 'sinon';
import chai from 'chai';
import G from '../src/Gradient.js';
import C from '../src/ColorUtil.js';

chai.should();
let expect = require('chai').expect;

describe('Gradient', () => {

    describe('createGradient', () => {

        it('should not validate data structure by default', () => {

            G.createGradient({
                colors: [{}, []]
            });
        });

        it('should validate when specified explicitly', () => {

            expect(() => {
                G.createGradient({
                    colors: [{}, []],
                    verifyStructure: true
                });
            }).to.throw('Color data structure is not consistent / valid');
        });

        it('should add color stops by default', () => {

            G.createGradient({
                colors: [{}],
                onValidationComplete: (colors) => {
                    colors.length.should.equal(2);
                    colors[0].x.should.equal(0);
                    colors[1].x.should.equal(1);
                }
            });
        });

        it('should not add colors stops when explicitly specified', () => {

            G.createGradient({
                colors: [{}],
                onValidationComplete: (colors) => {
                    colors.length.should.equal(1);
                    expect(colors[0].x).to.equal(undefined);
                },
                validateStops: false
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

    describe('partialGradientWithStops', function() {

        it('should calculate gradient from 2 point gradient', () => {

            let colors = [{x:0}, {x:1}];
            var result = G.partialGradientWithStops(colors, 0.25, 'x');

            result.item1.should.eql({x:0});
            result.item2.should.eql({x:1});
            result.position.should.equal(0.25);

            result = G.partialGradientWithStops(colors, 0.25, 'x');
        });

        it('should calculate gradietn from 3 point gradient', () => {

            var colors = [{x:0},{x:0.25},{x:1}];
            var result = G.partialGradientWithStops(colors, 0, 'x');
            result.item1.should.eql({x:0});
            result.item2.should.eql({x:0});
            result.position.should.equal(0);

            result = G.partialGradientWithStops(colors, 0.125, 'x');
            result.item1.should.eql({x:0});
            result.item2.should.eql({x:0.25});
            result.position.should.equal(0.5);

            result = G.partialGradientWithStops(colors, 0.25, 'x');
            result.item1.should.eql({x:0});
            result.item2.should.eql({x:0.25});
            result.position.should.equal(1);

            result = G.partialGradientWithStops(colors, 1, 'x');
            result.item1.should.eql({x:0.25});
            result.item2.should.eql({x:1});
            result.position.should.equal(1);
        });
    });

});
