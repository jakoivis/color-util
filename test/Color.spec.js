
import chai from 'chai';
import Color from '../src/Color.js';

chai.should();
let expect = require('chai').expect;

describe('Color', () => {

    it('should return clone if argument is instance of Color', () => {

        let color = new Color(0xFF0000);
        let color2 = new Color(color);

        expect(color === color2).to.be.false;

        color2.int.should.equal(0xFF0000);
    });

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

    it('should cache colors', () => {

        let color = new Color(0xFF0000);

        color.hex; // add to cache

        color._primaryColor.should.equal(0xFF0000);
        color._cache['int'].should.equal(0xFF0000);
        color._cache['hex'].should.equal('#ff0000');
    })

    it('should have default color', () => {

        let color = new Color();

        color.rgb.should.eql({r: 0, g: 0, b: 0, a: 255});
    });

    it('should clone color and its cache', () => {

        let color1 = new Color(0xFF0000);

        color1.hex; // add to cache

        let color2 = color1.clone();

        color2.rgb; // add to cache

        expect(color1 === color2).to.be.false;

        color1._primaryColor.should.equal(0xFF0000);
        color1._cache['int'].should.equal(0xFF0000);
        color1._cache['hex'].should.equal('#ff0000');
        expect(color1._cache['rgb']).to.be.undefined;

        color2._primaryColor.should.equal(0xFF0000);
        color2._cache['int'].should.equal(0xFF0000);
        color2._cache['hex'].should.equal('#ff0000');
        color2._cache['rgb'].should.eql({r:255, g:0, b:0, a:255});

        color1.hex.should.equal('#ff0000');
        color2.hex.should.equal('#ff0000');
    });

    it('should get hue', () => {

        let color = new Color(0x550000);
        color.hue().int.should.equal(0xff0000);

        color = new Color(0xe214dc);
        color.hue().int.should.equal(0xff00f7);
    });

    it('should cache hue', () => {

        let color1 = new Color(0x005500);
        let color2 = color1.hue(); // add to cache
        let color3 = color1.hue(); // retrieve from cache

        expect(color1 === color2).to.be.false; // return new
        expect(color2 === color3).to.be.true; // test cache

        color1._cache['hue'].should.equal(color2);
        color1._cache['hue'].should.equal(color3);
    });

    it('should cache hsv when caching hue', () => {

        let color1 = new Color(0x005500);

        color1.hue(); // add to cache

        color1._cache['hsv'].should.eql({h:1/3, s:1, v:1/3, a:1});
    });

    it('should clone hue from cache when cloning a color', () => {

        let color1 = new Color(0x005500);

        color1.hue(); // add to cache

        let color2 = color1.clone();

        expect(color1._cache.hue === color2._cache.hue).to.be.false;
        color1._cache.int.should.equal(0x005500);
        color2._cache.int.should.equal(0x005500);
        color1._cache.hue._cache.rgb.should.eql({r:0, g:255, b:0, a:255});
        color2._cache.hue._cache.rgb.should.eql({r:0, g:255, b:0, a:255});
    });

    it('should get hueFromColor', () => {

        new Color(0x005500).hueFromColor(0xe214dc).hex.should.equal('#550052');

        let color1 = new Color(0x005500);
        let color2 = color1.hueFromColor(0xe214dc);

        expect(color1 === color2).to.be.false;
    });

    it('should get hueFromValue', () => {

        new Color(0x005500).hueFromValue(0.8381877022653721).hex.should.equal('#550052');

        let color1 = new Color(0x005500);
        let color2 = color1.hueFromValue(1);

        expect(color1 === color2).to.be.false;
    });
});
