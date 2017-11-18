import chai from 'chai';
import Int from '../../src/types/Int';

chai.should();
let expect = require('chai').expect;

describe('Int', () => {

    it('test', () => {
        Int.test(0xFFFFFF).should.be.true;
        Int.test(0).should.be.true;
        Int.test(0x1000000).should.be.false;
        Int.test(-350456).should.be.false;
        Int.test('#aabbcc').should.be.false;
        Int.test('rgba(170,187,204,1)').should.be.false;
        Int.test({r: 170, g: 187, b: 204, a: 255}).should.be.false;
    });

    it('rgb', () => {
        Int.to.rgb(0xAABBCC).should.eql({r: 170, g: 187, b: 204, a: 255});
        Int.to.rgb(0xAABBCC, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
        Int.to.rgb(0xAABBCC, 10).should.eql({r: 170, g: 187, b: 204, a: 10});
    });

    it('hex', () => {
        Int.to.hex(0xAABBCC).should.equal('#aabbcc');
        Int.to.hex(0x00bb00).should.equal('#00bb00');
    });

    it('cssrgb', () => {
        Int.to.cssrgb(0xAABBCC).should.equal('rgb(170,187,204)');
    });

    it('cssrgba', () => {
        Int.to.cssrgba(0xAABBCC).should.equal('rgba(170,187,204,1)');
        Int.to.cssrgba(0xAABBCC, 0).should.equal('rgba(170,187,204,0)');
        Int.to.cssrgba(0xAABBCC, 0.1).should.equal('rgba(170,187,204,0.1)');
    });
});