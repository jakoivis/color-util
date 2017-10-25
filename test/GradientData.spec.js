
import sinon from 'sinon';
import chai from 'chai';
import GradientData from '../src/GradientData.js';
import _ from '../src/Utils.js';

chai.should();
let expect = require('chai').expect;

describe.only('GradientData', () => {

    describe('createValidator', () => {

        it('should not accept invalida data structures', () => {

            expect(() => {
                GradientData.createValidator([]);
            }).to.throw('Argument should be and array with at least one item');

            expect(() => {
                GradientData.createValidator({});
            }).to.throw('Argument should be and array with at least one item');

            expect(() => {
                GradientData.createValidator([{colors:{}}]);
            }).to.throw('One sample was tested and it did not match any supported data structure');

            expect(() => {
                GradientData.createValidator([[]]);
            }).to.throw('One sample was tested and it did not match any supported data structure');
        });

        it('should return type DATA_STRUCTURE_OBJECTS', () => {

            let data = [{}];

            createValidator(data).should.equal(GradientData.DATA_STRUCTURE_OBJECTS);
        });

        it('should return type DATA_STRUCTURE_OBJECTS_WITH_COLORS', () => {

            let data = [{colors:[]}];

            createValidator(data).should.equal(GradientData.DATA_STRUCTURE_OBJECTS_WITH_COLORS);
        });

        it('should return type DATA_STRUCTURE_ARRAYS_WITH_OBJECTS', () => {

            let data = [[{}]];

            createValidator(data).should.equal(GradientData.DATA_STRUCTURE_ARRAYS_WITH_OBJECTS);
        });

        function createValidator(data) {

            return GradientData.createValidator(data).structureType;
        }
    });

    describe('verifyStructure', () => {

        describe('DATA_STRUCTURE_OBJECTS', () => {

            it('should accept structures', () => {

                verifyStructure([{}])
                    .should.equal(true);

                verifyStructure([{}, {}])
                    .should.equal(true);
            });

            it('should not accept structures', () => {

                expect(() => {
                    verifyStructure([{}, {colors:{}}]);
                }).to.throw('Color data structure is not consistent / valid');

                expect(() => {
                    verifyStructure([{}, 1]);
                }).to.throw('Color data structure is not consistent / valid');

                expect(() => {
                    verifyStructure([{}, []]);
                }).to.throw('Color data structure is not consistent / valid');
            });
        });

        function verifyStructure(data) {

            let validator = GradientData.createValidator(data);

            return GradientData.verifyStructure(data, validator);
        }

    });

    describe('validateStops', () => {

        describe('DATA_STRUCTURE_OBJECTS', () => {

            let color1, color2, color3, color4;

            beforeEach(() => {

                color1 = {r: 1, g: 2, b: 3, a: 4};
                color2 = {r: 11, g: 12, b: 13, a: 14};
                color3 = {r: 21, g: 22, b: 23, a: 24};
                color4 = {r: 31, g: 32, b: 33, a: 34};
            })

            it('should add stops for 1 point gradient', () => {

                let data = validateStops([color1]);

                data.length.should.equal(2);
                data[0].x.should.equal(0);
                data[1].x.should.equal(1);

                // verify new point is created with same identical colors
                data[0].r.should.equal(1);
                data[1].r.should.equal(1);
            });

            it('should add stops for 2 point gradient', () => {

                let data = validateStops([{}, {}]);

                data.length.should.equal(2);
                data[0].x.should.equal(0);
                data[1].x.should.equal(1);
            });

            it('should add stops for 3 point gradient', () => {

                let data = validateStops([{}, {}, {}]);

                data.length.should.equal(3);
                data[0].x.should.equal(0);
                data[1].x.should.equal(0.5);
                data[2].x.should.equal(1);
            });

            it('should add stops for 4 point gradient', () => {

                let data = validateStops([{}, {}, {}, {}]);

                data.length.should.equal(4);
                data[0].x.should.equal(0);
                data[1].x.should.equal(1/3);
                data[2].x.should.equal(2/3);
                data[3].x.should.equal(1);
            });

            it('should add missing stops (end-stops missing)', () => {

                let data = validateStops([color1, {x: 0.4}, color2]);

                data.length.should.equal(3);
                data[0].x.should.equal(0);
                data[1].x.should.equal(0.4);
                data[2].x.should.equal(1);

                data[0].r.should.equal(1);
                expect(data[1].r).to.equal(undefined);
                data[2].r.should.equal(11);
            });

            it('should add missing stops (end-stops + 1 missing)', () => {

                let data = validateStops([color1, color2, {x: 0.2}, color3, color4]);

                data.length.should.equal(5);
                data[0].x.should.equal(0);
                data[1].x.should.equal(0.1);
                data[2].x.should.equal(0.2);
                data[3].x.should.equal(0.2 + 0.4);
                data[4].x.should.equal(1);

                data[0].r.should.equal(1);
                data[1].r.should.equal(11);
                expect(data[2].r).to.equal(undefined);
                data[3].r.should.equal(21);
                data[4].r.should.equal(31);
            });

            it('should add missing stops (end-colors missing)', () => {

                let data = validateStops([{x: 0.2, r: 1}, color2, {x: 0.8, r: 21}]);

                data.length.should.equal(5);
                data[0].x.should.equal(0);
                data[1].x.should.equal(0.2);
                data[2].x.should.equal(0.5);
                data[3].x.should.equal(0.8);
                data[4].x.should.equal(1);

                data[0].r.should.equal(1);
                data[1].r.should.equal(1);
                data[2].r.should.equal(11);
                data[3].r.should.equal(21);
                data[4].r.should.equal(21);
            });

            // it('should add stops when some of the point have been assinged', () => {

            // });

            function validateStops(data) {

                let validator = GradientData.createValidator(data);

                return GradientData.validateStops(data, validator);
            }
        });
    });
});
