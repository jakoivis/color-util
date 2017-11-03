
import chai from 'chai';
import Rgb from '../../src/types/Rgb.js';
import C from '../../src/ColorUtil.js';

chai.should();
let expect = require('chai').expect;

describe('Rgb', () => {

    describe('conversions', () => {

        it('test', () => {
            Rgb.test(0xAABBCC).should.be.false;
            Rgb.test('#aabbcc').should.be.false;
            Rgb.test('rgba(170,187,204,1)').should.be.false;
            Rgb.test({r: 170, g: 187, b: 204, a: 255}).should.be.true;
            Rgb.test({r: -1, g: 187, b: 204}).should.be.false;
            Rgb.test({r: 256, g: 187, b: 204}).should.be.false;
            Rgb.test({h: 170, s: 187, l: 204}).should.be.false;
        });

        it('toInt', () => {
            Rgb.toInt({r: 170, g: 187, b: 204, a: 255}).should.equal(0xAABBCC);
            Rgb.toInt({r: 170.1, g: 187.5, b: 204.9, a: 255}).should.equal(0xAABBCC);
        });

        it('toHex', () => {
            Rgb.toHex({r: 170, g: 187, b: 204, a: 255}).should.equal('#aabbcc');
            Rgb.toHex({r: 0, g: 187, b: 0}).should.equal('#00bb00');
            Rgb.toHex({r: 0, g: 187, b: 0.56}).should.equal('#00bb00');
        });

        it('toRgbString', () => {
            Rgb.toRgbString({r: 170, g: 187, b: 204}).should.equal('rgb(170,187,204)');
            Rgb.toRgbString({r: 170.1, g: 187.1, b: 204.1}).should.equal('rgb(170,187,204)');
        });

        it('toRgbaString', () => {
            Rgb.toRgbaString({r: 170, g: 187, b: 204, a: 127.5}).should.equal('rgba(170,187,204,0.5)');
            Rgb.toRgbaString({r: 170, g: 187, b: 204}).should.equal('rgba(170,187,204,NaN)');
            Rgb.toRgbaString({r: 170.1, g: 187.1, b: 204.1, a: 255}).should.equal('rgba(170,187,204,1)');
        });

        it('toUint32', () => {
            Rgb.toUint32({r: 170, g: 187, b: 204, a: 255}).should.equal(0xFFCCBBAA);
            Rgb.toUint32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
            Rgb.toUint32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
            Rgb.toUint32({r: 170, g: 187, b: 204}).should.equal(0x00CCBBAA);
            Rgb.toUint32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0x00CCBBAA);
        });

        it('toUint32b', () => {
            Rgb.toUint32b({r: 170, g: 187, b: 204, a: 255}).should.equal(0xAABBCCFF);
            Rgb.toUint32b({r: 170, g: 187, b: 204, a: 85}).should.equal(0xAABBCC55);
            Rgb.toUint32b({r: 170, g: 187, b: 204}).should.equal(0xAABBCC00);
            Rgb.toUint32b({r: 170, g: 187, b: 204, a: 0}).should.equal(0xAABBCC00);
            Rgb.toUint32b({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0xAABBCC00);
        });

        it('toInt32', () => {
            Rgb.toInt32({r: 170, g: 187, b: 204, a: 255}).should.equal(-3359830); // 0xFFCCBBAA
            Rgb.toInt32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
            Rgb.toInt32({r: 170, g: 187, b: 204}).should.equal(0x00CCBBAA);
            Rgb.toInt32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
            Rgb.toInt32({r: 170, g: NaN, b: 204, a: NaN}).should.equal(0x00CC00AA);
        });

        it('toInt32b', () => {
            let AABBCCFF = -1430532865;
            let AABBCC55 = -1430533035
            let AABBCC00 = -1430533120;
            let AA00CC00 = -1442788352;

            Rgb.toInt32b({r: 170, g: 187, b: 204, a: 255}).should.equal(AABBCCFF);
            Rgb.toInt32b({r: 170, g: 187, b: 204, a: 85}).should.equal(AABBCC55);
            Rgb.toInt32b({r: 170, g: 187, b: 204, a: 0}).should.equal(AABBCC00);
            Rgb.toInt32b({r: 170, g: 187, b: 204}).should.equal(AABBCC00);
            Rgb.toInt32b({r: 170, g: NaN, b: 204, a: NaN}).should.equal(AA00CC00);
        });

        it('toHsl', () => {
            Rgb.toHsl({r: 0, g: 0, b: 0}).should.eql({h:0, s: 0, l:0, a:1});
            Rgb.toHsl({r: 255, g: 255, b: 255}).should.eql({h:0, s: 0, l:1, a:1});
            Rgb.toHsl({r: 255, g: 0, b: 0}).should.eql({h:0, s: 1, l:0.5, a:1});
            Rgb.toHsl({r: 0, g: 255, b: 0}).should.eql({h:1/3, s: 1, l:0.5, a:1});
            Rgb.toHsl({r: 0, g: 0, b: 255}).should.eql({h:2/3, s: 1, l:0.5, a:1});
            Rgb.toHsl({r: 255, g: 255, b: 0}).should.eql({h:1/6, s: 1, l:0.5, a:1});
            Rgb.toHsl({r: 192, g: 192, b: 192}).should.eql({h:0, s: 0, l:0.7529411764705882, a:1});
            Rgb.toHsl({r: 128, g: 0, b: 0}).should.eql({h:0, s: 1, l:0.25098039215686274, a:1});
            Rgb.toHsl({r: 128, g: 128, b: 0}).should.eql({h:1/6, s: 1, l:0.25098039215686274, a:1});
            Rgb.toHsl({r: 128, g: 0, b: 128}).should.eql({h:5/6, s: 1, l:0.25098039215686274, a:1});
            Rgb.toHsl({r: 0, g: 0, b: 128}).should.eql({h:2/3, s: 1, l:0.25098039215686274, a:1});
            Rgb.toHsl({r: 0, g: 0, b: 0, a:85}).should.eql({h:0, s: 0, l:0, a:0.3333333333333333});
            Rgb.toHsl({r: 255, g: 0, b: 120}).should.eql({h:0.9215686274509803, s: 1, l: 0.5, a:1});
        });

        it('toHsv', () => {
            Rgb.toHsv({r: 0, g: 0, b: 0}).should.eql({h:0, s: 0, v:0, a:1});
            Rgb.toHsv({r: 255, g: 255, b: 255}).should.eql({h:0, s: 0, v:1, a:1});
            Rgb.toHsv({r: 255, g: 0, b: 0}).should.eql({h:0, s: 1, v:1, a:1});
            Rgb.toHsv({r: 0, g: 255, b: 0}).should.eql({h:2/6, s: 1, v:1, a:1});
            Rgb.toHsv({r: 0, g: 0, b: 255}).should.eql({h:4/6, s: 1, v:1, a:1});
            Rgb.toHsv({r: 255, g: 255, b: 0}).should.eql({h:1/6, s: 1, v:1, a:1});
            Rgb.toHsv({r: 192, g: 192, b: 192}).should.eql({h:0, s: 0, v:0.7529411764705882, a:1});
            Rgb.toHsv({r: 128, g: 0, b: 0}).should.eql({h:0, s: 1, v:0.5019607843137255, a:1});
            Rgb.toHsv({r: 128, g: 128, b: 0}).should.eql({h:1/6, s: 1, v:0.5019607843137255, a:1});
            Rgb.toHsv({r: 128, g: 0, b: 128}).should.eql({h:5/6, s: 1, v:0.5019607843137255, a:1});
            Rgb.toHsv({r: 0, g: 0, b: 128}).should.eql({h:4/6, s: 1, v:0.5019607843137255, a:1});
            Rgb.toHsv({r: 0, g: 0, b: 0, a:85}).should.eql({h:0, s: 0, v:0, a:0.3333333333333333});
            Rgb.toHsv({r: 255, g: 0, b: 120}).should.eql({h:0.9215686274509803, s: 1, v: 1, a:1});
        });
    });

    describe('hue', () => {

        it('should return red', () => {
            Rgb.hue({r:0xFF, g: 0, b:0}).should.eql({r:0xFF, g: 0, b:0, a: 0xFF});
        });

        it('should return hue', () => {
            Rgb.hue({r:0x7F, g: 0x7F, b:0}).should.eql({r:0xFF, g: 0xFF, b:0, a: 0xFF});
        });
    });

    describe('linear gradient', () => {

        it('should get color from 1 point gradient', () => {
            let fn = createBasicIntTestFunction([0x00FF7F]);
            fn(0.5, 0).should.equal(0x00FF7F);
        });

        it('should get color from 2 point gradient', () => {
            let fn = createBasicIntTestFunction([0x00FF7F, 0xFF00FF]);

            fn(0, 0).should.equal(0x00FF7F);
            fn(1, 0).should.equal(0xFF00FF);
            fn(0.25, 0).should.equal(0x3FBF9F);
            fn(0.5, 0).should.equal(0x7F7FBF);
            fn(0.75, 0).should.equal(0xBF3FDF);
        });

        it('should get color from 3 point gradient', () => {
            let fn = createBasicIntTestFunction([0x000000, 0x7F7F7F, 0xFFFFFF]);

            fn(0, 0).should.equal(0x0);
            fn(1, 0).should.equal(0xFFFFFF);
            fn(0.25, 0).should.equal(0x3F3F3F);
            fn(0.5, 0).should.equal(0x7F7F7F);
            fn(0.75, 0).should.equal(0xBFBFBF);
        });

        it('should get color from 4 point gradient', () => {
            let fn = createBasicIntTestFunction([0xFFFFFF, 0x0, 0x0, 0x0]);
            fn(0, 0).should.equal(0xFFFFFF); // first color

            fn = createBasicIntTestFunction([0x0, 0x0, 0x0, 0xFFFFFF]);
            fn(1, 0).should.equal(0xFFFFFF); // last color

            fn = createBasicIntTestFunction([0x0, 0xFFFFFF, 0x7F7F7F, 0x7F7F7F]);
            fn(0.25, 0).should.equal(0xBFBFBF); // 75% between colors 0 and 1

            fn = createBasicIntTestFunction([0x0, 0xFFFFFF, 0x7F7F7F, 0x0]);
            fn(0.5, 0).should.equal(0xBFBFBF); // 50% beween colors 1 and 2

            fn = createBasicIntTestFunction([0x0, 0x0, 0x7F7F7F, 0xFFFFFF]);
            fn(0.75, 0).should.equal(0x9F9F9F); // 25% between colors 2 and 3
        });

        it('should return edge colors when value is out of range', () => {
            let fn = createBasicIntTestFunction([0x00FF7F, 0xFF00FF], {
                repeatX: C.Repeat.stop});

            fn(2, 0).should.equal(0xFF00FF);
            fn(-2, 0).should.equal(0x00FF7F);
        });

        it('should get color from 1 point gradient', () => {
            let fn = Rgb.createGradient({colors: [
                {x: 0, r: 0, g: 0xff, b: 0x7f, a: 0xff},
            ]});

            fn(0.5, 0).should.eql({r: 0, g: 0xff, b: 0x7f, a: 0xff});
        });

        it('should get color from 2 point gradient with stops', () => {
            let fn = Rgb.createGradient({colors: [
                {x: 0, r: 0, g: 0xff, b: 0x7f, a: 0xff},
                {x: 1, r: 0xff, g: 0, b: 0xff, a: 0xff}
            ]});

            fn(0, 0).should.eql({r: 0, g: 0xff, b: 0x7f, a: 0xff});
            fn(1, 0).should.eql({r: 0xff, g: 0, b: 0xff, a: 0xff});
            fn(0.25, 0).should.eql({r: 63.75, g: 191.25, b: 0x9f, a: 0xff});
        });

        it('should get color from 3 point gradient with stops', () => {
            let fn = Rgb.createGradient({colors: [
                {x: 0, r: 0, g: 0, b: 0, a: 0},
                {x: 0.25, r: 0x7f, g: 0x7f, b: 0x7f, a: 0x7f},
                {x: 1, r: 0xff, g: 0xff, b: 0xff, a: 0xff}
            ]});

            fn(0, 0).should.eql({r: 0, g: 0, b: 0, a: 0});
            fn(1, 0).should.eql({r: 0xff, g: 0xff, b: 0xff, a: 0xff});
            fn(0.25, 0).should.eql({r: 0x7f, g: 0x7f, b: 0x7f, a: 0x7f});
            fn(0.125, 0).should.eql({r: 63.5, g: 63.5, b: 63.5, a: 63.5});
            fn(0.625, 0).should.eql({r: 191, g: 191, b: 191, a: 191});
        });
    });

    describe('getGradientMatrixColor', () => {

        let matrix = [
            [0xFF0000, 0x0000FF],
            [0x000000, 0x00FF00]
        ];

        let fn = createBasicIntTestFunction(matrix);

        it('should get left corner color', () => {
            fn(0, 0).should.equal(0xFF0000);
        });

        it('should get right corner color', () => {
            fn(1, 0).should.equal(0x0000FF);
        });

        it('should get bottom right corner color', () => {
            fn(1, 1).should.equal(0x00FF00);
        });

        it('should get bottom left corner color', () => {
            fn(0, 1).should.equal(0x000000);
        });

        it('should get bottom center color', () => {
            fn(0.5, 1).should.equal(0x007f00);
        });

        it('should get right center color', () => {
            fn(1, 0.5).should.equal(0x007f7f);
        });
    });

    function createBasicIntTestFunction(colors, additionalOptions) {
        let rgbColors = C.convert(colors, C.int.toRgb);

        additionalOptions = additionalOptions || {};

        let gradientFn = Rgb.createGradient(
            Object.assign({colors:rgbColors}, additionalOptions));

        return (x, y) => {
            return Rgb.toInt(gradientFn(x, y));
        }
    }
});