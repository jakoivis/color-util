
const REG_HEX_SHORT = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const REG_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const REG_RGBA = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d*.?\d*)\)$/;
const REG_RGB = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;

export default class ColorUtil {

    static obj2dec(o) {
        return o.r << 16 | o.g << 8 | o.b;
    }

    static obj2hex(o) {
        // e.g. (10<<8).toString(16) equals A00, but we need write this in format 0A00
        // by adding 1<<16 (10000) to the result and removing the first digit
        // we have produced 0A00 like this: ((1<<16) + (10<<8)).toString(16).slice(1)
        return '#' + ((1 << 24) + (o.r << 16) + (o.g << 8) + o.b)
            .toString(16).slice(1);
    }

    static obj2rgba(o) {
        let opacity = !isNaN(parseFloat(o.a)) ? o.a : 1;
        return `rgba(${o.r},${o.g},${o.b},${opacity})`;
    }

    static dec2obj(dec, opacity=1) {
        return {
            r: (dec & 0xFF0000) >> 16,
            g: (dec & 0x00FF00) >> 8,
            b: dec & 0x0000FF,
            a: opacity
        };
    }

    static dec2hex(dec) {
        return '#' + ((1 << 24) + dec).toString(16).slice(1);
    }

    static dec2rgba(dec, opacity=1) {
        return 'rgba('
                + ((dec & 0xFF0000) >> 16) + ','
                + ((dec & 0x00FF00) >> 8) + ','
                + (dec & 0x0000FF) + ','
                + opacity +')';
    }

    static hex2obj(hex, opacity=1) {
        hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

        let [m,r,g,b] = REG_HEX.exec(hex) || [];

        return m ? {
            r: parseInt(r, 16),
            g: parseInt(g, 16),
            b: parseInt(b, 16),
            a: opacity
        } : null;
    }

    static hex2dec(hex) {
        return parseInt(
            hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b)
            .replace('#', ''), 16);
    }

    static hex2rgba(hex, opacity=1) {
        hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

        let [m,r,g,b] = REG_HEX.exec(hex) || [];

        return m ? 'rgba('
            + parseInt(r, 16) + ','
            + parseInt(g, 16) + ','
            + parseInt(b, 16) + ','
            + opacity + ')'
        : null;
    }

    static rgba2obj(rgba) {
        let [m,r,g,b,a] = REG_RGBA.exec(rgba) || REG_RGB.exec(rgba) || [];

        return m ? {
                r: parseInt(r),
                g: parseInt(g),
                b: parseInt(b),
                a: a ? parseFloat(a) : 1
            }
        : null;
    }

    static rgba2dec(rgba) {
        let [m,r,g,b,a] = REG_RGBA.exec(rgba) || REG_RGB.exec(rgba) || [];

        return m ?
              (parseInt(r) << 16)
            + (parseInt(g) << 8)
            + parseInt(b)
        : null;
    }

    static rgba2hex(rgba) {
        let [m,r,g,b,a] = REG_RGBA.exec(rgba) || REG_RGB.exec(rgba) || [];

        return m ?
            '#' + ((1 << 24)
                + (parseInt(r) << 16)
                + (parseInt(g) << 8)
                + parseInt(b)).toString(16).slice(1)
        : null;
    }

    static getGradientColor(colors, value) {
        value = value < 0 ? 0 : value > 1 ? 1 : value;

        let lastIndex = colors.length-1;
        let colorIndex = (value * lastIndex) | 0;
        let partLength = 1 / lastIndex;
        let valueBetweenTwo = (value % partLength) / partLength;
        let color1 = colors[colorIndex];
        let color2 = colors[colorIndex+1] ? colors[colorIndex+1] : colors[colorIndex];

        let obj1 = this.dec2obj(color1);
        let obj2 = this.dec2obj(color2);

        let scale = {
            r: obj1.r - obj2.r,
            g: obj1.g - obj2.g,
            b: obj1.b - obj2.b
        };

        return (
            (obj1.r - valueBetweenTwo * scale.r) << 16 |
            (obj1.g - valueBetweenTwo * scale.g) << 8 |
            (obj1.b - valueBetweenTwo * scale.b)
        );
    }

    // TODO color brightess or luma

}

    // /**
    //  * Returns a random color value that is not too dark and not too bright
    //  *
    //  * @param {number} minBrightness
    //  * @param {number} maxBrightness
    //  */
    // function getRandomColorFromBrightnessRange(minBrightness, maxBrightness)
    // {
    //     var color = (Math.random() * 0xFFFFFF) | 0;
    //     var brightness = getBrightness( color );
    //     if( brightness < minBrightness )
    //         color = brightenColor(color,minBrightness);
    //     else if( brightness > maxBrightness )
    //         color = darkenColor(color,maxBrightness);
    //     return color;
    // }

    // public static function brightenColor(hexColor:Number, percent:Number):Number {
    //     if(isNaN(percent))
    //         percent=0;
    //     if(percent>100)
    //         percent=100;
    //     if(percent<0)
    //         percent=0;

    //     var factor:Number=percent/100;
    //     var rgb:Object=hexToRgb(hexColor);

    //     rgb.r+=(255-rgb.r)*factor;
    //     rgb.b+=(255-rgb.b)*factor;
    //     rgb.g+=(255-rgb.g)*factor;

    //     return rgbToHex(Math.round(rgb.r),Math.round(rgb.g),Math.round(rgb.b));
    // }

    // public static function darkenColor(hexColor:Number, percent:Number):Number {
    //     if(isNaN(percent))
    //         percent=0;
    //     if(percent>100)
    //         percent=100;
    //     if(percent<0)
    //         percent=0;

    //     var factor:Number=1-(percent/100);
    //     var rgb:Object=hexToRgb(hexColor);

    //     rgb.r*=factor;
    //     rgb.b*=factor;
    //     rgb.g*=factor;

    //     return rgbToHex(Math.round(rgb.r),Math.round(rgb.g),Math.round(rgb.b));
    // }
