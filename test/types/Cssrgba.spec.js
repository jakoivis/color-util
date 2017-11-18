import chai from 'chai';
import Cssrgba from '../../src/types/Cssrgba';

chai.should();
let expect = require('chai').expect;

describe('Cssrgba', () => {

    it('test', () => {
        Cssrgba.test(0xFFFFFF).should.be.false;
        Cssrgba.test({r: 170, g: 187, b: 204, a: 255}).should.be.false;
        Cssrgba.test('test').should.be.false;
        Cssrgba.test('rgba(0,0,0)').should.be.false;
        Cssrgba.test('rgba(0,0,0,0)').should.be.true;
        Cssrgba.test('rgb(0,0,0,0)').should.be.true;
        Cssrgba.test('rgb(0.1,0,0,0)').should.be.false;
        Cssrgba.test('rgb ( 0 , 0 , 0 , 0 )').should.be.true;
        Cssrgba.test('rgba ( 0 , 0 , 0 )').should.be.false;
        Cssrgba.test('rgba ( 0 , 0 , 0, 0,1 )').should.be.false;
    });

    it('rgb', () => {
        Cssrgba.to.rgb('rgba(170,187,204,1)').should.eql({r: 170, g: 187, b: 204, a: 255});
        Cssrgba.to.rgb('rgba(170,187,204,0)').should.eql({r: 170, g: 187, b: 204, a: 0});
        Cssrgba.to.rgb('rgba(170,187,204,0.1)').should.eql({r: 170, g: 187, b: 204, a: 25});

        expect(Cssrgba.to.rgb('rgba(170,187,204)')).to.be.null;
    });

    it('int', () => {
        Cssrgba.to.int('rgba(170,187,204,1)').should.equal(11189196);
        Cssrgba.to.int('rgba(170,187,204,0)').should.equal(11189196);
        Cssrgba.to.int('rgba(170,187,204,0.1)').should.equal(11189196);

        expect(Cssrgba.to.int('rgba(170,187,204)')).to.be.null;
    });

    it('hex', () => {
        Cssrgba.to.hex('rgba(170,187,204,1)').should.equal('#aabbcc');
        Cssrgba.to.hex('rgba(170,187,204,0)').should.equal('#aabbcc');
        Cssrgba.to.hex('rgba(170,187,204,0.1)').should.equal('#aabbcc');

        expect(Cssrgba.to.hex('rgba(170,187,204)')).to.be.null;
    });
});