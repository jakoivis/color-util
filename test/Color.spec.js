
import chai from 'chai';
import Color from '../src/Color.js';

chai.should();
let expect = require('chai').expect;

describe('Color', () => {

    it('should provide getters for all color formats', () => {

        let color = new Color(0xFF0000);

        color.int.should.equal(0xFF0000);
        color.rgb.should.eql({r: 255, g: 0, b: 0, a: 255});
        color.hex.should.equal('#ff0000');
        color.cssrgb.should.equal('rgb(255,0,0)');
        color.cssrgba.should.equal('rgba(255,0,0,1)');
        color.hsv.should.eql({h:0, s:1, v:1, a:1});
        color.hsl.should.eql({h:0, s:1, l:0.5, a:1});
        color.csshsl.should.equal('hsl(0,100%,50%)');
        color.csshsla.should.equal('hsla(0,100%,50%,1)');
    });

    it('should set color', () => {

        let color = new Color(0xFF0000);

        color.hex.should.equal('#ff0000');

        color.set({h:0.5, s:1, l:0.5});

        color.hex.should.equal('#00ffff');

        color.set(0x00FF00).hex.should.equal('#00ff00');
    });

    it('should have default color', () => {

        let color = new Color();

        color.rgb.should.eql({r: 0, g: 0, b: 0, a: 255});
    });

    it('should clone', () => {

        let color1 = new Color(0xFF0000);
        let color2 = color1.clone();

        color1.set(0x00FFFF);

        color1.hex.should.equal('#00ffff');
        color2.hex.should.equal('#ff0000');
    });

    it('should get hue', () => {

        let color = new Color(0x550000);

        color.hue.int.should.equal(0xff0000);

        color.set(0xe214dc).hue.int.should.equal(0xff00f7);
    });

    it('should set hue', () => {

        new Color(0x005500).hueFromColor(0xe214dc).hex.should.equal('#550052');
    });
});
