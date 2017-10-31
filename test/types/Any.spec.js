import chai from 'chai';
import Any from '../../src/types/Any';

chai.should();
let expect = require('chai').expect;

describe('Any', () => {

    it('should throw with incorrect color format', () => {
        expect(() => {
            Any.toRgb({h:0, s:0, x:0});
        }).to.throw;

        expect(() => {
            Any.toRgb('#qwe');
        }).to.throw;
    });

    let tolerance = 0.00000000001;

    let rgb = {r: 0xAA, g: 0xBB, b: 0xCC, a:0xFF};
    let hsl = {h: 0.5833333333333334, s: 0.2500000000000002, l: 0.7333333333333334, a: 1};
    let hsv = {h: 0.5833333333333334, s: 0.16666666666666677, v: 0.8, a: 1};

    it('should return same color if target is same as color', () => {
        Any.toRgb(rgb).should.equal(rgb);
        Any.toInt(0xAABBCC).should.equal(0xAABBCC);
        Any.toHex("#AABBCC").should.equal("#AABBCC");
        Any.toRgbString('rgb(0,0,0)').should.equal('rgb(0,0,0)');
        Any.toHsl(hsl).should.equal(hsl);
        Any.toHsv(hsv).should.equal(hsv);
    });

    it('should do rgb type conversions', () => {
        Any.toRgb(0xAABBCC).should.eql(rgb);
        Any.toRgb('#AABBCC').should.eql(rgb);
        Any.toRgb('rgba(170,187,204,1)').should.eql(rgb);
        Any.toInt('#AABBCC').should.eql(0xAABBCC);
        Any.toInt('rgba(170,187,204,1)').should.eql(0xAABBCC);
        Any.toInt(rgb).should.eql(0xAABBCC);
        Any.toHex(0xAABBCC).should.eql("#aabbcc");
        Any.toHex('rgba(170,187,204,1)').should.eql("#aabbcc");
        Any.toHex(rgb).should.eql("#aabbcc");
        Any.toRgbString({r: 0xAA, g: 0xBB, b: 0xCC, a:0xFF}).should.eql('rgb(170,187,204)');
        Any.toRgbString(0xAABBCC).should.eql('rgb(170,187,204)');
        Any.toRgbString('#AABBCC').should.eql('rgb(170,187,204)');
        Any.toRgbaString(rgb).should.eql('rgba(170,187,204,1)');
        Any.toRgbaString(0xAABBCC).should.eql('rgba(170,187,204,1)');
        Any.toRgbaString('#AABBCC').should.eql('rgba(170,187,204,1)');
    });

    it('should do hsl -> rgb conversion', () => {
        let actual = Any.toRgb(hsl);

        actual.r.should.be.closeTo(rgb.r, tolerance);
        actual.g.should.be.closeTo(rgb.g, tolerance);
        actual.b.should.be.closeTo(rgb.b, tolerance);
        actual.a.should.equal(rgb.a);
    });

    it('should do hsv -> rgb conversion', () => {
        let actual = Any.toRgb(hsv);

        actual.r.should.be.closeTo(rgb.r, tolerance);
        actual.g.should.be.closeTo(rgb.g, tolerance);
        actual.b.should.be.closeTo(rgb.b, tolerance);
        actual.a.should.equal(255);
    });

    it('should do rgb -> hsl conversion', () => {
        let actual = Any.toHsl(rgb);

        actual.h.should.be.closeTo(hsl.h, tolerance);
        actual.s.should.be.closeTo(hsl.s, tolerance);
        actual.l.should.be.closeTo(hsl.l, tolerance);
        actual.a.should.equal(hsl.a);
    });

    it('should do rgb -> hsv conversion', () => {
        Any.toHsv(rgb).should.eql(hsv);
    });

    it('should do hsl -> rgb sub type conversion', () => {
        Any.toInt(hsl).should.equal(0xAABBCC);
        Any.toHex(hsl).should.equal('#aabbcc');
        Any.toRgbString(hsl).should.equal('rgb(170,187,204)');
        Any.toRgbaString(hsl).should.equal('rgba(170,187,204,1)');
    });

    it('should do hsl subtype -> hsv conversion', () => {
        let actual = Any.toHsv('hsl(180, 50%, 60%)')

        actual.h.should.be.closeTo(0.5, tolerance);
        actual.s.should.be.closeTo(0.5, tolerance);
        actual.v.should.be.closeTo(0.8, tolerance);
        actual.a.should.equal(1, tolerance);
    });

    it('should do hsl subtype -> rgb sub type conversion', () => {
        Any.toInt('hsl(180, 50%, 60%)').should.equal(0x65CCCC);
        Any.toHex('hsl(180, 50%, 60%)').should.equal("#65cccc");
        Any.toRgbString('hsl(180, 50%, 60%)').should.equal('rgb(102,204,204)');
        Any.toRgbaString('hsl(180, 50%, 60%)').should.equal('rgba(102,204,204,1)');
    });

    it('should do hsl subtype -> hsl subtype conversion', () => {
        Any.toHslaString('hsl(180, 50%, 60%)').should.equal('hsla(180,50%,60%,1)');
        Any.toHslString('hsla(180, 50%, 60%, 1)').should.equal('hsl(180,50%,60%)');
    });
});