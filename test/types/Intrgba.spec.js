import chai from 'chai';
import Intrgba from '../../src/types/Intrgba';

chai.should();
let expect = require('chai').expect;

describe('Intrgba', () => {

    it('rgb', () => {
        Intrgba.to.rgb(0xFFAABBCC).should.eql({r: 0xFF, g: 0xAA, b: 0xBB, a: 0xCC});
        Intrgba.to.rgb(-5588020).should.eql({r: 0xFF, g: 0xAA, b: 0xBB, a: 0xCC}); // 0xFFAABBCC
    });
});