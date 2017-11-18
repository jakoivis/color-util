import chai from 'chai';
import Csshsla from '../../src/types/Csshsla';

chai.should();
let expect = require('chai').expect;

describe('Csshsla', () => {

    it('test', () => {
        Csshsla.test(0xAABBCC).should.be.false;
        Csshsla.test('#aabbcc').should.be.false;
        Csshsla.test('rgba(170,187,204,1)').should.be.false;
        Csshsla.test({h: 0, s: 0, l: 0}).should.be.false;
        Csshsla.test('hsl(5, 10%, 20%)').should.be.false;
        Csshsla.test('hsla(5, 10%, 20%)').should.be.false;
        Csshsla.test('hsla(5, 10%, 20%, 0.5)').should.be.true;
        Csshsla.test('hsla(5, 10, 20, 0.5)').should.be.false;
        Csshsla.test('hsla(5, 10)').should.be.false;
        Csshsla.test('hsla(5, 10%, 20%, 0,5)').should.be.false;
        Csshsla.test('hsla(5.1, 10%, 20%, 0.5)').should.be.false;
    });

    it('hsl', () => {
        Csshsla.to.hsl('hsla(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});
        Csshsla.to.hsl('hsl(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});

        expect(Csshsla.to.hsl('hsl(180, 50, 60)')).to.be.null;
    });
});