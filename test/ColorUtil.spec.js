
import chai from 'chai';
import C from '../src/ColorUtil.js';

chai.should();
let expect = require('chai').expect;

describe('ColorUtil', () => {

    describe('conversion functions combinations', () => {

        it('rgb-hsl-rgb', () => {
            let rgb = {r: 255, g: 255, b: 0, a:255};
            let hsl = {h: 1/6, s: 1, l: 0.5, a: 1};

            let rgbToHsl = C.rgb.toHsl(rgb);
            rgbToHsl.should.eql(hsl);

            let hslToRgb = C.hsl.toRgb(hsl);
            hslToRgb.should.eql(rgb);
        });

        it('rgb-hsv-rgb', () => {
            let rgb = {r: 255, g: 255, b: 0, a:255};
            let hsv = {h: 1/6, s: 1, v: 1, a: 1};

            let rgbToHsv = C.rgb.toHsv(rgb);
            rgbToHsv.should.eql(hsv);

            let hsvToRgb = C.hsv.toRgb(hsv);
            hsvToRgb.should.eql(rgb);
        });
    });

    describe('convert', () => {

        it('should convert single color with one conversion', () => {
            C.convert(0xFF0000, C.int.toHex).should.equal("#ff0000");
        });

        it('should convert single color with two conversions', () => {
            C.convert(0xFF0000, C.int.toHex, C.hex.toInt).should.equal(0xFF0000);
        });

        it('should convert array of colors with one conversion', () => {
            C.convert([0xFF0000, 0x00FF00], C.int.toHex)
                .should.eql(["#ff0000", "#00ff00"]);
        });

        it('should convert array of colors with two conversions', () => {
            C.convert([0xFF0000, 0x00FF00], C.int.toHex, C.hex.toInt)
                .should.eql([0xFF0000, 0x00FF00]);
        });

        it('should convert matrix of colors with one conversion', () => {
            C.convert([[0xFF0000, 0x00FF00], 0x0000FF], C.int.toHex)
                .should.eql([["#ff0000", "#00ff00"], "#0000ff"]);
        });

        it('should convert matrix of colors with two conversions', () => {
            C.convert([[0xFF0000, 0x00FF00], 0x0000FF], C.int.toHex, C.hex.toInt)
                .should.eql([[0xFF0000, 0x00FF00], 0x0000FF]);
        });
    });
});