import chai from 'chai';
import Int32ABGR from '../../src/types/Int32ABGR';

chai.should();
let expect = require('chai').expect;

describe('Int32ABGR', () => {

    it('toRgb', () => {
        Int32ABGR.toRgb(0xFFAABBCC).should.eql({r: 0xCC, g: 0xBB, b: 0xAA, a: 0xFF});
        Int32ABGR.toRgb(-5588020).should.eql({r: 0xCC, g: 0xBB, b: 0xAA, a: 0xFF}); // 0xFFAABBCC
    });
});