
import chai from 'chai';
import sinon from 'sinon';
import C from "../src/ColorUtil.js";

chai.should();
let expect = require('chai').expect;

describe('ColorUtil', () => {

    beforeEach(() => {
        C._setSystemEndian(0);
    });

    describe('conversion', () => {

        let dec = 0xAABBCC;
        let obj = {r: 170, g: 187, b: 204, a: 255};
        let hex = '#aabbcc';
        let rgba = 'rgba(170,187,204,1)';

        describe('obj', () => {

            it('toInt', () => {
                C.obj.toInt(obj).should.equal(dec);
            });

            it('toHex', () => {
                C.obj.toHex(obj).should.equal(hex);
                C.obj.toHex({r: 0, g: 187, b: 0}).should.equal('#00bb00');
                C.obj.toHex({r: 0, g: 187, b: 0.56}).should.equal('#00bb00');
            });

            it('toRgba', () => {
                C.obj.toRgba(obj).should.equal(rgba);
                C.obj.toRgba({r: 170, g: 187, b: 204}).should.equal('rgba(170,187,204,1)');
                C.obj.toRgba({r: 170, g: 187, b: 204, a: 0}).should.equal('rgba(170,187,204,0)');
                C.obj.toRgba({r: 170, g: 187, b: 204, a: 85}).should.equal('rgba(170,187,204,0.3333333333333333)');
                C.obj.toRgba({r: 170, g: 187, b: 204, a: 0/0}).should.equal(rgba);
            });

            it('toUint32', () => {
                C.obj.toUint32(obj).should.equal(0xFFCCBBAA);
                C.obj.toUint32({r: 170, g: 187, b: 204}).should.equal(0xFFCCBBAA);
                C.obj.toUint32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
                C.obj.toUint32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
                C.obj.toUint32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0xFFCCBBAA);

                C._setSystemEndian(1);
                C.obj.toUint32(obj).should.equal(0xAABBCCFF);
                C.obj.toUint32({r: 170, g: 187, b: 204}).should.equal(0xAABBCCFF);
                C.obj.toUint32({r: 170, g: 187, b: 204, a: 0}).should.equal(0xAABBCC00);
                C.obj.toUint32({r: 170, g: 187, b: 204, a: 85}).should.equal(0xAABBCC55);
                C.obj.toUint32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0xAABBCCFF);
            });

            it('toInt32', () => {
                C.obj.toInt32(obj).should.equal(-3359830); // 0xFFCCBBAA
                C.obj.toInt32({r: 170, g: 187, b: 204}).should.equal(-3359830); // 0xFFCCBBAA
                C.obj.toInt32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
                C.obj.toInt32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
                C.obj.toInt32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(-3359830); // 0xFFCCBBAA

                C._setSystemEndian(1);
                C.obj.toInt32(obj).should.equal(-1430532865); // 0xAABBCCFF
                C.obj.toInt32({r: 170, g: 187, b: 204}).should.equal(-1430532865); // 0xAABBCCFF
                C.obj.toInt32({r: 170, g: 187, b: 204, a: 0}).should.equal(-1430533120); // 0xAABBCC00
                C.obj.toInt32({r: 170, g: 187, b: 204, a: 85}).should.equal(-1430533035); // 0xAABBCC55
                C.obj.toInt32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(-1430532865); // 0xAABBCCFF
            });
        });

        describe('int', () => {

            it('toObj', () => {
                C.int.toObj(dec).should.eql(obj);
                C.int.toObj(dec, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                // C.int.toObj(dec, 0.1).should.eql({r: 170, g: 187, b: 204, a: 0.1});
            });

            it('toHex', () => {
                C.int.toHex(dec).should.equal(hex);
                C.int.toHex(0x00bb00).should.equal('#00bb00');
            });

            it('toRgba', () => {
                C.int.toRgba(dec).should.equal(rgba);
                C.int.toRgba(dec, 0).should.equal('rgba(170,187,204,0)');
                C.int.toRgba(dec, 0.1).should.equal('rgba(170,187,204,0.1)');
            });

            xit('toSystemEndian', () => {
                C._setSystemEndian(1);
                C.int.toSystemEndian(dec).should.equal(dec);

                C._setSystemEndian(2);
                C.int.toSystemEndian(dec).should.equal(dec);

                C._setSystemEndian(0);
                C.int.toSystemEndian(0xAABBCC).should.equal(0xCCBBAA);
                C.int.toSystemEndian(0xFFAABBCC).should.equal(0xCCBBAA);
            });

            xit('toSystemEndianUint32', () => {
                // C._setSystemEndian(1);
                // C.int.toSystemEndianUint32(0xAABBCC).should.equal(0xFFCCBBAA);

                // C._setSystemEndian(2);
                // C.int.toSystemEndianUint32(dec32).should.equal(dec32);

                C._setSystemEndian(0);
                C.int.toSystemEndianUint32(0xAABBCC).should.equal(0xFFCCBBAA);
                C.int.toSystemEndianUint32(0x99AABBCC).should.equal(0xFFCCBBAA);
            });
        });

        describe('hex', () => {

            it('toObj', () => {
                C.hex.toObj(hex).should.eql(obj);
                C.hex.toObj(hex, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.hex.toObj(hex, 85).should.eql({r: 170, g: 187, b: 204, a: 85});
                C.hex.toObj('#abc').should.eql(obj);
                C.hex.toObj('abc').should.eql(obj);
                C.hex.toObj('aabbcc').should.eql(obj);
                expect(C.hex.toObj('#abcc')).to.be.null;
            });

            it('toInt', () => {
                C.hex.toInt(hex).should.equal(dec);
                C.hex.toInt('aabbcc').should.equal(dec);
                C.hex.toInt('#abc').should.equal(dec);
                C.hex.toInt('abc').should.equal(dec);
                C.hex.toInt('#112233').should.equal(0x112233);
            });

            it('toRgba', () => {
                C.hex.toRgba(hex).should.equal(rgba);
                C.hex.toRgba(hex, 0).should.equal('rgba(170,187,204,0)');
                C.hex.toRgba(hex, 0.1).should.equal('rgba(170,187,204,0.1)');
                C.hex.toRgba('aabbcc').should.equal(rgba);
                C.hex.toRgba('#abc').should.equal(rgba);
                C.hex.toRgba('abc').should.equal(rgba);
                C.hex.toRgba('112233').should.equal('rgba(17,34,51,1)');
            });
        });

        describe('rgba', () => {

            it('toObj', () => {
                C.rgba.toObj('rgba(170,187,204,1)').should.eql({r: 170, g: 187, b: 204, a: 255});
                C.rgba.toObj('rgba(170,187,204)').should.eql({r: 170, g: 187, b: 204, a: 255});
                C.rgba.toObj('rgba(170,187,204,0)').should.eql({r: 170, g: 187, b: 204, a: 0});
                C.rgba.toObj('rgba(170,187,204,0.1)').should.eql({r: 170, g: 187, b: 204, a: 25});
            });

            it('toInt', () => {
                C.rgba.toInt('rgba(170,187,204,1)').should.equal(11189196);
                C.rgba.toInt('rgba(170,187,204)').should.equal(11189196);
                C.rgba.toInt('rgba(170,187,204,0)').should.equal(11189196);
                C.rgba.toInt('rgba(170,187,204,0.1)').should.equal(11189196);
            });

            it('toHex', () => {
                C.rgba.toHex('rgba(170,187,204,1)').should.equal('#aabbcc');
                C.rgba.toHex('rgba(170,187,204)').should.equal('#aabbcc');
                C.rgba.toHex('rgba(170,187,204,0)').should.equal('#aabbcc');
                C.rgba.toHex('rgba(170,187,204,0.1)').should.equal('#aabbcc');
            });
        });
    });

    describe('convertTo2StopGradient', () => {

        it('should gradient from 1 point gradient', () => {
            C.convertTo2StopGradient([1], 0.5).array.should.eql([1,1]);
            C.convertTo2StopGradient([1], 0.5).position.should.equal(0);
        });

        it('should gradient from 2 point gradient', () => {
            C.convertTo2StopGradient([1,2], .25).array.should.eql([1,2]);
            C.convertTo2StopGradient([1,2], .25).position.should.equal(.25);
        });

        it('should gradient from 3 point gradient', () => {
            C.convertTo2StopGradient([1,2,3], 0).array.should.eql([1,2]);
            C.convertTo2StopGradient([1,2,3], 0).position.should.equal(0);
            C.convertTo2StopGradient([1,2,3], 1).array.should.eql([3,3]);
            C.convertTo2StopGradient([1,2,3], 1).position.should.equal(0);
            C.convertTo2StopGradient([1,2,3], 0.25).array.should.eql([1,2]);
            C.convertTo2StopGradient([1,2,3], 0.25).position.should.equal(0.5);
        });

        it('should gradient from 4 point gradient', () => {
            C.convertTo2StopGradient([1,2,3,4], 0).array.should.eql([1,2]);
            C.convertTo2StopGradient([1,2,3,4], 0).position.should.equal(0);
            C.convertTo2StopGradient([1,2,3,4], 1).array.should.eql([4,4]);
            C.convertTo2StopGradient([1,2,3,4], 1).position.should.be.closeTo(0, 0.00000000000001);
            C.convertTo2StopGradient([1,2,3,4], 0.25).array.should.eql([1,2]);
            C.convertTo2StopGradient([1,2,3,4], 0.25).position.should.equal(0.75);
        });
    });

    describe('getGradientColor', () => {

        var toObj = C.int.toObj;
        var fromObj = C.obj.toInt;

        it('should get color from 1 point gradient', () => {
            C.getGradientColor([0x00FF7F], 0.5, toObj, fromObj)
                .should.equal(0x00FF7F);
        });

        it('should get color from 2 point gradient', () => {
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0, toObj, fromObj)
                .should.equal(0x00FF7F);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 1, toObj, fromObj)
                .should.equal(0xFF00FF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.25, toObj, fromObj)
                .should.equal(0x3FBF9F);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.5, toObj, fromObj)
                .should.equal(0x7F7FBF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.75, toObj, fromObj)
                .should.equal(0xBF3FDF);
        });

        it('should get color from 3 point gradient', () => {
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0, toObj, fromObj)
                .should.equal(0x0);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 1, toObj, fromObj)
                .should.equal(0xFFFFFF);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.25, toObj, fromObj)
                .should.equal(0x3F3F3F);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.5, toObj, fromObj)
                .should.equal(0x7F7F7F);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.75, toObj, fromObj)
                .should.equal(0xBFBFBF);
        });

        it('should get color from 4 point gradient', () => {
            C.getGradientColor([0xFFFFFF, 0x0, 0x0, 0x0], 0, toObj, fromObj)
                .should.equal(0xFFFFFF); // first color
            C.getGradientColor([0x0, 0x0, 0x0, 0xFFFFFF], 1, toObj, fromObj)
                .should.equal(0xFFFFFF); // last color
            C.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x7F7F7F], 0.25, toObj, fromObj)
                .should.equal(0xBFBFBF); // 75% between colors 0 and 1
            C.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x0], 0.5, toObj, fromObj)
                .should.equal(0xBFBFBF); // 50% beween colors 1 and 2
            C.getGradientColor([0x0, 0x0, 0x7F7F7F, 0xFFFFFF], 0.75, toObj, fromObj)
                .should.equal(0x9F9F9F); // 25% between colors 2 and 3
        });

        it('should return edge colors when value is out of range', () => {
            C.getGradientColor([0x00FF7F, 0xFF00FF], 2, toObj, fromObj)
                .should.equal(0xFF00FF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], -2, toObj, fromObj)
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