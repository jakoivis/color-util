import chai from 'chai';
import Hsl from '../../src/types/Hsl';

chai.should();
let expect = require('chai').expect;

describe('Hsl', () => {

    it('test', () => {
        Hsl.test(0xAABBCC).should.be.false;
        Hsl.test('#aabbcc').should.be.false;
        Hsl.test('rgba(170,187,204,1)').should.be.false;
        Hsl.test({h: 0, s: 0, l: 0}).should.be.true;
        Hsl.test({h: 0, s: 0, v: 0}).should.be.false;
        Hsl.test({h: 1.2, s: 0, l: 0}).should.be.false;
        Hsl.test({h: -0.5, s: 0, l: 0}).should.be.false;
    });

    it('toRgb', () => {
        Hsl.toRgb({h: 0, s: 0, l: 0}).should.eql({r: 0, g: 0, b: 0, a: 255});
        Hsl.toRgb({h: 0, s: 0, l: 1}).should.eql({r: 255, g: 255, b: 255, a: 255});
        Hsl.toRgb({h: 0, s: 1, l: 0.5}).should.eql({r: 255, g: 0, b: 0, a: 255});
        Hsl.toRgb({h: 2/6, s: 1, l: 0.5}).should.eql({r: 0, g: 255, b: 0, a: 255}); // h: 120deg
        Hsl.toRgb({h: 4/6, s: 1, l: 0.5}).should.eql({r: 0, g: 0, b: 255, a: 255}); // h: 240eg
        Hsl.toRgb({h: 1/6, s: 1, l: 0.5}).should.eql({r: 255, g: 255, b: 0, a: 255}); // h: 60deg
        Hsl.toRgb({h: 3/6, s: 1, l: 0.5}).should.eql({r: 0, g: 255, b: 255, a: 255}); // h: 180deg
        Hsl.toRgb({h: 5/6, s: 1, l: 0.5}).should.eql({r: 255, g: 0, b: 255, a: 255}); // h: 300deg
        Hsl.toRgb({h: 0, s: 0, l: 0.75}).should.eql({r: 191.25, g: 191.25, b: 191.25, a: 255});
        Hsl.toRgb({h: 0, s: 1, l: 0.25}).should.eql({r: 127.5, g: 0, b: 0, a: 255});
        Hsl.toRgb({h: 1/6, s: 1, l: 0.25}).should.eql({r: 127.5, g: 127.5, b: 0, a: 255}); // h: 60deg
        Hsl.toRgb({h: 2/6, s: 1, l: 0.25}).should.eql({r: 0, g: 127.5, b: 0, a: 255}); // h: 120deg
        Hsl.toRgb({h: 5/6, s: 1, l: 0.25}).should.eql({r: 127.5, g: 0, b: 127.5, a: 255}); // h: 300deg
        Hsl.toRgb({h: 3/6, s: 1, l: 0.25}).should.eql({r: 0, g: 127.5, b: 127.5, a: 255}); // h: 180deg
        Hsl.toRgb({h: 4/6, s: 1, l: 0.25}).should.eql({r: 0, g: 0, b: 127.5, a: 255}); // h: 240deg
        Hsl.toRgb({h: 0, s: 0, l: 0, a: 0.1}).should.eql({r: 0, g: 0, b: 0, a: 25.5});
    });

    it('toHslString', () => {
        Hsl.toHslString({h: 0.5, s: 0.5, l: 0.1}).should.eql('hsl(180,50%,10%)');
    });

    it('toHslaString', () => {
        Hsl.toHslaString({h: 0.5, s: 0.5, l: 0.1, a: 0.5}).should.equal('hsla(180,50%,10%,0.5)');
        Hsl.toHslaString({h: 0.5, s: 0.5, l: 0.1, a: 0}).should.equal('hsla(180,50%,10%,0)');
    });

    it('toHsv', () => {
        Hsl.toHsv({h: 0.5, s: 0.5, l: 0.1}).should.eql({h: 0.5, s: 0.6666666666666665, v: 0.15, a: 1});
    });
});