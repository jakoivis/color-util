import chai from 'chai';
import Intabgr from '../../src/types/Intabgr';

chai.should();
let expect = require('chai').expect;

describe('Intabgr', () => {

    it('rgb', () => {
        Intabgr.to.rgb(0xFFAABBCC).should.eql({r: 0xCC, g: 0xBB, b: 0xAA, a: 0xFF});
        Intabgr.to.rgb(-5588020).should.eql({r: 0xCC, g: 0xBB, b: 0xAA, a: 0xFF}); // 0xFFAABBCC
    });
});