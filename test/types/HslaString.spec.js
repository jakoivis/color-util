import chai from 'chai';
import HslaString from '../../src/types/HslaString';

chai.should();
let expect = require('chai').expect;

describe('HslaString', () => {

    it('test', () => {
        HslaString.test(0xAABBCC).should.be.false;
        HslaString.test('#aabbcc').should.be.false;
        HslaString.test('rgba(170,187,204,1)').should.be.false;
        HslaString.test({h: 0, s: 0, l: 0}).should.be.false;
        HslaString.test('hsl(5, 10%, 20%)').should.be.false;
        HslaString.test('hsla(5, 10%, 20%)').should.be.false;
        HslaString.test('hsla(5, 10%, 20%, 0.5)').should.be.true;
        HslaString.test('hsla(5, 10, 20, 0.5)').should.be.false;
        HslaString.test('hsla(5, 10)').should.be.false;
        HslaString.test('hsla(5, 10%, 20%, 0,5)').should.be.false;
        HslaString.test('hsla(5.1, 10%, 20%, 0.5)').should.be.false;
    });

    it('toHsl', () => {
        HslaString.toHsl('hsla(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});
        HslaString.toHsl('hsl(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});

        expect(HslaString.toHsl('hsl(180, 50, 60)')).to.be.null;
    });
});