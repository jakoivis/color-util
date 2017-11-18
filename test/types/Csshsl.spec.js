import chai from 'chai';
import Csshsl from '../../src/types/Csshsl';

chai.should();
let expect = require('chai').expect;

describe('Csshsl', () => {

    it('test', () => {
        Csshsl.test(0xAABBCC).should.be.false;
        Csshsl.test('#aabbcc').should.be.false;
        Csshsl.test('rgba(170,187,204,1)').should.be.false;
        Csshsl.test({h: 0, s: 0, l: 0}).should.be.false;
        Csshsl.test('hsl(5, 10%, 20%)').should.be.true;
        Csshsl.test('hsla(5, 10%, 20%)').should.be.true;
        Csshsl.test('hsla(5, 10%, 20%, 0.5)').should.be.false;
        Csshsl.test('hsla(5, 10, 20, 0.5)').should.be.false;
        Csshsl.test('hsla(5, 10)').should.be.false;
        Csshsl.test('hsla(5, 10%, 20%, 0,5)').should.be.false;
        Csshsl.test('hsl(5.1, 10%, 20%)').should.be.false;
    });

    it('hsl', () => {
        Csshsl.to.hsl('hsl(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});
        Csshsl.to.hsl('hsla(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});

        expect(Csshsl.to.hsl('hsl(180, 50, 60, 0.5)')).to.be.null;
    });
});