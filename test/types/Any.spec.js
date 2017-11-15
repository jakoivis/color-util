import chai from 'chai';
import Any from '../../src/types/Any';

chai.should();
let expect = require('chai').expect;

describe('Any', () => {

    it('should throw with incorrect color format', () => {
        expect(() => {
            Any.to.rgb({h:0, s:0, x:0});
        }).to.throw;

        expect(() => {
            Any.to.toRgb('#qwe');
        }).to.throw;
    });

    let tolerance = 0.00000000001;

    let rgb = {r: 0xAA, g: 0xBB, b: 0xCC, a:0xFF};
    let hsl = {h: 0.5833333333333334, s: 0.2500000000000002, l: 0.7333333333333334, a: 1};
    let hsv = {h: 0.5833333333333334, s: 0.16666666666666677, v: 0.8, a: 1};

    it('should return same color if target is same as color', () => {
        Any.to.rgb(rgb).should.equal(rgb);
        Any.to.int(0xAABBCC).should.equal(0xAABBCC);
        Any.to.hex("#AABBCC").should.equal("#AABBCC");
        Any.to.rgbString('rgb(0,0,0)').should.equal('rgb(0,0,0)');
        Any.to.hsl(hsl).should.equal(hsl);
        Any.to.hsv(hsv).should.equal(hsv);
    });

    it('should do rgb type conversions', () => {
        Any.to.rgb(0xAABBCC).should.eql(rgb);
        Any.to.rgb('#AABBCC').should.eql(rgb);
        Any.to.rgb('rgba(170,187,204,1)').should.eql(rgb);
        Any.to.int('#AABBCC').should.eql(0xAABBCC);
        Any.to.int('rgba(170,187,204,1)').should.eql(0xAABBCC);
        Any.to.int(rgb).should.eql(0xAABBCC);
        Any.to.hex(0xAABBCC).should.eql("#aabbcc");
        Any.to.hex('rgba(170,187,204,1)').should.eql("#aabbcc");
        Any.to.hex(rgb).should.eql("#aabbcc");
        Any.to.rgbString({r: 0xAA, g: 0xBB, b: 0xCC, a:0xFF}).should.eql('rgb(170,187,204)');
        Any.to.rgbString(0xAABBCC).should.eql('rgb(170,187,204)');
        Any.to.rgbString('#AABBCC').should.eql('rgb(170,187,204)');
        Any.to.rgbaString(rgb).should.eql('rgba(170,187,204,1)');
        Any.to.rgbaString(0xAABBCC).should.eql('rgba(170,187,204,1)');
        Any.to.rgbaString('#AABBCC').should.eql('rgba(170,187,204,1)');
    });

    it('should do hsl -> rgb conversion', () => {
        let actual = Any.to.rgb(hsl);

        actual.r.should.be.closeTo(rgb.r, tolerance);
        actual.g.should.be.closeTo(rgb.g, tolerance);
        actual.b.should.be.closeTo(rgb.b, tolerance);
        actual.a.should.equal(rgb.a);
    });

    it('should do hsv -> rgb conversion', () => {
        let actual = Any.to.rgb(hsv);

        actual.r.should.be.closeTo(rgb.r, tolerance);
        actual.g.should.be.closeTo(rgb.g, tolerance);
        actual.b.should.be.closeTo(rgb.b, tolerance);
        actual.a.should.equal(255);
    });

    it('should do rgb -> hsl conversion', () => {
        let actual = Any.to.hsl(rgb);

        actual.h.should.be.closeTo(hsl.h, tolerance);
        actual.s.should.be.closeTo(hsl.s, tolerance);
        actual.l.should.be.closeTo(hsl.l, tolerance);
        actual.a.should.equal(hsl.a);
    });

    it('should do rgb -> hsv conversion', () => {
        Any.to.hsv(rgb).should.eql(hsv);
    });

    it('should do hsl -> rgb sub type conversion', () => {
        Any.to.int(hsl).should.equal(0xAABBCC);
        Any.to.hex(hsl).should.equal('#aabbcc');
        Any.to.rgbString(hsl).should.equal('rgb(170,187,204)');
        Any.to.rgbaString(hsl).should.equal('rgba(170,187,204,1)');
    });

    it('should do hsl subtype -> hsv conversion', () => {
        let actual = Any.to.hsv('hsl(180, 50%, 60%)')

        actual.h.should.be.closeTo(0.5, tolerance);
        actual.s.should.be.closeTo(0.5, tolerance);
        actual.v.should.be.closeTo(0.8, tolerance);
        actual.a.should.equal(1, tolerance);
    });

    it('should do hsl subtype -> rgb sub type conversion', () => {
        Any.to.int('hsl(180, 50%, 60%)').should.equal(0x65CCCC);
        Any.to.hex('hsl(180, 50%, 60%)').should.equal("#65cccc");
        Any.to.rgbString('hsl(180, 50%, 60%)').should.equal('rgb(102,204,204)');
        Any.to.rgbaString('hsl(180, 50%, 60%)').should.equal('rgba(102,204,204,1)');
    });

    it('should do hsl subtype -> hsl subtype conversion', () => {
        Any.to.hslaString('hsl(180, 50%, 60%)').should.equal('hsla(180,50%,60%,1)');
        Any.to.hslString('hsla(180, 50%, 60%, 1)').should.equal('hsl(180,50%,60%)');
    });
});