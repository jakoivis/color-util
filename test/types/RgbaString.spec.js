import chai from 'chai';
import RgbaString from '../../src/types/RgbaString';

chai.should();
let expect = require('chai').expect;

describe('RgbaString', () => {

    it('test', () => {
        RgbaString.test(0xFFFFFF).should.be.false;
        RgbaString.test({r: 170, g: 187, b: 204, a: 255}).should.be.false;
        RgbaString.test('test').should.be.false;
        RgbaString.test('rgba(0,0,0)').should.be.false;
        RgbaString.test('rgba(0,0,0,0)').should.be.true;
        RgbaString.test('rgb(0,0,0,0)').should.be.true;
        RgbaString.test('rgb(0.1,0,0,0)').should.be.false;
        RgbaString.test('rgb ( 0 , 0 , 0 , 0 )').should.be.true;
        RgbaString.test('rgba ( 0 , 0 , 0 )').should.be.false;
        RgbaString.test('rgba ( 0 , 0 , 0, 0,1 )').should.be.false;
    });

    it('toRgb', () => {
        RgbaString.toRgb('rgba(170,187,204,1)').should.eql({r: 170, g: 187, b: 204, a: 255});
        RgbaString.toRgb('rgba(170,187,204,0)').should.eql({r: 170, g: 187, b: 204, a: 0});
        RgbaString.toRgb('rgba(170,187,204,0.1)').should.eql({r: 170, g: 187, b: 204, a: 25});

        expect(RgbaString.toRgb('rgba(170,187,204)')).to.be.null;
    });

    it('toInt', () => {
        RgbaString.toInt('rgba(170,187,204,1)').should.equal(11189196);
        RgbaString.toInt('rgba(170,187,204,0)').should.equal(11189196);
        RgbaString.toInt('rgba(170,187,204,0.1)').should.equal(11189196);

        expect(RgbaString.toInt('rgba(170,187,204)')).to.be.null;
    });

    it('toHex', () => {
        RgbaString.toHex('rgba(170,187,204,1)').should.equal('#aabbcc');
        RgbaString.toHex('rgba(170,187,204,0)').should.equal('#aabbcc');
        RgbaString.toHex('rgba(170,187,204,0.1)').should.equal('#aabbcc');

        expect(RgbaString.toHex('rgba(170,187,204)')).to.be.null;
    });
});