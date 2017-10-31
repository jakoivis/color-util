import chai from 'chai';
import Hsv from '../../src/types/Hsv';

chai.should();
let expect = require('chai').expect;

describe('Hsv', () => {

    it('test', () => {
        Hsv.test(0xAABBCC).should.be.false;
        Hsv.test('#aabbcc').should.be.false;
        Hsv.test('rgba(170,187,204,1)').should.be.false;
        Hsv.test({h: 0, s: 0, v: 0}).should.be.true;
        Hsv.test({h: 0, s: 0, l: 0}).should.be.false;
        Hsv.test({h: 1.2, s: 0, v: 0}).should.be.false;
        Hsv.test({h: -0.5, s: 0, v: 0}).should.be.false;
    });

    it('toRgb', () => {
        Hsv.toRgb({h: 0, s: 0, v: 0}).should.eql({r: 0, g: 0, b: 0, a: 255});
        Hsv.toRgb({h: 0, s: 0, v: 1}).should.eql({r: 255, g: 255, b: 255, a: 255});
        Hsv.toRgb({h: 0, s: 1, v: 1}).should.eql({r: 255, g: 0, b: 0, a: 255});
        Hsv.toRgb({h: 2/6, s: 1, v: 1}).should.eql({r: 0, g: 255, b: 0, a: 255});
        Hsv.toRgb({h: 4/6, s: 1, v: 1}).should.eql({r: 0, g: 0, b: 255, a: 255});
        Hsv.toRgb({h: 1/6, s: 1, v: 1}).should.eql({r: 255, g: 255, b: 0, a: 255});
        Hsv.toRgb({h: 3/6, s: 1, v: 1}).should.eql({r: 0, g: 255, b: 255, a: 255});
        Hsv.toRgb({h: 5/6, s: 1, v: 1}).should.eql({r: 255, g: 0, b: 255, a: 255});
        Hsv.toRgb({h: 0, s: 0, v: 0.75}).should.eql({r: 191.25, g: 191.25, b: 191.25, a: 255});
        Hsv.toRgb({h: 0, s: 1, v: 0.5}).should.eql({r: 127.5, g: 0, b: 0, a: 255});
        Hsv.toRgb({h: 1/6, s: 1, v: 0.5}).should.eql({r: 127.5, g: 127.5, b: 0, a: 255});
        Hsv.toRgb({h: 2/6, s: 1, v: 0.5}).should.eql({r: 0, g: 127.5, b: 0, a: 255});
        Hsv.toRgb({h: 5/6, s: 1, v: 0.5}).should.eql({r: 127.5, g: 0, b: 127.5, a: 255});
        Hsv.toRgb({h: 3/6, s: 1, v: 0.5}).should.eql({r: 0, g: 127.5, b: 127.5, a: 255});
        Hsv.toRgb({h: 4/6, s: 1, v: 0.5}).should.eql({r: 0, g: 0, b: 127.5, a: 255});
        Hsv.toRgb({h: 0, s: 0, v: 0, a: 0.1}).should.eql({r: 0, g: 0, b: 0, a: 25.5});
    });

    it('toHsl', () => {
        Hsv.toHsl({h: 0.5, s: 0.5, v: 0.1}).should.eql({h: 0.5, s: 0.3333333333333333, l: 0.07500000000000001, a: 1});
    });
});