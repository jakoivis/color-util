
require('chai').should();
var expect = require('chai').expect;

var C = require('./ColorUtil');

describe('ColorUtil', () => {

    describe('conversion', () => {

        var dec = 11189196;
        var obj = {r: 170, g: 187, b: 204, a: 1};
        var hex = '#aabbcc';
        var rgba = 'rgba(170,187,204,1)';

        describe('obj', () => {

            it('toDec', () => {
                C.obj.toDec(obj).should.equal(dec);
            });

            it('toHex', () => {
                C.obj.toHex(obj).should.equal(hex);
                C.obj.toHex({r: 0, g: 187, b: 0}).should.equal('#00bb00');
            });

            it('toRgba', () => {
                C.obj.toRgba(obj).should.equal(rgba);
                C.obj.toRgba({r: 170, g: 187, b: 204}).should.equal('rgba(170,187,204,1)');
                C.obj.toRgba({r: 170, g: 187, b: 204, a: 0}).should.equal('rgba(170,187,204,0)');
                C.obj.toRgba({r: 170, g: 187, b: 204, a: 0.1}).should.equal('rgba(170,187,204,0.1)');
                C.obj.toRgba({r: 170, g: 187, b: 204, a: 0/0}).should.equal(rgba);
            });
        });

        describe('dec', () => {

            it('toObj', () => {
                C.dec.toObj(dec).should.eql(obj);
                C.dec.toObj(dec, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.dec.toObj(dec, 0.1).should.eql({r: 170, g: 187, b: 204, a: 0.1});
                C.dec.toObj(dec, 0/0).should.eql(obj);
            });

            it('toHex', () => {
                C.dec.toHex(dec).should.equal(hex);
                C.dec.toHex(0x00bb00).should.equal('#00bb00');
            });

            it('toRgba', () => {
                C.dec.toRgba(dec).should.equal(rgba);
                C.dec.toRgba(dec, 0).should.equal('rgba(170,187,204,0)');
                C.dec.toRgba(dec, 0.1).should.equal('rgba(170,187,204,0.1)');
                C.dec.toRgba(dec, 0/0).should.equal(rgba);
            });
        });

        describe('hex', () => {

            it('toObj', () => {
                C.hex.toObj(hex).should.eql(obj);
                C.hex.toObj(hex, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.hex.toObj(hex, 0.1).should.eql({r: 170, g: 187, b: 204, a: 0.1});
                C.hex.toObj(hex, 0/0).should.eql(obj);
                C.hex.toObj('#abc').should.eql(obj);
                C.hex.toObj('abc').should.eql(obj);
                C.hex.toObj('aabbcc').should.eql(obj);
                expect(C.hex.toObj('#abcc')).to.be.null;
            });

            it('toDec', () => {
                C.hex.toDec(hex).should.equal(dec);
                C.hex.toDec('aabbcc').should.equal(dec);
                C.hex.toDec('#abc').should.equal(dec);
                C.hex.toDec('abc').should.equal(dec);
                C.hex.toDec('#112233').should.equal(0x112233);
            });

            it('toRgba', () => {
                C.hex.toRgba(hex).should.equal(rgba);
                C.hex.toRgba(hex, 0).should.equal('rgba(170,187,204,0)');
                C.hex.toRgba(hex, 0.1).should.equal('rgba(170,187,204,0.1)');
                C.hex.toRgba(hex, 0/0).should.equal(rgba);
                C.hex.toRgba('aabbcc').should.equal(rgba);
                C.hex.toRgba('#abc').should.equal(rgba);
                C.hex.toRgba('abc').should.equal(rgba);
                C.hex.toRgba('112233').should.equal('rgba(17,34,51,1)');
            });
        });

        describe('rgba', () => {

            it('toObj', () => {
                C.rgba.toObj('rgba(170,187,204,1)').should.eql({r: 170, g: 187, b: 204, a: 1});
                C.rgba.toObj('rgba(170,187,204)').should.eql({r: 170, g: 187, b: 204, a: 1});
                C.rgba.toObj('rgba(170,187,204,0)').should.eql({r: 170, g: 187, b: 204, a: 0});
                C.rgba.toObj('rgba(170,187,204,0.1)').should.eql({r: 170, g: 187, b: 204, a: 0.1});
            });

            it('toDec', () => {
                C.rgba.toDec('rgba(170,187,204,1)').should.equal(11189196);
                C.rgba.toDec('rgba(170,187,204)').should.equal(11189196);
                C.rgba.toDec('rgba(170,187,204,0)').should.equal(11189196);
                C.rgba.toDec('rgba(170,187,204,0.1)').should.equal(11189196);
            });

            it('toHex', () => {
                C.rgba.toHex('rgba(170,187,204,1)').should.equal('#aabbcc');
                C.rgba.toHex('rgba(170,187,204)').should.equal('#aabbcc');
                C.rgba.toHex('rgba(170,187,204,0)').should.equal('#aabbcc');
                C.rgba.toHex('rgba(170,187,204,0.1)').should.equal('#aabbcc');
            });
        });
    });

    // describe('rgbToDec', () => {

    //     it('should convert correctly', () => {
    //         ColorUtil.rgbToDec(171, 205, 239).should.equal(11259375);
    //     });
    // });

    // describe('decToRgbObject', () => {

    //     it('should convert correctly', () => {
    //         var color = ColorUtil.decToRgbObject(11259375);

    //         color.r.should.equal(171);
    //         color.g.should.equal(205);
    //         color.b.should.equal(239);
    //     });
    // });

    // describe('decAvgBrightness', () => {

    //     it('should convert correctly', () => {
    //         ColorUtil.decAvgBrightness(0xffffff).should.equal(1);
    //         ColorUtil.decAvgBrightness(0x0).should.equal(0);
    //         ColorUtil.decAvgBrightness(0x00ff00).should.be.closeTo(0.333, 0.01);
    //         ColorUtil.decAvgBrightness(0x7f007f).should.be.closeTo(0.333, 0.01);
    //     });
    // });

    // describe('decBrightness', () => {

    //     it('should convert correctly', () => {
    //         ColorUtil.decBrightness(0xffffff).should.equal(1);
    //         ColorUtil.decBrightness(0x0).should.equal(0);
    //         ColorUtil.decBrightness(0x00ff00).should.equal(1);
    //         ColorUtil.decBrightness(0x7f007f).should.be.closeTo(0.5, 0.01);
    //     });
    // });

    // describe('getGradientColor', () => {

    //     it('should get color from 2 point gradient', () => {
    //         ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0)
    //             .should.equal(0x00FF7F);
    //         ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 1)
    //             .should.equal(0xFF00FF);
    //         ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0.25)
    //             .should.equal(0x3FBF9F);
    //         ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0.5)
    //             .should.equal(0x7F7FBF);
    //         ColorUtil.getGradientColor([0x00FF7F, 0xFF00FF], 0.75)
    //             .should.equal(0xBF3FDF);
    //     });

    //     it('should get color from 3 point gradient', () => {
    //         ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0)
    //             .should.equal(0x0);
    //         ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 1)
    //             .should.equal(0xFFFFFF);
    //         ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.25)
    //             .should.equal(0x3F3F3F);
    //         ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.5)
    //             .should.equal(0x7F7F7F);
    //         ColorUtil.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.75)
    //             .should.equal(0xBFBFBF);
    //     });

    //     it('should get color from 4 point gradient', () => {
    //         ColorUtil.getGradientColor([0xFFFFFF, 0x0, 0x0, 0x0], 0)
    //             .should.equal(0xFFFFFF); // first color
    //         ColorUtil.getGradientColor([0x0, 0x0, 0x0, 0xFFFFFF], 1)
    //             .should.equal(0xFFFFFF); // last color
    //         ColorUtil.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x7F7F7F], 0.25)
    //             .should.equal(0xBFBFBF); // 75% between colors 0 and 1
    //         ColorUtil.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x0], 0.5)
    //             .should.equal(0xBFBFBF); // 50% beween colors 1 and 2
    //         ColorUtil.getGradientColor([0x0, 0x0, 0x7F7F7F, 0xFFFFFF], 0.75)
    //             .should.equal(0x9F9F9F); // 25% between colors 2 and 3
    //     });
    // });
});