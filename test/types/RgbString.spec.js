import chai from 'chai';
import RgbString from '../../src/types/RgbString';

chai.should();
let expect = require('chai').expect;

describe('RgbString', () => {

    it('test', () => {
        RgbString.test(0xFFFFFF).should.be.false;
        RgbString.test({r: 170, g: 187, b: 204, a: 255}).should.be.false;
        RgbString.test('test').should.be.false;
        RgbString.test('rgba(0,0,0)').should.be.true;
        RgbString.test('rgba(0,0,0,0)').should.be.false;
        RgbString.test('rgb(0,0,0,0)').should.be.false;
        RgbString.test('rgb(0.1,0,0)').should.be.false;
        RgbString.test('rgb ( 0 , 0 , 0 )').should.be.true;
    });

    it('toRgb', () => {
        RgbString.toRgb('rgb(170,187,204)').should.eql({r: 170, g: 187, b: 204, a: 255});

        expect(RgbString.toRgb('rgba(170,187,204,1)')).to.be.null;
    });

    it('toInt', () => {
        RgbString.toInt('rgb(170,187,204)').should.equal(11189196);

        expect(RgbString.toInt('rgba(170,187,204,1)')).to.be.null;
    });

    it('toHex', () => {
        RgbString.toHex('rgb(170,187,204)').should.equal('#aabbcc');

        expect(RgbString.toHex('rgba(170,187,204,1)')).to.be.null;
    });
});