
import sinon from 'sinon';
import chai from 'chai';
import ConversionUtil from '../src/ConversionUtil';
import cu from '../src/ColorUtil';
import { TYPES, TYPES_ALL } from '../src/types/types';

chai.should();
let expect = require('chai').expect;

describe('conversionUtils', () => {

    describe('getColorType', () => {

        it('should get color type', () => {

            ConversionUtil.getColorType('#FF0000', TYPES).should.equal(cu.hex);
        });

        it('should return null when no type matches found', () => {

            expect(ConversionUtil.getColorType('0xff0000', TYPES)).to.equal(null);
        });
    });

    describe('convert', () => {

        it('should convert single color with one conversion', () => {
            ConversionUtil.convert(0xFF0000, cu.int.to.hex).should.equal("#ff0000");
        });

        it('should convert single color with two conversions', () => {
            ConversionUtil.convert(0xFF0000, cu.int.to.hex, cu.hex.to.int).should.equal(0xFF0000);
        });

        it('should convert array of colors with one conversion', () => {
            ConversionUtil.convert([0xFF0000, 0x00FF00], cu.int.to.hex)
                .should.eql(["#ff0000", "#00ff00"]);
        });

        it('should convert array of colors with two conversions', () => {
            ConversionUtil.convert([0xFF0000, 0x00FF00], cu.int.to.hex, cu.hex.to.int)
                .should.eql([0xFF0000, 0x00FF00]);
        });

        it('should convert matrix of colors with one conversion', () => {
            ConversionUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], cu.int.to.hex)
                .should.eql([["#ff0000", "#00ff00"], "#0000ff"]);
        });

        it('should convert matrix of colors with two conversions', () => {
            ConversionUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], cu.int.to.hex, cu.hex.to.int)
                .should.eql([[0xFF0000, 0x00FF00], 0x0000FF]);
        });

        it('should convert matrix of any color type', () => {
            ConversionUtil.convert([['hsl(0,100%,50%)', '#00FF00'], 0x0000FF], cu.any.to.int)
                .should.eql([[0xFF0000, 0x00FF00], 0x0000FF]);
        });

        it('should return color as is when no conversion functions are provided', () => {
            ConversionUtil.convert(0xFF0000).should.equal(0xff0000);
        });

        it('should return undefined when no colors provided', () => {
            expect(ConversionUtil.convert()).to.equal(undefined);
        });
    });

    describe('convertAny', () => {

        it('should return color as is if it does not match any known types', () => {

            ConversionUtil.convertAny('#ff', cu.hex, TYPES).should.equal('#ff');
        });

        it('should return color as is if it already matches the target type', () => {

            ConversionUtil.convertAny('#ff0000', cu.hex, TYPES).should.equal('#ff0000');
        });

        it('should convert sub type siblings', () => {

            ConversionUtil.convertAny('#ff0000', cu.int, TYPES).should.equal(0xff0000);
        });

        it('should convert sub type to parent type', () => {

            ConversionUtil.convertAny('#ff0000', cu.rgb, TYPES).should.eql({r:255, g:0, b:0, a: 255});
        });

        it('should convert parent type to sub type', () => {

            ConversionUtil.convertAny({r:255, g:0, b:0, a: 255}, cu.hex, TYPES).should.equal('#ff0000');
        });

        it('should convert parent type to parent type', () => {

            ConversionUtil.convertAny({r:255, g:0, b:0, a: 255}, cu.hsl, TYPES).should.eql({h:0, s:1, l:0.5, a:1});
        });

        it('should convert sub type another root type', () => {

            ConversionUtil.convertAny('#ff0000', cu.hsl, TYPES).should.eql({h:0, s:1, l:0.5, a:1});
        });

        it('should convert sub type another parents sub type', () => {

            ConversionUtil.convertAny('#ff0000', cu.hslString, TYPES).should.equal('hsl(0,100%,50%)');
        });
    });

    describe('_getPathToRoot', () => {

        it('should return path from root type', () => {

            let path = ConversionUtil._getPathToRoot(cu.rgb);

            path.length.should.equal(1);
            path[0].name.should.eql('rgb');
        });

        it('should return path from sub type', () => {

            let path = ConversionUtil._getPathToRoot(cu.int);

            path.length.should.equal(2);
            path[0].name.should.equal('int');
            path[1].name.should.equal('rgb');
        });
    });

    describe('_getConversionPathThroughParentType', () => {

        it('should create path between sub type siblings', () => {

            let path = ConversionUtil._getConversionPathThroughParentType(cu.int, cu.hex);

            path.length.should.equal(2);
            path[0].should.equal(cu.int.to.rgb);
            path[1].should.equal(cu.rgb.to.hex);
        });

        it('should create path between sub type and parent type', () => {

            let path = ConversionUtil._getConversionPathThroughParentType(cu.int, cu.rgb);

            path.length.should.equal(1);
            path[0].should.equal(cu.int.to.rgb);
        });

        it('should create path between parent type and sub type', () => {

            let path = ConversionUtil._getConversionPathThroughParentType(cu.rgb, cu.int);

            path.length.should.equal(1);
            path[0].should.equal(cu.rgb.to.int);
        });

        it('should create path between parent type and parent type', () => {

            let path = ConversionUtil._getConversionPathThroughParentType(cu.rgb, cu.hsl);

            path.length.should.equal(1);
            path[0].should.equal(cu.rgb.to.hsl);
        });

        it('should create path between sub type and another parent type', () => {

            let path = ConversionUtil._getConversionPathThroughParentType(cu.int, cu.hsl);

            path.length.should.equal(2);
            path[0].should.equal(cu.int.to.rgb);
            path[1].should.equal(cu.rgb.to.hsl);
        });

        it('should create path between sub type and another parents sub type', () => {

            let path = ConversionUtil._getConversionPathThroughParentType(cu.int, cu.hslString);

            path.length.should.equal(3);
            path[0].should.equal(cu.int.to.rgb);
            path[1].should.equal(cu.rgb.to.hsl);
            path[2].should.equal(cu.hsl.to.hslString);
        });
    });
});
