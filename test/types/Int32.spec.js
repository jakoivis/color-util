import chai from 'chai';
import Int32 from '../../src/types/Int32';

chai.should();
let expect = require('chai').expect;

describe('Int32', () => {

    it('toRgb', () => {
        Int32.toRgb(0xFFAABBCC).should.eql({r: 0xCC, g: 0xBB, b: 0xAA, a: 0xFF});
        Int32.toRgb(-5588020).should.eql({r: 0xCC, g: 0xBB, b: 0xAA, a: 0xFF}); // 0xFFAABBCC
    });
});