
import chai from 'chai';
import Utils from '../src/Utils.js';

chai.should();
let expect = require('chai').expect;

describe('Utils', () => {

    let obj = {
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
        Utils.get(obj, ['b', 'c', 0, 'a']).should.equal(6);
    });

    it('should return default when object does not exist', () => {
        expect(Utils.get(obj, 'a.a')).to.equal(undefined);
        expect(Utils.get(obj, 'a.a', 10)).to.equal(10);
        expect(Utils.get(obj, 'a.a.a')).to.equal(undefined);
        expect(Utils.get(obj, 'a.a.a', 10)).to.equal(10);
        expect(Utils.get(obj, 'x.a')).to.equal(undefined);
        expect(Utils.get(obj, 'x.a', 10)).to.equal(10);
        expect(Utils.get(obj, 'b.b.4')).to.equal(undefined);
        expect(Utils.get(obj, 'b.b.4', 10)).to.equal(10);
        expect(Utils.get(obj, 'b.b.4.1.a')).to.equal(undefined);
        expect(Utils.get(obj, ['b', 'b', 4], 10)).to.equal(10);
        expect(Utils.get(undefined, '0')).to.equal(undefined);
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
        expect(Utils.has(undefined, '0')).to.equal(false);
    });

    it('should set property value to data structure', () => {

        let o = {};

        Utils.set(o, 'a', 1);
        Utils.set(o, 'b.a.a', 2);
        Utils.set(o, 'b.b.1', 4);
        Utils.set(o, 'b.c.0.a', 6);
        Utils.set(o, ['c', 'a'], 7);

        o.a.should.equal(1);
        o.b.a.a.should.equal(2);
        expect(Array.isArray(o.b.b)).to.equal(true);
        o.b.b[1].should.equal(4);
        o.b.b.length.should.equal(2);
        o.b.c[0].a.should.equal(6);
        o.c.a.should.equal(7);

        let a = [];

        Utils.set(a, '1.a', 1);

        a[1].a.should.equal(1);
    });

    it('should include', () => {
        Utils.includes([1,2,3], 2).should.equal(true);
        Utils.includes({a:1, b:2, c:3}, 2).should.equal(true);
    });

    it('should not include', () => {
        Utils.includes([1,2,3], 5).should.equal(false);
        Utils.includes({a:1, b:2, c:3}, 5).should.equal(false);
    });

    it('should detect object type', () => {
        Utils.isObject({}).should.equal(true);

        Utils.isObject([]).should.equal(false);
        Utils.isObject(123).should.equal(false);
        Utils.isObject(null).should.equal(false);
    });

    it('should detect number type', () => {
        Utils.isNumber(0).should.equal(true);
        Utils.isNumber(0.1).should.equal(true);
        Utils.isNumber(-0.1).should.equal(true);

        Utils.isNumber('0').should.equal(false);
        Utils.isNumber(0/0).should.equal(false);
        Utils.isNumber(null).should.equal(false);
        Utils.isNumber(undefined).should.equal(false);
        Utils.isNumber('asd').should.equal(false);
    });

    it('should detect numeric type', () => {
        Utils.isNumeric(0).should.equal(true);
        Utils.isNumeric(0.1).should.equal(true);
        Utils.isNumeric(-0.1).should.equal(true);
        Utils.isNumeric('0').should.equal(true);
        Utils.isNumeric('0.1').should.equal(true);
        Utils.isNumeric('-0.1').should.equal(true);

        Utils.isNumeric(0/0).should.equal(false);
        Utils.isNumeric(null).should.equal(false);
        Utils.isNumeric(undefined).should.equal(false);
        Utils.isNumeric('asd').should.equal(false);
    });

    it('should find correct index', () => {

        let data = ['A','B','C','D','A','B','C','D'];
        let obj = [{a:1}, {b:2}, {c:3, b:3}];

        // basic
        Utils.findIndex(data, (value, index) => value === 'B').should.equal(1);
        Utils.findIndex(data, (value, index) => value === 'X').should.equal(-1);
        Utils.findIndex(data, (value, index) => index === 1).should.equal(1);

        // start index
        Utils.findIndex(data, (value, index) => value === 'B', 1).should.equal(1);
        Utils.findIndex(data, (value, index) => value === 'B', 2).should.equal(5);
        Utils.findIndex(data, (value, index) => value === 'B', 6).should.equal(-1);

        // negative start index
        Utils.findIndex(data, (value, index) => value === 'B', -2).should.equal(-1);
        Utils.findIndex(data, (value, index) => value === 'B', -3).should.equal(5);
        Utils.findIndex(data, (value, index) => value === 'B', -20).should.equal(1);

        // property matcher
        Utils.findIndex(obj, 'b').should.equal(1);
        Utils.findIndex(obj, 'd').should.equal(-1);

        // property value matcher
        Utils.findIndex(obj, ['b', 2]).should.equal(1);
        Utils.findIndex(obj, ['b', 3]).should.equal(2);
        Utils.findIndex(obj, ['b', 4]).should.equal(-1);
    });

    it('should find correct last index', () => {

        let data = ['A','B','C','D','A','B','C','D'];
        let obj = [{a:1}, {b:2}, {c:3, b:3}];

        // basic
        Utils.findLastIndex(data, (value, index) => value === 'B').should.equal(5);
        Utils.findLastIndex(data, (value, index) => value === 'X').should.equal(-1);
        Utils.findLastIndex(data, (value, index) => index === 1).should.equal(1);

        // start index
        Utils.findLastIndex(data, (value, index) => value === 'B', 5).should.equal(5);
        Utils.findLastIndex(data, (value, index) => value === 'B', 4).should.equal(1);
        Utils.findLastIndex(data, (value, index) => value === 'B', 0).should.equal(-1);

        // negative start index
        Utils.findLastIndex(data, (value, index) => value === 'B', -3).should.equal(5);
        Utils.findLastIndex(data, (value, index) => value === 'B', -4).should.equal(1);
        Utils.findLastIndex(data, (value, index) => value === 'B', -20).should.equal(-1);

        // property matcher
        Utils.findLastIndex(obj, 'b').should.equal(2);
        Utils.findLastIndex(obj, 'd').should.equal(-1);

        // property value matcher
        Utils.findLastIndex(obj, ['b', 2]).should.equal(1);
        Utils.findLastIndex(obj, ['b', 3]).should.equal(2);
        Utils.findLastIndex(obj, ['b', 4]).should.equal(-1);
    });

    it('should find correct item', () => {

        let obj = [{a:1}, {b:2}, {c:3, b:3}];

        Utils.find(obj, ['b', 2]).should.equal(obj[1]);
        Utils.findLast(obj, ['b', 2]).should.equal(obj[1]);
    });
});
