
import chai from 'chai';
import Color from '../src/Color.js';

chai.should();
let expect = require('chai').expect;

describe.only('Color', () => {

    it('should provide getters for all color formats', () => {

        let color = new Color(0xFF0000);

        color.int.should.equal(0xFF0000);
        color.rgb.should.eql({r: 255, g: 0, b: 0, a: 255});
        color.hex.should.equal('#ff0000');
        color.rgbString.should.equal('rgb(255,0,0)');
        color.rgbaString.should.equal('rgba(255,0,0,1)');
        color.hsv.should.eql({h:0, s:1, v:1, a:1});
        color.hsl.should.eql({h:0, s:1, l:0.5, a:1});
        color.hslString.should.equal('hsl(0,100%,50%)');
        color.hslaString.should.equal('hsla(0,100%,50%,1)');
    });
});
