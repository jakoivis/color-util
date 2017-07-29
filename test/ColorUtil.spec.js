
import chai from 'chai';
import C from '../src/ColorUtil.js';

chai.should();
let expect = require('chai').expect;

describe('ColorUtil', () => {

    describe('conversion functions', () => {

        let dec = 0xAABBCC;
        let rgb = {r: 170, g: 187, b: 204, a: 255};
        let hex = '#aabbcc';
        let rgba = 'rgba(170,187,204,1)';

        describe('rgb', () => {

            it('test', () => {
                C.rgb.test(dec).should.be.false;
                C.rgb.test(hex).should.be.false;
                C.rgb.test(rgba).should.be.false;
                C.rgb.test(rgb).should.be.true;
                C.rgb.test({r: 170, g: 187, b: 204}).should.be.true;
                C.rgb.test({h: 170, s: 187, l: 204}).should.be.false;
            });

            it('toInt', () => {
                C.rgb.toInt(rgb).should.equal(dec);
                C.rgb.toInt({r: 170.1, g: 187.5, b: 204.9, a: 255}).should.equal(dec);
            });

            it('toHex', () => {
                C.rgb.toHex(rgb).should.equal(hex);
                C.rgb.toHex({r: 0, g: 187, b: 0}).should.equal('#00bb00');
                C.rgb.toHex({r: 0, g: 187, b: 0.56}).should.equal('#00bb00');
            });

            it('toRgbString', () => {
                C.rgb.toRgbString({r: 170, g: 187, b: 204}).should.equal('rgb(170,187,204)');
                C.rgb.toRgbString({r: 170.1, g: 187.1, b: 204.1}).should.equal('rgb(170,187,204)');
            });

            it('toRgbaString', () => {
                C.rgb.toRgbaString({r: 170, g: 187, b: 204, a: 127.5}).should.equal('rgba(170,187,204,0.5)');
                C.rgb.toRgbaString({r: 170, g: 187, b: 204}).should.equal('rgba(170,187,204,NaN)');
                C.rgb.toRgbaString({r: 170.1, g: 187.1, b: 204.1, a: 255}).should.equal('rgba(170,187,204,1)');
            });

            it('toUint32', () => {
                C.rgb.toUint32(rgb).should.equal(0xFFCCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204}).should.equal(0x00CCBBAA);
                C.rgb.toUint32({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0x00CCBBAA);
            });

            it('toUint32BigEndian', () => {
                C.rgb.toUint32BigEndian(rgb).should.equal(0xAABBCCFF);
                C.rgb.toUint32BigEndian({r: 170, g: 187, b: 204, a: 85}).should.equal(0xAABBCC55);
                C.rgb.toUint32BigEndian({r: 170, g: 187, b: 204}).should.equal(0xAABBCC00);
                C.rgb.toUint32BigEndian({r: 170, g: 187, b: 204, a: 0}).should.equal(0xAABBCC00);
                C.rgb.toUint32BigEndian({r: 170, g: 187, b: 204, a: 0/0}).should.equal(0xAABBCC00);
            });

            it('toInt32', () => {
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 255}).should.equal(-3359830); // 0xFFCCBBAA
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 0}).should.equal(0x00CCBBAA);
                C.rgb.toInt32({r: 170, g: 187, b: 204}).should.equal(0x00CCBBAA);
                C.rgb.toInt32({r: 170, g: 187, b: 204, a: 85}).should.equal(0x55CCBBAA);
                C.rgb.toInt32({r: 170, g: NaN, b: 204, a: NaN}).should.equal(0x00CC00AA);
            });

            it('toInt32BigEndian', () => {
                let AABBCCFF = -1430532865;
                let AABBCC55 = -1430533035
                let AABBCC00 = -1430533120;
                let AA00CC00 = -1442788352;

                C.rgb.toInt32BigEndian(rgb).should.equal(AABBCCFF);
                C.rgb.toInt32BigEndian({r: 170, g: 187, b: 204, a: 85}).should.equal(AABBCC55);
                C.rgb.toInt32BigEndian({r: 170, g: 187, b: 204, a: 0}).should.equal(AABBCC00);
                C.rgb.toInt32BigEndian({r: 170, g: 187, b: 204}).should.equal(AABBCC00);
                C.rgb.toInt32BigEndian({r: 170, g: NaN, b: 204, a: NaN}).should.equal(AA00CC00);
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

            it('test', () => {
                C.int.test(0xFFFFFF).should.be.true;
                C.int.test(0).should.be.true;
                C.int.test(0x1000000).should.be.false;
                C.int.test(-350456).should.be.false;
                C.int.test(hex).should.be.false;
                C.int.test(rgba).should.be.false;
                C.int.test(rgb).should.be.false;
            });

            it('toRgb', () => {
                C.int.toRgb(0xAABBCC).should.eql(rgb);
                C.int.toRgb(0xAABBCC, 0).should.eql({r: 170, g: 187, b: 204, a: 0});
                C.int.toRgb(0xAABBCC, 10).should.eql({r: 170, g: 187, b: 204, a: 10});
            });

            it('toHex', () => {
                C.int.toHex(0xAABBCC).should.equal(hex);
                C.int.toHex(0x00bb00).should.equal('#00bb00');
            });

            it('toRgbString', () => {
                C.int.toRgbString(0xAABBCC).should.equal('rgb(170,187,204)');
            });

            it('toRgbaString', () => {
                C.int.toRgbaString(0xAABBCC).should.equal('rgba(170,187,204,1)');
                C.int.toRgbaString(0xAABBCC, 0).should.equal('rgba(170,187,204,0)');
                C.int.toRgbaString(0xAABBCC, 0.1).should.equal('rgba(170,187,204,0.1)');
            });
        });

        describe('hex', () => {

            it('test', () => {
                C.hex.test(0xFFFFFF).should.be.false;
                C.hex.test(rgb).should.be.false;
                C.hex.test('test').should.be.false;
                C.hex.test('#1245').should.be.false;
                C.hex.test('#FFF').should.be.true;
                C.hex.test('#FFFFFF').should.be.true;
                C.hex.test('#FFFFFG').should.be.false;
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
                C.hex.toRgbString('#aabbcc').should.equal('rgb(170,187,204)');
                C.hex.toRgbString('aabbcc').should.equal('rgb(170,187,204)');
                C.hex.toRgbString('#abc').should.equal('rgb(170,187,204)');
                C.hex.toRgbString('abc').should.equal('rgb(170,187,204)');
                C.hex.toRgbString('112233').should.equal('rgb(17,34,51)');
            });

            it('toRgbaString', () => {
                C.hex.toRgbaString(hex).should.equal('rgba(170,187,204,1)');
                C.hex.toRgbaString(hex, 0).should.equal('rgba(170,187,204,0)');
                C.hex.toRgbaString(hex, 0.1).should.equal('rgba(170,187,204,0.1)');
                C.hex.toRgbaString('aabbcc').should.equal('rgba(170,187,204,1)');
                C.hex.toRgbaString('#abc').should.equal('rgba(170,187,204,1)');
                C.hex.toRgbaString('abc').should.equal('rgba(170,187,204,1)');
                C.hex.toRgbaString('112233').should.equal('rgba(17,34,51,1)');
            });
        });

        describe('rgbString', () => {

            it('test', () => {
                C.rgbString.test(0xFFFFFF).should.be.false;
                C.rgbString.test(rgb).should.be.false;
                C.rgbString.test('test').should.be.false;
                C.rgbString.test('rgba(0,0,0)').should.be.true;
                C.rgbString.test('rgba(0,0,0,0)').should.be.false;
                C.rgbString.test('rgb(0,0,0,0)').should.be.false;
                C.rgbString.test('rgb(0.1,0,0)').should.be.false;
                C.rgbString.test('rgb ( 0 , 0 , 0 )').should.be.true;
            });

            it('toRgb', () => {
                C.rgbString.toRgb('rgb(170,187,204)').should.eql({r: 170, g: 187, b: 204, a: 255});

                expect(C.rgbString.toRgb('rgba(170,187,204,1)')).to.be.null;
            });

            it('toInt', () => {
                C.rgbString.toInt('rgb(170,187,204)').should.equal(11189196);

                expect(C.rgbString.toInt('rgba(170,187,204,1)')).to.be.null;
            });

            it('toHex', () => {
                C.rgbString.toHex('rgb(170,187,204)').should.equal('#aabbcc');

                expect(C.rgbString.toHex('rgba(170,187,204,1)')).to.be.null;
            });
        });

        describe('rgbaString', () => {

            it('test', () => {
                C.rgbaString.test(0xFFFFFF).should.be.false;
                C.rgbaString.test(rgb).should.be.false;
                C.rgbaString.test('test').should.be.false;
                C.rgbaString.test('rgba(0,0,0)').should.be.false;
                C.rgbaString.test('rgba(0,0,0,0)').should.be.true;
                C.rgbaString.test('rgb(0,0,0,0)').should.be.true;
                C.rgbaString.test('rgb(0.1,0,0,0)').should.be.false;
                C.rgbaString.test('rgb ( 0 , 0 , 0 , 0 )').should.be.true;
                C.rgbaString.test('rgba ( 0 , 0 , 0 )').should.be.false;
                C.rgbaString.test('rgba ( 0 , 0 , 0, 0,1 )').should.be.false;
            });

            it('toRgb', () => {
                C.rgbaString.toRgb('rgba(170,187,204,1)').should.eql({r: 170, g: 187, b: 204, a: 255});
                C.rgbaString.toRgb('rgba(170,187,204,0)').should.eql({r: 170, g: 187, b: 204, a: 0});
                C.rgbaString.toRgb('rgba(170,187,204,0.1)').should.eql({r: 170, g: 187, b: 204, a: 25});

                expect(C.rgbaString.toRgb('rgba(170,187,204)')).to.be.null;
            });

            it('toInt', () => {
                C.rgbaString.toInt('rgba(170,187,204,1)').should.equal(11189196);
                C.rgbaString.toInt('rgba(170,187,204,0)').should.equal(11189196);
                C.rgbaString.toInt('rgba(170,187,204,0.1)').should.equal(11189196);

                expect(C.rgbaString.toInt('rgba(170,187,204)')).to.be.null;
            });

            it('toHex', () => {
                C.rgbaString.toHex('rgba(170,187,204,1)').should.equal('#aabbcc');
                C.rgbaString.toHex('rgba(170,187,204,0)').should.equal('#aabbcc');
                C.rgbaString.toHex('rgba(170,187,204,0.1)').should.equal('#aabbcc');

                expect(C.rgbaString.toHex('rgba(170,187,204)')).to.be.null;
            });
        });

        describe('hsl', () => {

            it('test', () => {
                C.hsl.test(dec).should.be.false;
                C.hsl.test(hex).should.be.false;
                C.hsl.test(rgba).should.be.false;
                C.hsl.test({h: 0, s: 0, l: 0}).should.be.true;
                C.hsl.test({h: 0, s: 0, v: 0}).should.be.false;
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
                C.hsl.toRgb({h: 0, s: 0, l: 0.75}).should.eql({r: 191.25, g: 191.25, b: 191.25, a: 255});
                C.hsl.toRgb({h: 0, s: 1, l: 0.25}).should.eql({r: 127.5, g: 0, b: 0, a: 255});
                C.hsl.toRgb({h: 1/6, s: 1, l: 0.25}).should.eql({r: 127.5, g: 127.5, b: 0, a: 255}); // h: 60deg
                C.hsl.toRgb({h: 2/6, s: 1, l: 0.25}).should.eql({r: 0, g: 127.5, b: 0, a: 255}); // h: 120deg
                C.hsl.toRgb({h: 5/6, s: 1, l: 0.25}).should.eql({r: 127.5, g: 0, b: 127.5, a: 255}); // h: 300deg
                C.hsl.toRgb({h: 3/6, s: 1, l: 0.25}).should.eql({r: 0, g: 127.5, b: 127.5, a: 255}); // h: 180deg
                C.hsl.toRgb({h: 4/6, s: 1, l: 0.25}).should.eql({r: 0, g: 0, b: 127.5, a: 255}); // h: 240deg
                C.hsl.toRgb({h: 0, s: 0, l: 0, a: 0.1}).should.eql({r: 0, g: 0, b: 0, a: 25.5});
            });

            it('toHslString', () => {
                C.hsl.toHslString({h: 0.5, s: 0.5, l: 0.1}).should.eql('hsl(180,50%,10%)');
            });

            it('toHslaString', () => {
                C.hsl.toHslaString({h: 0.5, s: 0.5, l: 0.1, a: 0.5}).should.equal('hsla(180,50%,10%,0.5)');
                C.hsl.toHslaString({h: 0.5, s: 0.5, l: 0.1, a: 0}).should.equal('hsla(180,50%,10%,0)');
            });

            it('toHsv', () => {
                C.hsl.toHsv({h: 0.5, s: 0.5, l: 0.1}).should.eql({h: 0.5, s: 0.6666666666666665, v: 0.15, a: 1});
            });
        });

        describe('hslString', () => {

            it('test', () => {
                C.hslString.test(dec).should.be.false;
                C.hslString.test(hex).should.be.false;
                C.hslString.test(rgba).should.be.false;
                C.hslString.test({h: 0, s: 0, l: 0}).should.be.false;
                C.hslString.test('hsl(5, 10%, 20%)').should.be.true;
                C.hslString.test('hsla(5, 10%, 20%)').should.be.true;
                C.hslString.test('hsla(5, 10%, 20%, 0.5)').should.be.false;
                C.hslString.test('hsla(5, 10, 20, 0.5)').should.be.false;
                C.hslString.test('hsla(5, 10)').should.be.false;
                C.hslString.test('hsla(5, 10%, 20%, 0,5)').should.be.false;
                C.hslString.test('hsl(5.1, 10%, 20%)').should.be.false;
            });

            it('toHsl', () => {
                C.hslString.toHsl('hsl(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});
                C.hslString.toHsl('hsla(180, 50%, 60%)').should.eql({h:3/6,s:0.5,l:0.6,a:1});

                expect(C.hslString.toHsl('hsl(180, 50, 60, 0.5)')).to.be.null;
            });
        });

        describe('hslaString', () => {

            it('test', () => {
                C.hslaString.test(dec).should.be.false;
                C.hslaString.test(hex).should.be.false;
                C.hslaString.test(rgba).should.be.false;
                C.hslaString.test({h: 0, s: 0, l: 0}).should.be.false;
                C.hslaString.test('hsl(5, 10%, 20%)').should.be.false;
                C.hslaString.test('hsla(5, 10%, 20%)').should.be.false;
                C.hslaString.test('hsla(5, 10%, 20%, 0.5)').should.be.true;
                C.hslaString.test('hsla(5, 10, 20, 0.5)').should.be.false;
                C.hslaString.test('hsla(5, 10)').should.be.false;
                C.hslaString.test('hsla(5, 10%, 20%, 0,5)').should.be.false;
                C.hslaString.test('hsla(5.1, 10%, 20%, 0.5)').should.be.false;
            });

            it('toHsl', () => {
                C.hslaString.toHsl('hsla(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});
                C.hslaString.toHsl('hsl(180, 50%, 60%, 0.5)').should.eql({h:3/6,s:0.5,l:0.6,a:0.5});

                expect(C.hslaString.toHsl('hsl(180, 50, 60)')).to.be.null;
            });
        });

        describe('hsv', () => {

            it('test', () => {
                C.hsv.test(dec).should.be.false;
                C.hsv.test(hex).should.be.false;
                C.hsv.test(rgba).should.be.false;
                C.hsv.test({h: 0, s: 0, v: 0}).should.be.true;
                C.hsv.test({h: 0, s: 0, l: 0}).should.be.false;
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
                C.hsv.toRgb({h: 0, s: 0, v: 0.75}).should.eql({r: 191.25, g: 191.25, b: 191.25, a: 255});
                C.hsv.toRgb({h: 0, s: 1, v: 0.5}).should.eql({r: 127.5, g: 0, b: 0, a: 255});
                C.hsv.toRgb({h: 1/6, s: 1, v: 0.5}).should.eql({r: 127.5, g: 127.5, b: 0, a: 255});
                C.hsv.toRgb({h: 2/6, s: 1, v: 0.5}).should.eql({r: 0, g: 127.5, b: 0, a: 255});
                C.hsv.toRgb({h: 5/6, s: 1, v: 0.5}).should.eql({r: 127.5, g: 0, b: 127.5, a: 255});
                C.hsv.toRgb({h: 3/6, s: 1, v: 0.5}).should.eql({r: 0, g: 127.5, b: 127.5, a: 255});
                C.hsv.toRgb({h: 4/6, s: 1, v: 0.5}).should.eql({r: 0, g: 0, b: 127.5, a: 255});
                C.hsv.toRgb({h: 0, s: 0, v: 0, a: 0.1}).should.eql({r: 0, g: 0, b: 0, a: 25.5});
            });

            it('toHsl', () => {
                C.hsv.toHsl({h: 0.5, s: 0.5, v: 0.1}).should.eql({h: 0.5, s: 0.3333333333333333, l: 0.07500000000000001, a: 1});
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

            let tolerance = 0.00000000001;

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
                C.any.toRgbString({r: 0xAA, g: 0xBB, b: 0xCC, a:0xFF}).should.eql('rgb(170,187,204)');
                C.any.toRgbString(0xAABBCC).should.eql('rgb(170,187,204)');
                C.any.toRgbString('#AABBCC').should.eql('rgb(170,187,204)');
                C.any.toRgbaString(rgb).should.eql('rgba(170,187,204,1)');
                C.any.toRgbaString(0xAABBCC).should.eql('rgba(170,187,204,1)');
                C.any.toRgbaString('#AABBCC').should.eql('rgba(170,187,204,1)');

                // C.any.toRgb(0xFFAABBCC).should.eql({r:0xCC, g: 0xBB, b: 0xAA, a: 0xFF});
                // C.any.toRgb(-3359830).should.eql({r:0xAA, g: 0xBB, b: 0xCC, a: 0xFF}); // 0xFFCCBBAA, 0xAABBGGRR
            });

            it('should do hsl -> rgb conversion', () => {
                let actual = C.any.toRgb(hsl);

                actual.r.should.be.closeTo(rgb.r, tolerance);
                actual.g.should.be.closeTo(rgb.g, tolerance);
                actual.b.should.be.closeTo(rgb.b, tolerance);
                actual.a.should.equal(rgb.a);
            });

            it('should do hsv -> rgb conversion', () => {
                let actual = C.any.toRgb(hsv);

                actual.r.should.be.closeTo(rgb.r, tolerance);
                actual.g.should.be.closeTo(rgb.g, tolerance);
                actual.b.should.be.closeTo(rgb.b, tolerance);
                actual.a.should.equal(255);
            });

            it('should do rgb -> hsl conversion', () => {
                let actual = C.any.toHsl(rgb);

                actual.h.should.be.closeTo(hsl.h, tolerance);
                actual.s.should.be.closeTo(hsl.s, tolerance);
                actual.l.should.be.closeTo(hsl.l, tolerance);
                actual.a.should.equal(hsl.a);
            });

            it('should do rgb -> hsv conversion', () => {
                C.any.toHsv(rgb).should.eql(hsv);
            });

            it('should do hsl -> rgb sub type conversion', () => {
                C.any.toInt(hsl).should.equal(0xAABBCC);
                C.any.toHex(hsl).should.equal('#aabbcc');
                C.any.toRgbString(hsl).should.equal('rgb(170,187,204)');
                C.any.toRgbaString(hsl).should.equal('rgba(170,187,204,1)');
            });

            it('should do hsl subtype -> hsv conversion', () => {
                let actual = C.any.toHsv('hsl(180, 50%, 60%)')

                actual.h.should.be.closeTo(0.5, tolerance);
                actual.s.should.be.closeTo(0.5, tolerance);
                actual.v.should.be.closeTo(0.8, tolerance);
                actual.a.should.equal(1, tolerance);
            });

            it('should do hsl subtype -> rgb sub type conversion', () => {
                C.any.toInt('hsl(180, 50%, 60%)').should.equal(0x65CCCC);
                C.any.toHex('hsl(180, 50%, 60%)').should.equal("#65cccc");
                C.any.toRgbString('hsl(180, 50%, 60%)').should.equal('rgb(102,204,204)');
                C.any.toRgbaString('hsl(180, 50%, 60%)').should.equal('rgba(102,204,204,1)');
            });

            it('should do hsl subtype -> hsl subtype conversion', () => {
                C.any.toHslaString('hsl(180, 50%, 60%)').should.equal('hsla(180,50%,60%,1)');
                C.any.toHslString('hsla(180, 50%, 60%, 1)').should.equal('hsl(180,50%,60%)');
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

    describe('twoStopGradient', () => {

        it('should gradient from 1 point gradient', () => {
            C.twoStopGradient([1], 0.5).array.should.eql([1,1]);
            C.twoStopGradient([1], 0.5).position.should.equal(0);
        });

        it('should gradient from 2 point gradient', () => {
            C.twoStopGradient([1,2], .25).array.should.eql([1,2]);
            C.twoStopGradient([1,2], .25).position.should.equal(.25);
        });

        it('should gradient from 3 point gradient', () => {
            C.twoStopGradient([1,2,3], 0).array.should.eql([1,2]);
            C.twoStopGradient([1,2,3], 0).position.should.equal(0);
            C.twoStopGradient([1,2,3], 1).array.should.eql([3,3]);
            C.twoStopGradient([1,2,3], 1).position.should.equal(0);
            C.twoStopGradient([1,2,3], 0.25).array.should.eql([1,2]);
            C.twoStopGradient([1,2,3], 0.25).position.should.equal(0.5);
        });

        it('should gradient from 4 point gradient', () => {
            C.twoStopGradient([1,2,3,4], 0).array.should.eql([1,2]);
            C.twoStopGradient([1,2,3,4], 0).position.should.equal(0);
            C.twoStopGradient([1,2,3,4], 1).array.should.eql([4,4]);
            C.twoStopGradient([1,2,3,4], 1).position.should.be.closeTo(0, 0.00000000000001);
            C.twoStopGradient([1,2,3,4], 0.25).array.should.eql([1,2]);
            C.twoStopGradient([1,2,3,4], 0.25).position.should.equal(0.75);
        });
    });

    describe('gradientColor', () => {

        var toRgb = C.int.toRgb;
        var fromRgb = C.rgb.toInt;

        it('should get color from 1 point gradient', () => {
            gradientColor([0x00FF7F], 0.5)
                .should.equal(0x00FF7F);
        });

        it('should get color from 2 point gradient', () => {
            gradientColor([0x00FF7F, 0xFF00FF], 0)
                .should.equal(0x00FF7F);
            gradientColor([0x00FF7F, 0xFF00FF], 1)
                .should.equal(0xFF00FF);
            gradientColor([0x00FF7F, 0xFF00FF], 0.25)
                .should.equal(0x3FBF9F);
            gradientColor([0x00FF7F, 0xFF00FF], 0.5)
                .should.equal(0x7F7FBF);
            gradientColor([0x00FF7F, 0xFF00FF], 0.75)
                .should.equal(0xBF3FDF);
        });

        it('should get color from 3 point gradient', () => {
            gradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0)
                .should.equal(0x0);
            gradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 1)
                .should.equal(0xFFFFFF);
            gradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.25)
                .should.equal(0x3F3F3F);
            gradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.5)
                .should.equal(0x7F7F7F);
            gradientColor([0x000000, 0x7F7F7F, 0xFFFFFF], 0.75)
                .should.equal(0xBFBFBF);
        });

        it('should get color from 4 point gradient', () => {
            gradientColor([0xFFFFFF, 0x0, 0x0, 0x0], 0)
                .should.equal(0xFFFFFF); // first color
            gradientColor([0x0, 0x0, 0x0, 0xFFFFFF], 1)
                .should.equal(0xFFFFFF); // last color
            gradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x7F7F7F], 0.25)
                .should.equal(0xBFBFBF); // 75% between colors 0 and 1
            gradientColor([0x0, 0xFFFFFF, 0x7F7F7F, 0x0], 0.5)
                .should.equal(0xBFBFBF); // 50% beween colors 1 and 2
            gradientColor([0x0, 0x0, 0x7F7F7F, 0xFFFFFF], 0.75)
                .should.equal(0x9F9F9F); // 25% between colors 2 and 3
        });

        it('should return edge colors when value is out of range', () => {
            gradientColor([0x00FF7F, 0xFF00FF], 2)
                .should.equal(0xFF00FF);
            gradientColor([0x00FF7F, 0xFF00FF], -2)
                .should.equal(0x00FF7F);
        });

        function gradientColor(colors, position) {
            colors = C.convert(colors, C.int.toRgb);

            let color = C.gradientColor(colors, position);

            return C.rgb.toInt(color);
        }
    });

    describe('getGradientMatrixColor', () => {

        let matrix = [
            [0xFF0000, 0x0000FF],
            [0x000000, 0x00FF00]
        ];

        it('should get left corner color', () => {
            matrixColor(matrix, 0, 0).should.equal(0xFF0000);
        });

        it('should get right corner color', () => {
            matrixColor(matrix, 1, 0).should.equal(0x0000FF);
        });

        it('should get bottom right corner color', () => {
            matrixColor(matrix, 1, 1).should.equal(0x00FF00);
        });

        it('should get bottom left corner color', () => {
            matrixColor(matrix, 0, 1).should.equal(0x000000);
        });

        it('should get bottom center color', () => {
            matrixColor(matrix, 0.5, 1).should.equal(0x007f00);
        });

        it('should get right center color', () => {
            matrixColor(matrix, 1, 0.5).should.equal(0x007f7f);
        });

        function matrixColor(colors, x, y) {
            colors = C.convert(colors, C.int.toRgb);

            let color = C.matrixColor(colors, x, y);

            return C.rgb.toInt(color);
        }
    });

    describe('hue', () => {

        it('should return red', () => {
            C.hue({r:0xFF, g: 0, b:0}).should.eql({r:0xFF, g: 0, b:0, a: 0xFF});
        });

        it('should return hue', () => {
            C.hue({r:0x7F, g: 0x7F, b:0}).should.eql({r:0xFF, g: 0xFF, b:0, a: 0xFF});
        });
    });
});