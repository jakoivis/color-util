
import sinon from 'sinon';
import chai from 'chai';
import GradientDataUtil from '../../src/gradientData/GradientDataUtil.js';

chai.should();
let expect = require('chai').expect;

describe('GradientDataUtil', () => {

    describe('addDefaultColorsForMatrix', () => {

        it('should add default colors', () => {

            let data = [
                {
                    colors: [
                        {r: 1, g: 0},
                        {x:0}
                    ]
                },
                {
                    colors: [
                        {r: 1, g: 0},
                        {x:0}
                    ]
                }
            ];

            let defaultColor = {r: 255, g: 255, b: 255};

            GradientDataUtil.addDefaultColorsForMatrix(data, defaultColor);

            data[0].colors[0].r.should.equal(1);
            data[0].colors[0].g.should.equal(0);
            data[0].colors[0].b.should.equal(255);

            data[0].colors[1].r.should.equal(255);
            data[0].colors[1].g.should.equal(255);
            data[0].colors[1].b.should.equal(255);
            data[0].colors[1].x.should.equal(0);

            data[1].colors[0].r.should.equal(1);
            data[1].colors[0].g.should.equal(0);
            data[1].colors[0].b.should.equal(255);

            data[1].colors[1].r.should.equal(255);
            data[1].colors[1].g.should.equal(255);
            data[1].colors[1].b.should.equal(255);
            data[1].colors[1].x.should.equal(0);
        });
    });

    describe('addDefaultColors', () => {

        it('should add default colors', () => {

            let data = [
                {r: 1, g: 0},
                {x:0}
            ];

            let defaultColor = {r: 255, g: 255, b: 255};

            GradientDataUtil.addDefaultColors(data, defaultColor);

            data[0].r.should.equal(1);
            data[0].g.should.equal(0);
            data[0].b.should.equal(255);

            data[1].r.should.equal(255);
            data[1].g.should.equal(255);
            data[1].b.should.equal(255);
            data[1].x.should.equal(0);
        });
    });
});
