
import chai from 'chai';
import Utils from '../src/Utils.js';

chai.should();
let expect = require('chai').expect;

describe('Utils', () => {

    var obj = {
        a: 1,
        b: {
            a: {
                a: 2
            },
            b: [3,4,5],
            c: [{
                a: 6
            }]
        }
    };

    it('should return property value under data structure', () => {
        Utils.get(obj, 'a').should.equal(1);
        Utils.get(obj, 'b.a.a').should.equal(2);
        Utils.get(obj, 'b').should.equal(obj.b);
        Utils.get(obj, 'b.b.0').should.equal(3);
        Utils.get(obj, 'b.b.1').should.equal(4);
        Utils.get(obj, 'b.b.2').should.equal(5);
        Utils.get(obj, 'b.c.0.a').should.equal(6);
    });

    it('should return default when object does not exist', () => {
        expect(Utils.get(obj, 'a.a')).to.equal(undefined);
        expect(Utils.get(obj, 'a.a.a')).to.equal(undefined);
        expect(Utils.get(obj, 'x.a')).to.equal(undefined);
        expect(Utils.get(obj, 'x.a', 10)).to.equal(10);
        expect(Utils.get(obj, 'b.b.4')).to.equal(undefined);
        expect(Utils.get(obj, 'b.b.4.1.a')).to.equal(undefined);
    });

    it('should return true for existing properties', () => {
        Utils.has(obj, 'a').should.equal(true);
        Utils.has(obj, 'b.a.a').should.equal(true);
        Utils.has(obj, 'b').should.equal(true);
        Utils.has(obj, 'b.b.0').should.equal(true);
        Utils.has(obj, 'b.b.1').should.equal(true);
        Utils.has(obj, 'b.b.2').should.equal(true);
        Utils.has(obj, 'b.c.0.a').should.equal(true);
    });

    it('should return false when object does not exist', () => {
        expect(Utils.has(obj, 'a.a')).to.equal(false);
        expect(Utils.has(obj, 'a.a.a')).to.equal(false);
        expect(Utils.has(obj, 'x.a')).to.equal(false);
        expect(Utils.has(obj, 'b.b.4')).to.equal(false);
        expect(Utils.has(obj, 'b.b.4.1.a')).to.equal(false);
    });

    it('should include', () => {
        Utils.includes([1,2,3], 2).should.equal(true);
        Utils.includes({a:1, b:2, c:3}, 2).should.equal(true);
    });

    it('should not include', () => {
        Utils.includes([1,2,3], 5).should.equal(false);
        Utils.includes({a:1, b:2, c:3}, 5).should.equal(false);
    });
});
