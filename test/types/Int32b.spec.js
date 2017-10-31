import chai from 'chai';
import Int32b from '../../src/types/Int32b';

chai.should();
let expect = require('chai').expect;

describe('Int32b', () => {

    it('toRgb', () => {
        Int32b.toRgb(0xFFAABBCC).should.eql({r: 0xFF, g: 0xAA, b: 0xBB, a: 0xCC});
        Int32b.toRgb(-5588020).should.eql({r: 0xFF, g: 0xAA, b: 0xBB, a: 0xCC}); // 0xFFAABBCC
    });
});