
import sinon from 'sinon';
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

    it('should find property index', () => {

        let obj = [{a:0}, {b:0}, {c:3, b:3}];

        Utils.findPropertyIndex(obj, 'a').should.equal(0);
        Utils.findPropertyIndex(obj, 'b').should.equal(1);
        Utils.findLastPropertyIndex(obj, 'b').should.equal(2);
        Utils.findLastPropertyIndex(obj, 'a').should.equal(0);
    });

    it('should convert first letter to lower case', () => {

        Utils.lowerFirst('A').should.equal('a');
        Utils.lowerFirst('A A').should.equal('a A');
        expect(Utils.lowerFirst(null)).to.equal(null);
        expect(Utils.lowerFirst('')).to.equal('');
    });

    it('should clone', () => {

        Utils.clone(1).should.equal(1);
        Utils.clone('test').should.equal('test');

        let obj = {a:1};
        expect(Utils.clone(obj) === obj).to.be.false;
        Utils.clone(obj).should.eql(obj);
    });
});
