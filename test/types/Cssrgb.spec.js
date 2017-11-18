import chai from 'chai';
import Cssrgb from '../../src/types/Cssrgb';

chai.should();
let expect = require('chai').expect;

describe('Cssrgb', () => {

    it('test', () => {
        Cssrgb.test(0xFFFFFF).should.be.false;
        Cssrgb.test({r: 170, g: 187, b: 204, a: 255}).should.be.false;
        Cssrgb.test('test').should.be.false;
        Cssrgb.test('rgba(0,0,0)').should.be.true;
        Cssrgb.test('rgba(0,0,0,0)').should.be.false;
        Cssrgb.test('rgb(0,0,0,0)').should.be.false;
        Cssrgb.test('rgb(0.1,0,0)').should.be.false;
        Cssrgb.test('rgb ( 0 , 0 , 0 )').should.be.true;
    });

    it('rgb', () => {
        Cssrgb.to.rgb('rgb(170,187,204)').should.eql({r: 170, g: 187, b: 204, a: 255});

        expect(Cssrgb.to.rgb('rgba(170,187,204,1)')).to.be.null;
    });

    it('int', () => {
        Cssrgb.to.int('rgb(170,187,204)').should.equal(11189196);

        expect(Cssrgb.to.int('rgba(170,187,204,1)')).to.be.null;
    });

    it('hex', () => {
        Cssrgb.to.hex('rgb(170,187,204)').should.equal('#aabbcc');

        expect(Cssrgb.to.hex('rgba(170,187,204,1)')).to.be.null;
    });
});