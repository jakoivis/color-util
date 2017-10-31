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

    it('toRgb', () => {
        Hex.toRgb('#aabbcc').should.eql({r: 170, g: 187, b: 204, a: 255});
        Hex.toRgb('#aabbcc', 0).should.eql({r: 170, g: 187, b: 204, a: 0});
        Hex.toRgb('#aabbcc', 85).should.eql({r: 170, g: 187, b: 204, a: 85});
        Hex.toRgb('#abc').should.eql({r: 170, g: 187, b: 204, a: 255});
        Hex.toRgb('abc').should.eql({r: 170, g: 187, b: 204, a: 255});
        Hex.toRgb('aabbcc').should.eql({r: 170, g: 187, b: 204, a: 255});
        expect(Hex.toRgb('#abcc')).to.be.null;
    });

    it('toInt', () => {
        Hex.toInt('#aabbcc').should.equal(0xAABBCC);
        Hex.toInt('aabbcc').should.equal(0xAABBCC);
        Hex.toInt('#abc').should.equal(0xAABBCC);
        Hex.toInt('abc').should.equal(0xAABBCC);
        Hex.toInt('#112233').should.equal(0x112233);
    });

    it('toRgbString', () => {
        Hex.toRgbString('#aabbcc').should.equal('rgb(170,187,204)');
        Hex.toRgbString('aabbcc').should.equal('rgb(170,187,204)');
        Hex.toRgbString('#abc').should.equal('rgb(170,187,204)');
        Hex.toRgbString('abc').should.equal('rgb(170,187,204)');
        Hex.toRgbString('112233').should.equal('rgb(17,34,51)');
    });

    it('toRgbaString', () => {
        Hex.toRgbaString('#aabbcc').should.equal('rgba(170,187,204,1)');
        Hex.toRgbaString('#aabbcc', 0).should.equal('rgba(170,187,204,0)');
        Hex.toRgbaString('#aabbcc', 0.1).should.equal('rgba(170,187,204,0.1)');
        Hex.toRgbaString('aabbcc').should.equal('rgba(170,187,204,1)');
        Hex.toRgbaString('#abc').should.equal('rgba(170,187,204,1)');
        Hex.toRgbaString('abc').should.equal('rgba(170,187,204,1)');
        Hex.toRgbaString('112233').should.equal('rgba(17,34,51,1)');
    });
});