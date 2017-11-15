import chai from 'chai';
import Int32RGBA from '../../src/types/Int32RGBA';

chai.should();
let expect = require('chai').expect;

describe('Int32RGBA', () => {

    it('toRgb', () => {
        Int32RGBA.to.rgb(0xFFAABBCC).should.eql({r: 0xFF, g: 0xAA, b: 0xBB, a: 0xCC});
        Int32RGBA.to.rgb(-5588020).should.eql({r: 0xFF, g: 0xAA, b: 0xBB, a: 0xCC}); // 0xFFAABBCC
    });
});