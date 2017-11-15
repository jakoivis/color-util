import chai from 'chai';
import HslString from '../../src/types/HslString';

chai.should();
let expect = require('chai').expect;

describe('HslString', () => {

    it('test', () => {
        HslString.test(0xAABBCC).should.be.false;
        HslString.test('#aabbcc').should.be.false;
        HslString.test('rgba(170,187,204,1)').should.be.false;
        HslString.test({h: 0, s: 0, l: 0}).should.be.false;
        HslString.test('hsl(5, 10%, 20%)').should.be.true;
        HslString.test('hsla(5, 10%, 20%)').should.be.true;
        HslString.test('hsla(5, 10%, 20%, 0.5)').should.be.false;
        HslString.test('hsla(5, 10, 20, 0.5)').should.be.false;
        HslString.test('hsla(5, 10)').should.be.false;
        HslString.test('hsla(5, 10%, 20%, 0,5)').should.be.false;
        HslString.test('hsl(5.1, 10%, 20%)').should.be.false;
    });

    it('toHsl', () => {
        HslString.to.hsl('hsl(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});
        HslString.to.hsl('hsla(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});

        expect(HslString.to.hsl('hsl(180, 50, 60, 0.5)')).to.be.null;
    });
});