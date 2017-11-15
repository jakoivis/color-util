
import chai from 'chai';
import cu from '../src/ColorUtil.js';

chai.should();
let expect = require('chai').expect;

// just test that everything is accessible from this object

describe('cu', () => {

    it('color', () => {

        cu.color(0xff0000).hex.should.equal('#ff0000');
    });

    describe('conversions', () => {

        it('any', () => {

            cu.any.to.hex(0xff0000).should.equal('#ff0000');
        });

        it('hex', () => {

            cu.hex.to.int('#ff0000').should.equal(0xff0000);
        });

        it('hsl', () => {

            cu.hsl.to.rgb({h:0, s:1, l:0.5}).should.eql({r:255, g:0, b: 0, a: 255});
        });

        it('hslaString', () => {

            cu.hslaString.to.hsl('hsla(0,100%,50%,1)').should.eql({h:0, s:1, l:0.5, a:1});
        });

        it('hslString', () => {

            cu.hslString.to.hsl('hsl(0,100%,50%)').should.eql({h:0, s:1, l:0.5, a:1});
        });

        it('hsv', () => {

            cu.hsv.to.hsl({h:0, s:1, v:1}).should.eql({h:0, s:1, l:0.5, a:1});
        });

        it('int', () => {

            cu.int.to.hex(0xff0000).should.equal('#ff0000');
        });

        it('int32ABGR', () => {

            cu.int32ABGR.to.rgb(0xff000055).should.eql({r:0x55, g:0, b:0, a:255});
        });

        it('int32RGBA', () => {

            cu.int32RGBA.to.rgb(0x550000ff).should.eql({r:0x55, g:0, b:0, a:255});
        });

        it('rgb', () => {

            cu.rgb.to.int({r:255, g:0, b:0, a:255}).should.equal(0xff0000);
        });

        it('rgbaString', () => {

            cu.rgbaString.to.int('rgba(255,0,0,1)').should.equal(0xff0000);
        });

        it('rgbString', () => {

            cu.rgbString.to.int('rgb(255,0,0)').should.equal(0xff0000);
        });
    });

    describe('conversion combinations', () => {

        it('rgb-hsl-rgb', () => {
            let rgb = {r: 255, g: 255, b: 0, a:255};
            let hsl = {h: 1/6, s: 1, l: 0.5, a: 1};

            let rgbToHsl = cu.rgb.to.hsl(rgb);
            rgbToHsl.should.eql(hsl);

            let hslToRgb = cu.hsl.to.rgb(hsl);
            hslToRgb.should.eql(rgb);
        });

        it('rgb-hsv-rgb', () => {
            let rgb = {r: 255, g: 255, b: 0, a:255};
            let hsv = {h: 1/6, s: 1, v: 1, a: 1};

            let rgbToHsv = cu.rgb.to.hsv(rgb);
            rgbToHsv.should.eql(hsv);

            let hsvToRgb = cu.hsv.to.rgb(hsv);
            hsvToRgb.should.eql(rgb);
        });
    });

    describe('convert', () => {

        it('should convert single color with one conversion', () => {
            cu.convert(0xFF0000, cu.int.to.hex).should.equal("#ff0000");
        });

        it('should convert single color with two conversions', () => {
            cu.convert(0xFF0000, cu.int.to.hex, cu.hex.to.int).should.equal(0xFF0000);
        });

        it('should convert array of colors with one conversion', () => {
            cu.convert([0xFF0000, 0x00FF00], cu.int.to.hex)
                .should.eql(["#ff0000", "#00ff00"]);
        });

        it('should convert array of colors with two conversions', () => {
            cu.convert([0xFF0000, 0x00FF00], cu.int.to.hex, cu.hex.to.int)
                .should.eql([0xFF0000, 0x00FF00]);
        });

        it('should convert matrix of colors with one conversion', () => {
            cu.convert([[0xFF0000, 0x00FF00], 0x0000FF], cu.int.to.hex)
                .should.eql([["#ff0000", "#00ff00"], "#0000ff"]);
        });

        it('should convert matrix of colors with two conversions', () => {
            cu.convert([[0xFF0000, 0x00FF00], 0x0000FF], cu.int.to.hex, cu.hex.to.int)
                .should.eql([[0xFF0000, 0x00FF00], 0x0000FF]);
        });
    });

});