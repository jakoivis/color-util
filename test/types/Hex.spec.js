import chai from 'chai';
import Hex from '../../src/types/Hex';

chai.should();
let expect = require('chai').expect;

describe('Hex', () => {

     it('test', () => {
        Hex.test(0xFFFFFF).should.be.false;
        Hex.test({r: 170, g: 187, b: 204, a: 255}).should.be.false;
        Hex.test('test').should.be.false;
        Hex.test('#1245').should.be.false;
        Hex.test('#FFF').should.be.true;
        Hex.test('#FFFFFF').should.be.true;
        Hex.test('#FFFFFG').should.be.false;
    });

    it('rgb', () => {
        Hex.to.rgb('#aabbcc').should.eql({r: 170, g: 187, b: 204, a: 255});
        Hex.to.rgb('#aabbcc', 0).should.eql({r: 170, g: 187, b: 204, a: 0});
        Hex.to.rgb('#aabbcc', 85).should.eql({r: 170, g: 187, b: 204, a: 85});
        Hex.to.rgb('#abc').should.eql({r: 170, g: 187, b: 204, a: 255});
        Hex.to.rgb('abc').should.eql({r: 170, g: 187, b: 204, a: 255});
        Hex.to.rgb('aabbcc').should.eql({r: 170, g: 187, b: 204, a: 255});
        expect(Hex.to.rgb('#abcc')).to.be.null;
    });

    it('int', () => {
        Hex.to.int('#aabbcc').should.equal(0xAABBCC);
        Hex.to.int('aabbcc').should.equal(0xAABBCC);
        Hex.to.int('#abc').should.equal(0xAABBCC);
        Hex.to.int('abc').should.equal(0xAABBCC);
        Hex.to.int('#112233').should.equal(0x112233);
    });

    it('cssrgb', () => {
        Hex.to.cssrgb('#aabbcc').should.equal('rgb(170,187,204)');
        Hex.to.cssrgb('aabbcc').should.equal('rgb(170,187,204)');
        Hex.to.cssrgb('#abc').should.equal('rgb(170,187,204)');
        Hex.to.cssrgb('abc').should.equal('rgb(170,187,204)');
        Hex.to.cssrgb('112233').should.equal('rgb(17,34,51)');
    });

    it('cssrgba', () => {
        Hex.to.cssrgba('#aabbcc').should.equal('rgba(170,187,204,1)');
        Hex.to.cssrgba('#aabbcc', 0).should.equal('rgba(170,187,204,0)');
        Hex.to.cssrgba('#aabbcc', 0.1).should.equal('rgba(170,187,204,0.1)');
        Hex.to.cssrgba('aabbcc').should.equal('rgba(170,187,204,1)');
        Hex.to.cssrgba('#abc').should.equal('rgba(170,187,204,1)');
        Hex.to.cssrgba('abc').should.equal('rgba(170,187,204,1)');
        Hex.to.cssrgba('112233').should.equal('rgba(17,34,51,1)');
    });
});