
import chai from 'chai';
import sinon from 'sinon';
import C from '../src/ColorUtil.js';

chai.should();
let expect = require('chai').expect;

describe('ColorUtil', () => {

    beforeEach(() => {
        C._setSystemEndian(0);
    });

    describe('conversion functions', () => {

        let dec = 0xAABBCC;
        let rgb = {r: 170, g: 187, b: 204, a: 255};
        let hex = '#aabbcc';
        let rgba = 'rgba(170,187,204,1)';

        describe('rgb', () => {

            it('isValid', () => {
                C.rgb.isValid(dec).should.be.false;
                C.rgb.isValid(hex).should.be.false;
                C.rgb.isValid(rgba).should.be.false;
                C.rgb.isValid(rgb).should.be.true;
                C.rgb.isValid({r: 170, g: 187, b: 204}).should.be.true;
                C.rgb.isValid({h: 170, s: 187, l: 204}).should.be.false;
            });

            it('toInt', () => {
                C.rgb.toInt(rgb).should.equal(dec);
            });

            it('toHex', () => {
                C.rgb.toHex(rgb).should.equal(hex);
                C.rgb.toHex({r: 0, g: 187, b: 0}).should.equal('#00bb00');
                C.rgb.toHex({r: 0, g: 187, b: 0.56}).should.equal('#00bb00');
            });

            it('toRgbString', () => {
                C.rgb.toRgbString(rgb).should.equal(rgba);
                C.rgb.toRgbString({r: 170, g: 187, b: 204}).should.equal('rgba(170,187,204,1)');
                C.rgb.toRgbString({r: 170, g: 187, b: 204, a: 0}).should.equal('rgba(170,187,204,0)');
                C.rgb.toRgbString({r: 170, g: 187, b: 204, a: 85}).should.equal('rgba(170,187,204,0.3333333333333333)');
                C.rgb.toRgbString({r: 170, g: 187, b: 204, a: 0/0}).should.equal(rgba);
            });

            it('toUint32', () => {
                C.rgb.toUint32(rgb).should.equal(0xFFCCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204}).should.equal(0xFFCCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0xFFCCBBAA);

                C._setSystemEndian(1);
                C.rgb.toUint32(rgb).should.equal(0xAABBCCFF);
                C.rgb.toUint32({r: 170, g: 187, b: 204}).should.equal(0xAABBCCFF);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 0}).should.equal(0xAABBCC00);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 85}).should.equal(0xAABBCC55);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0xAABBCCFF);
            });

            it('toInt32', () => {
                C.rgb.toInt32(rgb).should.equal(-3359830); // 0xFFCCBBAA
                C.rgb.toInt32({r: 170, g: 187, b: 204}).should.equal(-3359830); // 0xFFCCBBAA
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(-3359830); // 0xFFCCBBAA

                C._setSystemEndian(1);
                C.rgb.toInt32(rgb).should.equal(-1430532865); // 0xAABBCCFF
                C.rgb.toInt32({r: 170, g: 187, b: 204}).should.equal(-1430532865); // 0xAABBCCFF
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 0}).should.equal(-1430533120); // 0xAABBCC00
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 85}).should.equal(-1430533035); // 0xAABBCC55
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(-1430532865); // 0xAABBCCFF
            });

            it('toHsl', () => {
                C.rgb.toHsl({r: 0, g: 0, b: 0}).should.eql({h:0, s: 0, l:0, a:1});
                C.rgb.toHsl({r: 255, g: 255, b: 255}).should.eql({h:0, s: 0, l:1, a:1});
                C.rgb.toHsl({r: 255, g: 0, b: 0}).should.eql({h:0, s: 1, l:0.5, a:1});
                C.rgb.toHsl({r: 0, g: 255, b: 0}).should.eql({h:1/3, s: 1, l:0.5, a:1});
                C.rgb.toHsl({r: 0, g: 0, b: 255}).should.eql({h:2/3, s: 1, l:0.5, a:1});
                C.rgb.toHsl({r: 255, g: 255, b: 0}).should.eql({h:1/6, s: 1, l:0.5, a:1});
                C.rgb.toHsl({r: 192, g: 192, b: 192}).should.eql({h:0, s: 0, l:0.7529411764705882, a:1});
                C.rgb.toHsl({r: 128, g: 0, b: 0}).should.eql({h:0, s: 1, l:0.25098039215686274, a:1});
                C.rgb.toHsl({r: 128, g: 128, b: 0}).should.eql({h:1/6, s: 1, l:0.25098039215686274, a:1});
                C.rgb.toHsl({r: 128, g: 0, b: 128}).should.eql({h:5/6, s: 1, l:0.25098039215686274, a:1});
                C.rgb.toHsl({r: 0, g: 0, b: 128}).should.eql({h:2/3, s: 1, l:0.25098039215686274, a:1});
                C.rgb.toHsl({r: 0, g: 0, b: 0, a:85}).should.eql({h:0, s: 0, l:0, a:0.3333333333333333});
                C.rgb.toHsl({r: 255, g: 0, b: 120}).should.eql({h:0.9215686274509803, s: 1, l: 0.5, a:1});
            });

            it('toHsv', () => {
                C.rgb.toHsv({r: 0, g: 0, b: 0}).should.eql({h:0, s: 0, v:0, a:1});
                C.rgb.toHsv({r: 255, g: 255, b: 255}).should.eql({h:0, s: 0, v:1, a:1});
                C.rgb.toHsv({r: 255, g: 0, b: 0}).should.eql({h:0, s: 1, v:1, a:1});
                C.rgb.toHsv({r: 0, g: 255, b: 0}).should.eql({h:2/6, s: 1, v:1, a:1});
                C.rgb.toHsv({r: 0, g: 0, b: 255}).should.eql({h:4/6, s: 1, v:1, a:1});
                C.rgb.toHsv({r: 255, g: 255, b: 0}).should.eql({h:1/6, s: 1, v:1, a:1});
                C.rgb.toHsv({r: 192, g: 192, b: 192}).should.eql({h:0, s: 0, v:0.7529411764705882, a:1});
                C.rgb.toHsv({r: 128, g: 0, b: 0}).should.eql({h:0, s: 1, v:0.5019607843137255, a:1});
                C.rgb.toHsv({r: 128, g: 128, b: 0}).should.eql({h:1/6, s: 1, v:0.5019607843137255, a:1});
                C.rgb.toHsv({r: 128, g: 0, b: 128}).should.eql({h:5/6, s: 1, v:0.5019607843137255, a:1});
                C.rgb.toHsv({r: 0, g: 0, b: 128}).should.eql({h:4/6, s: 1, v:0.5019607843137255, a:1});
                C.rgb.toHsv({r: 0, g: 0, b: 0, a:85}).should.eql({h:0, s: 0, v:0, a:0.3333333333333333});
                C.rgb.toHsv({r: 255, g: 0, b: 120}).should.eql({h:0.9215686274509803, s: 1, v: 1, a:1});
            });
        });

        describe('int', () => {

            it('isValid', () => {
                C.int.isValid(0xFFFFFF).should.be.true;
                C.int.isValid(0).should.be.true;
                C.int.isValid(0x1000000).should.be.false;
                C.int.isValid(-350456).should.be.false;
                C.int.isValid(hex).should.be.false;
                C.int.isValid(rgba).should.be.false;
                C.int.isValid(rgb).should.be.false;
            });

            it('toRgb', () => {
                C.int.toRgb(dec).should.eql(rgb);
                C.int.toRgb(dec, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.int.toRgb(dec, 10).should.eql({r: 170, g: 187, b: 204, a: 10});
            });

            it('toHex', () => {
                C.int.toHex(dec).should.equal(hex);
                C.int.toHex(0x00bb00).should.equal('#00bb00');
            });

            it('toRgbString', () => {
                C.int.toRgbString(dec).should.equal(rgba);
                C.int.toRgbString(dec, 0).should.equal('rgba(170,187,204,0)');
                C.int.toRgbString(dec, 0.1).should.equal('rgba(170,187,204,0.1)');
            });
        });

        describe('hex', () => {

            it('isValid', () => {
                C.hex.isValid(0xFFFFFF).should.be.false;
                C.hex.isValid(rgb).should.be.false;
                C.hex.isValid('test').should.be.false;
                C.hex.isValid('#1245').should.be.false;
                C.hex.isValid('#FFF').should.be.true;
                C.hex.isValid('#FFFFFF').should.be.true;
                C.hex.isValid('#FFFFFG').should.be.false;
            });

            it('toRgb', () => {
                C.hex.toRgb(hex).should.eql(rgb);
                C.hex.toRgb(hex, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.hex.toRgb(hex, 85).should.eql({r: 170, g: 187, b: 204, a: 85});
                C.hex.toRgb('#abc').should.eql(rgb);
                C.hex.toRgb('abc').should.eql(rgb);
                C.hex.toRgb('aabbcc').should.eql(rgb);
                expect(C.hex.toRgb('#abcc')).to.be.null;
            });

            it('toInt', () => {
                C.hex.toInt(hex).should.equal(dec);
                C.hex.toInt('aabbcc').should.equal(dec);
                C.hex.toInt('#abc').should.equal(dec);
                C.hex.toInt('abc').should.equal(dec);
                C.hex.toInt('#112233').should.equal(0x112233);
            });

            it('toRgbString', () => {
                C.hex.toRgbString(hex).should.equal(rgba);
                C.hex.toRgbString(hex, 0).should.equal('rgba(170,187,204,0)');
                C.hex.toRgbString(hex, 0.1).should.equal('rgba(170,187,204,0.1)');
                C.hex.toRgbString('aabbcc').should.equal(rgba);
                C.hex.toRgbString('#abc').should.equal(rgba);
                C.hex.toRgbString('abc').should.equal(rgba);
                C.hex.toRgbString('112233').should.equal('rgba(17,34,51,1)');
            });
        });

        describe('rgbString', () => {

            it('isValid', () => {
                C.rgbString.isValid(0xFFFFFF).should.be.false;
                C.rgbString.isValid(rgb).should.be.false;
                C.rgbString.isValid('test').should.be.false;
                C.rgbString.isValid('rgba(0,0,0)').should.be.true;
                C.rgbString.isValid('rgba(0,0,0,0)').should.be.true;
                C.rgbString.isValid('rgb(0,0,0,0)').should.be.true;
                C.rgbString.isValid('rgb(0.1,0,0,0)').should.be.false;
                C.rgbString.isValid('rgb ( 0 , 0 , 0 , 0 )').should.be.true;
                C.rgbString.isValid('rgba ( 0 , 0 , 0 )').should.be.true;
                C.rgbString.isValid('rgba ( 0 , 0 , 0, 0,1 )').should.be.false;
            });

            it('toRgb', () => {
                C.rgbString.toRgb('rgba(170,187,204,1)').should.eql({r: 170, g: 187, b: 204, a: 255});
                C.rgbString.toRgb('rgba(170,187,204)').should.eql({r: 170, g: 187, b: 204, a: 255});
                C.rgbString.toRgb('rgba(170,187,204,0)').should.eql({r: 170, g: 187, b: 204, a: 0});
                C.rgbString.toRgb('rgba(170,187,204,0.1)').should.eql({r: 170, g: 187, b: 204, a: 25});
            });

            it('toInt', () => {
                C.rgbString.toInt('rgba(170,187,204,1)').should.equal(11189196);
                C.rgbString.toInt('rgba(170,187,204)').should.equal(11189196);
                C.rgbString.toInt('rgba(170,187,204,0)').should.equal(11189196);
                C.rgbString.toInt('rgba(170,187,204,0.1)').should.equal(11189196);
            });

            it('toHex', () => {
                C.rgbString.toHex('rgba(170,187,204,1)').should.equal('#aabbcc');
                C.rgbString.toHex('rgba(170,187,204)').should.equal('#aabbcc');
                C.rgbString.toHex('rgba(170,187,204,0)').should.equal('#aabbcc');
                C.rgbString.toHex('rgba(170,187,204,0.1)').should.equal('#aabbcc');
            });
        });

        describe('hsl', () => {

            it('isValid', () => {
                C.hsl.isValid(dec).should.be.false;
                C.hsl.isValid(hex).should.be.false;
                C.hsl.isValid(rgba).should.be.false;
                C.hsl.isValid({h: 0, s: 0, l: 0}).should.be.true;
                C.hsl.isValid({h: 0, s: 0, v: 0}).should.be.false;
            });

            it('toRgb', () => {
                C.hsl.toRgb({h: 0, s: 0, l: 0}).should.eql({r: 0, g: 0, b: 0, a: 255});
                C.hsl.toRgb({h: 0, s: 0, l: 1}).should.eql({r: 255, g: 255, b: 255, a: 255});
                C.hsl.toRgb({h: 0, s: 1, l: 0.5}).should.eql({r: 255, g: 0, b: 0, a: 255});
                C.hsl.toRgb({h: 2/6, s: 1, l: 0.5}).should.eql({r: 0, g: 255, b: 0, a: 255}); // h: 120deg
                C.hsl.toRgb({h: 4/6, s: 1, l: 0.5}).should.eql({r: 0, g: 0, b: 255, a: 255}); // h: 240eg
                C.hsl.toRgb({h: 1/6, s: 1, l: 0.5}).should.eql({r: 255, g: 255, b: 0, a: 255}); // h: 60deg
                C.hsl.toRgb({h: 3/6, s: 1, l: 0.5}).should.eql({r: 0, g: 255, b: 255, a: 255}); // h: 180deg
                C.hsl.toRgb({h: 5/6, s: 1, l: 0.5}).should.eql({r: 255, g: 0, b: 255, a: 255}); // h: 300deg
                C.hsl.toRgb({h: 0, s: 0, l: 0.75}).should.eql({r: 191, g: 191, b: 191, a: 255});
                C.hsl.toRgb({h: 0, s: 1, l: 0.25}).should.eql({r: 128, g: 0, b: 0, a: 255});
                C.hsl.toRgb({h: 1/6, s: 1, l: 0.25}).should.eql({r: 128, g: 128, b: 0, a: 255}); // h: 60deg
                C.hsl.toRgb({h: 2/6, s: 1, l: 0.25}).should.eql({r: 0, g: 128, b: 0, a: 255}); // h: 120deg
                C.hsl.toRgb({h: 5/6, s: 1, l: 0.25}).should.eql({r: 128, g: 0, b: 128, a: 255}); // h: 300deg
                C.hsl.toRgb({h: 3/6, s: 1, l: 0.25}).should.eql({r: 0, g: 128, b: 128, a: 255}); // h: 180deg
                C.hsl.toRgb({h: 4/6, s: 1, l: 0.25}).should.eql({r: 0, g: 0, b: 128, a: 255}); // h: 240deg
                C.hsl.toRgb({h: 0, s: 0, l: 0, a: 0.1}).should.eql({r: 0, g: 0, b: 0, a: 26});
            });

            it('toHslString', () => {
                C.hsl.toHslString({h: 0.5, s: 0.5, l: 0.1}).should.eql('hsla(180,50%,10%,1)');
                C.hsl.toHslString({h: 0.5, s: 0.5, l: 0.1, a: 0.5}).should.eql('hsla(180,50%,10%,0.5)');
                C.hsl.toHslString({h: 0.5, s: 0.5, l: 0.1, a: 0}).should.eql('hsla(180,50%,10%,0)');
            });

            it('toHsv', () => {
                console.log(C.hsl.toHsv({h: 0.5, s: 0.5, l: 0.1}));
                console.log(C.rgb.toHsv(C.hsl.toRgb({h: 0.5, s: 0.5, l: 0.1})));

            });
        });

        describe('hslString', () => {

            it('isValid', () => {
                C.hslString.isValid(dec).should.be.false;
                C.hslString.isValid(hex).should.be.false;
                C.hslString.isValid(rgba).should.be.false;
                C.hslString.isValid({h: 0, s: 0, l: 0}).should.be.false;
                C.hslString.isValid('hsl(5, 10%, 20%)').should.be.true;
                C.hslString.isValid('hsla(5, 10%, 20%)').should.be.true;
                C.hslString.isValid('hsla(5, 10%, 20%, 0.5)').should.be.true;
                C.hslString.isValid('hsla(5, 10, 20, 0.5)').should.be.false;
                C.hslString.isValid('hsla(5, 10)').should.be.false;
                C.hslString.isValid('hsla(5, 10%, 20%, 0,5)').should.be.false;
            });

            it('toHsl', () => {
                C.hslString.toHsl('hsla(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});
                C.hslString.toHsl('hsl(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});
                C.hslString.toHsl('hsl(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});
                C.hslString.toHsl('hsla(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});

                expect(C.hslString.toHsl('hsl(180, 50, 60, 0.5)')).to.be.null;
            });
        });

        describe('hsv', () => {

            it('isValid', () => {
                C.hsv.isValid(dec).should.be.false;
                C.hsv.isValid(hex).should.be.false;
                C.hsv.isValid(rgba).should.be.false;
                C.hsv.isValid({h: 0, s: 0, v: 0}).should.be.true;
                C.hsv.isValid({h: 0, s: 0, l: 0}).should.be.false;
            });

            it('toRgb', () => {
                C.hsv.toRgb({h: 0, s: 0, v: 0}).should.eql({r: 0, g: 0, b: 0, a: 255});
                C.hsv.toRgb({h: 0, s: 0, v: 1}).should.eql({r: 255, g: 255, b: 255, a: 255});
                C.hsv.toRgb({h: 0, s: 1, v: 1}).should.eql({r: 255, g: 0, b: 0, a: 255});
                C.hsv.toRgb({h: 2/6, s: 1, v: 1}).should.eql({r: 0, g: 255, b: 0, a: 255});
                C.hsv.toRgb({h: 4/6, s: 1, v: 1}).should.eql({r: 0, g: 0, b: 255, a: 255});
                C.hsv.toRgb({h: 1/6, s: 1, v: 1}).should.eql({r: 255, g: 255, b: 0, a: 255});
                C.hsv.toRgb({h: 3/6, s: 1, v: 1}).should.eql({r: 0, g: 255, b: 255, a: 255});
                C.hsv.toRgb({h: 5/6, s: 1, v: 1}).should.eql({r: 255, g: 0, b: 255, a: 255});
                C.hsv.toRgb({h: 0, s: 0, v: 0.75}).should.eql({r: 191, g: 191, b: 191, a: 255});
                C.hsv.toRgb({h: 0, s: 1, v: 0.5}).should.eql({r: 128, g: 0, b: 0, a: 255});
                C.hsv.toRgb({h: 1/6, s: 1, v: 0.5}).should.eql({r: 128, g: 128, b: 0, a: 255});
                C.hsv.toRgb({h: 2/6, s: 1, v: 0.5}).should.eql({r: 0, g: 128, b: 0, a: 255});
                C.hsv.toRgb({h: 5/6, s: 1, v: 0.5}).should.eql({r: 128, g: 0, b: 128, a: 255});
                C.hsv.toRgb({h: 3/6, s: 1, v: 0.5}).should.eql({r: 0, g: 128, b: 128, a: 255});
                C.hsv.toRgb({h: 4/6, s: 1, v: 0.5}).should.eql({r: 0, g: 0, b: 128, a: 255});
                C.hsv.toRgb({h: 0, s: 0, v: 0, a: 0.1}).should.eql({r: 0, g: 0, b: 0, a: 26});
            });
        });

        describe('Any', () => {

            it('should throw with incorrect color format', () => {
                expect(() => {
                    C.any.toRgb({h:0, s:0, x:0});
                }).to.throw;

                expect(() => {
                    C.any.toRgb('#qwe');
                }).to.throw;
            });

            let rgb = {r: 0xAA, g: 0xBB, b: 0xCC, a:0xFF};
            let hsl = {h: 0.5833333333333334, s: 0.2500000000000002, l: 0.7333333333333334, a: 1};
            let hsv = {h: 0.5833333333333334, s: 0.16666666666666677, v: 0.8, a: 1};

            it('should return same color if target is same as color', () => {
                C.any.toRgb(rgb).should.equal(rgb);
                C.any.toInt(0xAABBCC).should.equal(0xAABBCC);
                C.any.toHex("#AABBCC").should.equal("#AABBCC");
                C.any.toRgbString('rgb(0,0,0)').should.equal('rgb(0,0,0)');
                C.any.toHsl(hsl).should.equal(hsl);
                C.any.toHsv(hsv).should.equal(hsv);
            });

            it('should do rgb type conversions', () => {
                C.any.toRgb(0xAABBCC).should.eql(rgb);
                C.any.toRgb('#AABBCC').should.eql(rgb);
                C.any.toRgb('rgba(170,187,204,1)').should.eql(rgb);
                C.any.toInt('#AABBCC').should.eql(0xAABBCC);
                C.any.toInt('rgba(170,187,204,1)').should.eql(0xAABBCC);
                C.any.toInt(rgb).should.eql(0xAABBCC);
                C.any.toHex(0xAABBCC).should.eql("#aabbcc");
                C.any.toHex('rgba(170,187,204,1)').should.eql("#aabbcc");
                C.any.toHex(rgb).should.eql("#aabbcc");
                C.any.toRgbString(rgb).should.eql('rgba(170,187,204,1)');
                C.any.toRgbString(0xAABBCC).should.eql('rgba(170,187,204,1)');
                C.any.toRgbString('#AABBCC').should.eql('rgba(170,187,204,1)');

                // C.any.toRgb(0xFFAABBCC).should.eql({r:0xCC, g: 0xBB, b: 0xAA, a: 0xFF});
                // C.any.toRgb(-3359830).should.eql({r:0xAA, g: 0xBB, b: 0xCC, a: 0xFF}); // 0xFFCCBBAA, 0xAABBGGRR
            });

            it('should do hsl -> rgb conversion', () => {
                C.any.toRgb(hsl).should.eql(rgb);
            });

            it('should do hsv -> rgb conversion', () => {
                C.any.toRgb(hsv).should.eql(rgb);
            });

            it('should do rgb -> hsl conversion', () => {
                C.any.toHsl(rgb).should.eql(hsl);
            });

            it('should do rgb -> hsv conversion', () => {
                C.any.toHsv(rgb).should.eql(hsv);
            });

            it('should do hsl -> rgb sub type conversion', () => {
                C.any.toInt(hsl).should.equal(0xAABBCC);
                C.any.toHex(hsl).should.equal('#aabbcc');
                C.any.toRgbString(hsl).should.equal('rgba(170,187,204,1)');
            });

            it('should do hsl subtype -> hsv conversion', () => {
                C.any.toHsv('hsl(180, 50%, 60%)').should.eql({h: 0.5, s: 0.5, v: 0.8, a: 1});
            });

            it('should do hsl subtype -> rgb sub type conversion', () => {
                C.any.toInt('hsl(180, 50%, 60%)').should.equal(0x66CCCC);
                C.any.toHex('hsl(180, 50%, 60%)').should.equal("#66cccc");
                C.any.toRgbString('hsl(180, 50%, 60%)').should.equal('rgba(102,204,204,1)');
            });
        });

        describe('combinations', () => {

            it('rgb-hsl-rgb', () => {
                let rgb = {r: 255, g: 255, b: 0, a:255};
                let hsl = {h: 1/6, s: 1, l: 0.5, a: 1};

                let rgbToHsl = C.rgb.toHsl(rgb);
                rgbToHsl.should.eql(hsl);

                let hslToRgb = C.hsl.toRgb(hsl);
                hslToRgb.should.eql(rgb);
            });

            it('rgb-hsv-rgb', () => {
                let rgb = {r: 255, g: 255, b: 0, a:255};
                let hsv = {h: 1/6, s: 1, v: 1, a: 1};

                let rgbToHsv = C.rgb.toHsv(rgb);
                rgbToHsv.should.eql(hsv);

                let hsvToRgb = C.hsv.toRgb(hsv);
                hsvToRgb.should.eql(rgb);
            });
        });
    });

    describe('convert', () => {

        it('should convert single color with one conversion', () => {
            C.convert(0xFF0000, C.int.toHex).should.equal("#ff0000");
        });

        it('should convert single color with two conversions', () => {
            C.convert(0xFF0000, C.int.toHex, C.hex.toInt).should.equal(0xFF0000);
        });

        it('should convert array of colors with one conversion', () => {
            C.convert([0xFF0000, 0x00FF00], C.int.toHex)
                .should.eql(["#ff0000", "#00ff00"]);
        });

        it('should convert array of colors with two conversions', () => {
            C.convert([0xFF0000, 0x00FF00], C.int.toHex, C.hex.toInt)
                .should.eql([0xFF0000, 0x00FF00]);
        });

        it('should convert matrix of colors with one conversion', () => {
            C.convert([[0xFF0000, 0x00FF00], 0x0000FF], C.int.toHex)
                .should.eql([["#ff0000", "#00ff00"], "#0000ff"]);
        });

        it('should convert matrix of colors with two conversions', () => {
            C.convert([[0xFF0000, 0x00FF00], 0x0000FF], C.int.toHex, C.hex.toInt)
                .should.eql([[0xFF0000, 0x00FF00], 0x0000FF]);
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

        var toRgb = C.int.toRgb;
        var fromRgb = C.rgb.toInt;

        it('should get color from 1 point gradient', () => {
            C.getGradientColor([0x00FF7F], 0.5, toRgb, fromRgb)
                .should.equal(0x00FF7F);
        });

        it('should get color from 2 point gradient', () => {
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0, toRgb, fromRgb)
                .should.equal(0x00FF7F);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 1, toRgb, fromRgb)
                .should.equal(0xFF00FF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.25, toRgb, fromRgb)
                .should.equal(0x3FBF9F);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.5, toRgb, fromRgb)
                .should.equal(0x7F7FBF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], 0.75, toRgb, fromRgb)
                .should.equal(0xBF3FDF);
        });

        it('should get color from 3 point gradient', () => {
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0, toRgb, fromRgb)
                .should.equal(0x0);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 1, toRgb, fromRgb)
                .should.equal(0xFFFFFF);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.25, toRgb, fromRgb)
                .should.equal(0x3F3F3F);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.5, toRgb, fromRgb)
                .should.equal(0x7F7F7F);
            C.getGradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.75, toRgb, fromRgb)
                .should.equal(0xBFBFBF);
        });

        it('should get color from 4 point gradient', () => {
            C.getGradientColor([0xFFFFFF, 0x0, 0x0, 0x0], 0, toRgb, fromRgb)
                .should.equal(0xFFFFFF); // first color
            C.getGradientColor([0x0, 0x0, 0x0, 0xFFFFFF], 1, toRgb, fromRgb)
                .should.equal(0xFFFFFF); // last color
            C.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x7F7F7F], 0.25, toRgb, fromRgb)
                .should.equal(0xBFBFBF); // 75% between colors 0 and 1
            C.getGradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x0], 0.5, toRgb, fromRgb)
                .should.equal(0xBFBFBF); // 50% beween colors 1 and 2
            C.getGradientColor([0x0, 0x0, 0x7F7F7F, 0xFFFFFF], 0.75, toRgb, fromRgb)
                .should.equal(0x9F9F9F); // 25% between colors 2 and 3
        });

        it('should return edge colors when value is out of range', () => {
            C.getGradientColor([0x00FF7F, 0xFF00FF], 2, toRgb, fromRgb)
                .should.equal(0xFF00FF);
            C.getGradientColor([0x00FF7F, 0xFF00FF], -2, toRgb, fromRgb)
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