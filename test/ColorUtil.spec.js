
import chai from 'chai';
import sinon from 'sinon';
import C from "../src/ColorUtil.js";

chai.should();
let expect = require('chai').expect;

describe('ColorUtil', () => {

    describe('conversion', () => {

        let dec = 11189196;
        let obj = {r: 170, g: 187, b: 204, a: 1};
        let hex = '#aabbcc';
        let rgba = 'rgba(170,187,204,1)';

        describe('obj', () => {

            it('obj2Dec', () => {
                C.obj2dec(obj).should.equal(dec);
            });

            it('obj2hex', () => {
                C.obj2hex(obj).should.equal(hex);
                C.obj2hex({r: 0, g: 187, b: 0}).should.equal('#00bb00');
            });

            it('obj2rgba', () => {
                C.obj2rgba(obj).should.equal(rgba);
                C.obj2rgba({r: 170, g: 187, b: 204}).should.equal('rgba(170,187,204,1)');
                C.obj2rgba({r: 170, g: 187, b: 204, a: 0}).should.equal('rgba(170,187,204,0)');
                C.obj2rgba({r: 170, g: 187, b: 204, a: 0.1}).should.equal('rgba(170,187,204,0.1)');
                C.obj2rgba({r: 170, g: 187, b: 204, a: 0/0}).should.equal(rgba);
            });
        });

        describe('dec', () => {

            it('dec2obj', () => {
                C.dec2obj(dec).should.eql(obj);
                C.dec2obj(dec, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.dec2obj(dec, 0.1).should.eql({r: 170, g: 187, b: 204, a: 0.1});
            });

            it('dec2hex', () => {
                C.dec2hex(dec).should.equal(hex);
                C.dec2hex(0x00bb00).should.equal('#00bb00');
            });

            it('dec2rgba', () => {
                C.dec2rgba(dec).should.equal(rgba);
                C.dec2rgba(dec, 0).should.equal('rgba(170,187,204,0)');
                C.dec2rgba(dec, 0.1).should.equal('rgba(170,187,204,0.1)');
            });
        });

        describe('hex', () => {

            it('hex2obj', () => {
                C.hex2obj(hex).should.eql(obj);
                C.hex2obj(hex, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.hex2obj(hex, 0.1).should.eql({r: 170, g: 187, b: 204, a: 0.1});
                C.hex2obj('#abc').should.eql(obj);
                C.hex2obj('abc').should.eql(obj);
                C.hex2obj('aabbcc').should.eql(obj);
                expect(C.hex2obj('#abcc')).to.be.null;
            });

            it('hex2dec', () => {
                C.hex2dec(hex).should.equal(dec);
                C.hex2dec('aabbcc').should.equal(dec);
                C.hex2dec('#abc').should.equal(dec);
                C.hex2dec('abc').should.equal(dec);
                C.hex2dec('#112233').should.equal(0x112233);
            });

            it('hex2rgba', () => {
                C.hex2rgba(hex).should.equal(rgba);
                C.hex2rgba(hex, 0).should.equal('rgba(170,187,204,0)');
                C.hex2rgba(hex, 0.1).should.equal('rgba(170,187,204,0.1)');
                C.hex2rgba('aabbcc').should.equal(rgba);
                C.hex2rgba('#abc').should.equal(rgba);
                C.hex2rgba('abc').should.equal(rgba);
                C.hex2rgba('112233').should.equal('rgba(17,34,51,1)');
            });
        });

        describe('rgba', () => {

            it('rgba2obj', () => {
                C.rgba2obj('rgba(170,187,204,1)').should.eql({r: 170, g: 187, b: 204, a: 1});
                C.rgba2obj('rgba(170,187,204)').should.eql({r: 170, g: 187, b: 204, a: 1});
                C.rgba2obj('rgba(170,187,204,0)').should.eql({r: 170, g: 187, b: 204, a: 0});
                C.rgba2obj('rgba(170,187,204,0.1)').should.eql({r: 170, g: 187, b: 204, a: 0.1});
            });

            it('rgba2dec', () => {
                C.rgba2dec('rgba(170,187,204,1)').should.equal(11189196);
                C.rgba2dec('rgba(170,187,204)').should.equal(11189196);
                C.rgba2dec('rgba(170,187,204,0)').should.equal(11189196);
                C.rgba2dec('rgba(170,187,204,0.1)').should.equal(11189196);
            });

            it('rgba2hex', () => {
                C.rgba2hex('rgba(170,187,204,1)').should.equal('#aabbcc');
                C.rgba2hex('rgba(170,187,204)').should.equal('#aabbcc');
                C.rgba2hex('rgba(170,187,204,0)').should.equal('#aabbcc');
                C.rgba2hex('rgba(170,187,204,0.1)').should.equal('#aabbcc');
            });
        });
    });

    describe('getGradientColor', () => {

        it('should get color from 1 point gradient', () => {
            C.getGradientColor([0x00FF7F], 0.5)
                .should.equal(0x00FF7F);
        });

        it('should get color from 2 point gradient', () => {
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0)
                .should.equal(0x00FF7F);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 1)
                .should.equal(0xFF00FF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.25)
                .should.equal(0x3FBF9F);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.5)
                .should.equal(0x7F7FBF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.75)
                .should.equal(0xBF3FDF);
        });

        it('should get color from 3 point gradient', () => {
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0)
                .should.equal(0x0);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 1)
                .should.equal(0xFFFFFF);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.25)
                .should.equal(0x3F3F3F);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.5)
                .should.equal(0x7F7F7F);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.75)
                .should.equal(0xBFBFBF);
        });

        it('should get color from 4 point gradient', () => {
            C.getGradientColor([0xFFFFFF, 0x0, 0x0, 0x0], 0)
                .should.equal(0xFFFFFF); // first color
            C.getGradientColor([0x0, 0x0, 0x0, 0xFFFFFF], 1)
                .should.equal(0xFFFFFF); // last color
            C.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x7F7F7F], 0.25)
                .should.equal(0xBFBFBF); // 75% between colors 0 and 1
            C.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x0], 0.5)
                .should.equal(0xBFBFBF); // 50% beween colors 1 and 2
            C.getGradientColor([0x0, 0x0, 0x7F7F7F, 0xFFFFFF], 0.75)
                .should.equal(0x9F9F9F); // 25% between colors 2 and 3
        });

        it('should return edge colors when value is out of range', () => {
            C.getGradientColor([0x00FF7F, 0xFF00FF], 2)
                .should.equal(0xFF00FF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], -2)
                .should.equal(0x00FF7F);
        });
    });

    describe('getGradientMatrixColor', () => {

        let sandbox;
        let stub;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            stub = sandbox.stub(C, 'getGradientColor')
                .onCall(0).returns(0)
                .onCall(1).returns(1);
        });

        afterEach(() => {
            sandbox.restore();
        });

        let matrix = [
            [0x0000FF, 0x00FF00, 0xFF0000],
            [0x0000EE, 0x00EE00, 0xEE0000],
            [0x0000DD, 0x00DD00, 0xDD0000],
            [0x0000CC, 0x00CC00, 0xCC0000],
            [0x0000BB, 0x00BB00, 0xBB0000]
        ];

        it('should calculate with correct horizontal colors', () => {
            C.getGradientMatrixColor(matrix, 0.75, 0);

            let call1 = stub.getCall(0);
            let call2 = stub.getCall(1);

            call1.calledWith(matrix[0], 0.75).should.be.true;
            call2.calledWith(matrix[1], 0.75).should.be.true;
        });

        it('should calculate with correct gradients', () => {
            C.getGradientMatrixColor(matrix, 0.75, 0.75);

            let call1 = stub.getCall(0);
            let call2 = stub.getCall(1);

            call1.calledWith(matrix[3], 0.75).should.be.true;
            call2.calledWith(matrix[4], 0.75).should.be.true;
        });

        it('should calculate final color with correct colors', () => {
            C.getGradientMatrixColor(matrix, 0.75, 0);

            let call3 = stub.getCall(2);

            call3.calledWith([0, 1], 0).should.be.true;
        });

        it('should calculate final color with correct vertical position', () => {
            C.getGradientMatrixColor(matrix, 0.75, 0.80);

            let call3 = stub.getCall(2);

            call3.args[1].should.be.closeTo(0.200, 0.001);
        });
    });
});