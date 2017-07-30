
import {convert, callConverter, getColorType} from './Utils.js';

const LITTLE_ENDIAN = 0;
const BIG_ENDIAN = 1;
const UNKNOWN_ENDIAN = 2;

let SYSTEM_ENDIAN = (() => {
    let arrayBuffer = new ArrayBuffer(2);
    let uint8Array = new Uint8Array(arrayBuffer);
    let uint16Array = new Uint16Array(arrayBuffer);

    uint8Array[0] = 0xAA;
    uint8Array[1] = 0xBB;

    if (uint16Array[0] === 0xBBAA) {
        return LITTLE_ENDIAN;

    } else if (uint16Array[0] === 0xAABB) {
        return BIG_ENDIAN;

    } else {
        return UNKNOW_ENDIAN;
    }
})();

const INT32_ALPHA_LE = (0xFF << 24) >>> 0;

// alpha handling
// - parent type -> sub type: alpha is lost depending on sub type. no checking if alpha is present or not. incorrect/missing alpha might lead to NaN or fully transparent values.
// - parent type -> parent type: alpha is preserved or added if missing.
// - sub type -> parent type: offer alpha argument. alpha is always added to parent type. default fully opaque. arg alpha range is the target format alpha range
// - sub type -> sub type: offer alpha argument depending whether target sub type supports alpha. default fully opaque. arg alpha range is the target format alpha range

/**
 * @class Rgb
 * @private
 */
let Rgb = {

    name: 'Rgb',

    parent: null,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return color !== null &&
            typeof color === 'object' &&
            color.hasOwnProperty('r') &&
            color.hasOwnProperty('g') &&
            color.hasOwnProperty('b') &&
            (color.r >= 0 && color.r <= 255) &&
            (color.g >= 0 && color.g <= 255) &&
            (color.b >= 0 && color.b <= 255) &&
            (color.hasOwnProperty('a') ? (color.a >= 0 && color.a <= 255) : true);
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 24-bit number `0xRRGGBB`. Alpha is ignored.
     *
     * @example
     * ColorUtil.rgb.toInt({r: 0, g: 128, b: 255});
     * // output: 33023
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toInt
     *
     * @param      {object}    rgb
     * @return     {number}
     */
    toInt: rgb => {
        return rgb.r << 16 | rgb.g << 8 | rgb.b;
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 24-bit hex string `'#RRGGBB'`. Alpha is ignored.
     *
     * @example
     * ColorUtil.rgb.toHex({r: 0, g: 128, b: 255});
     * // output: "#0080ff"
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toHex
     *
     * @param      {object}    rgb
     * @return     {string}
     */
    toHex: rgb => {
        // e.g. (10<<8).toString(16) equals A00, but we need to write this in format 0A00
        // by adding 1<<16 (10000) to the result and removing the first digit
        // we have produced 0A00 like this: ((1<<16) + (10<<8)).toString(16).slice(1)
        return '#' + ((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b)
            .toString(16).slice(1);
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB}` to rgb functional notation string `'rgb(RRR,GGG,BBB)'`.
     * Alpha is converted from range 0-255 to 0-1.
     *
     * @example
     * ColorUtil.rgb.toRgbString({r: 0, g: 128, b: 255});
     * // output: "rgb(0,128,255)"
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toRgbString
     *
     * @param      {object}    rgb
     * @return     {string}
     */
    toRgbString: rgb => {
        return `rgb(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)})`;
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`.
     * Alpha is converted from range 0-255 to 0-1.
     *
     * @example
     * ColorUtil.rgb.toRgbaString({r: 0, g: 128, b: 255, a: 85});
     * // output: "rgba(0,128,255,0.3333333333333333)"
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toRgbaString
     *
     * @param      {object}    rgb
     * @return     {string}
     */
    toRgbaString: rgb => {
        return `rgba(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)},${rgb.a/0xFF})`;
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xAABBGGRR` (little-endian)
     * Resulting value is positive
     *
     * @example
     * ColorUtil.rgb.toUint32({r: 0, g: 128, b: 255, a: 255});
     * // output: 4294934528
     * ColorUtil.rgb.toUint32({r: 0, g: 128, b: 255, a: 85});
     * // output: 1442807808
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toUint32
     *
     * @param      {object}    rgb
     * @return     {number}
     */
    toUint32: rgb => {
        return (rgb.a << 24 | rgb.b << 16 | rgb.g << 8 | rgb.r) >>> 0
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB}` to 32-bit number `0xAABBGGRR` (little-endian)
     * Alpha value is discarded and fully opaque value is used. This is faster option compared to
     * `toUint32` and can be used if alpha value is not relevant. Resulting value is positive
     *
     * @example
     * ColorUtil.rgb.toUint32Opaque({r: 0, g: 128, b: 255})
     * // output: 4294934528
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toUint32Opaque
     *
     * @param      {object}    rgb
     * @return     {number}
     */
    toUint32Opaque: rgb => {
        return (INT32_ALPHA_LE | rgb.b << 16 | rgb.g << 8 | rgb.r) >>> 0
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xRRGGBBAA` (big-endian)
     * Resulting value is positive
     *
     * @example
     * ColorUtil.rgb.toUint32b({r: 0, g: 128, b: 255, a: 255});
     * // output: 8454143
     * ColorUtil.rgb.toUint32b({r: 0, g: 128, b: 255, a: 85});
     * // output: 8453973
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toUint32b
     *
     * @param      {object}    rgb
     * @return     {number}
     */
    toUint32b: rgb => {
        return (rgb.r << 24 | rgb.g << 16 | rgb.b << 8 | rgb.a) >>> 0;
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xAABBGGRR` (little-endian)
     * Resulting value can be negative.
     *
     * @example
     * ColorUtil.rgb.toInt32({r: 0, g: 128, b: 255, a: 255});
     * // output: -32768
     * ColorUtil.rgb.toInt32({r: 0, g: 128, b: 255, a: 85});
     * // output: 1442807808
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toInt32
     *
     * @param      {object}    rgb
     * @return     {number}
     */
    toInt32: rgb => {
        return rgb.a << 24 | rgb.b << 16 | rgb.g << 8 | rgb.r;
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB}` to 32-bit number `0xAABBGGRR` (little-endian)
     * Alpha value is discarded and fully opaque value is used. This is faster option compared to
     * `toInt32` and can be used if alpha value is not relevant. Resulting value can be negative.
     *
     * @example
     * ColorUtil.rgb.toInt32Opaque({r: 0, g: 128, b: 255})
     * // output: -32768
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toInt32Opaque
     *
     * @param      {object}    rgb
     * @return     {number}
     */
    toInt32Opaque: rgb => {
        return INT32_ALPHA_LE | rgb.b << 16 | rgb.g << 8 | rgb.r;
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xRRGGBBAA` (big-endian).
     * Resulting value can be negative.
     *
     * @example
     * ColorUtil.rgb.toInt32b({r: 0, g: 128, b: 255, a: 255});
     * // output: 8454143
     * ColorUtil.rgb.toInt32b({r: 0, g: 128, b: 255, a: 85});
     * // output: 8453973
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toInt32b
     *
     * @param      {object}    rgb
     * @return     {number}
     */
    toInt32b: rgb => {
        return rgb.r << 24 | rgb.g << 16 | rgb.b << 8 | rgb.a;
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to hsl object `{h:H, s:S, l:L, a:A}`
     * where h, s, l, a (saturation, luminosity, alpha) are in range 0-1.
     *
     * @example
     * ColorUtil.rgb.toHsl({r: 255, g: 0, b: 0, a: 255});
     * // output: {h: 0, s: 1, l: 0.5, a: 1}
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toHsl
     *
     * @param      {object}    rgb
     * @return     {object}
     */
    toHsl: rgb => {
        let {r:r, g:g, b:b, a:a} = rgb;

        r /= 0xFF;
        g /= 0xFF;
        b /= 0xFF;
        a = !isNaN(parseInt(a)) ? a / 0xFF : 1;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let delta = max - min;
        let luminosity = (max + min) / 2;
        let saturation = 0;
        let hue = 0;

        if (delta > 0) {
            saturation = delta / (1 - Math.abs(luminosity * 2 - 1));

            if (b === max) {
                hue = ((r - g) / delta) + 4;

            } else if (g === max) {
                hue = ((b - r) / delta) + 2;

            } else if (r === max) {
                hue = ((g - b) / delta) + (g < b ? 6 : 0);
                // or this one
                // hue = ((g - b) / delta) % 6;

                // TODO: check why this is here and not after hue *= 60 statement and why unit tests don't break when removing
                if (hue < 0) {
                    hue += 360;
                }
            }

            hue /= 6;
        }

        return {
            h: hue,
            s: saturation,
            l: luminosity,
            a: a
        }
    },

    /**
     * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to hsv object `{h:H, s:S, v:V, a:A}`
     * where h, s, v, a (hue, saturation, value, alpha) are in range 0-1.
     *
     * @example
     * ColorUtil.rgb.toHsv({r: 255, g: 0, b: 0, a: 255});
     * // output: {h: 0, s: 1, v: 1, a: 1}
     *
     * @memberof ColorUtil.rgb
     * @alias ColorUtil.rgb.toHsv
     *
     * @param      {object}    rgb
     * @return     {object}
     */
    toHsv: rgb => {
        let {r:r, g:g, b:b, a:a} = rgb;

        r /= 0xFF;
        g /= 0xFF;
        b /= 0xFF;
        a = !isNaN(parseInt(a)) ? a / 0xFF : 1;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let delta = max - min;
        let saturation = 0;
        let hue = 0;

        if (delta > 0) {
            saturation = delta / max;

            if (b === max) {
                hue = ((r - g) / delta) + 4;

            } else if (g === max) {
                hue = ((b - r) / delta) + 2;

            } else if (r === max) {
                hue = ((g - b) / delta) + (g < b ? 6 : 0);
                // or this one
                // hue = ((g - b) / delta) % 6;

                if (hue < 0) {
                    hue += 360;
                }
            }

            hue /= 6;
        }

        return {
            h: hue,
            s: saturation,
            v: max,
            a: a
        }
    }
}

/**
 * @class Int
 * @private
 */
let Int = {

    name: 'Int',

    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.int
     * @alias ColorUtil.int.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'number' &&
            color <= 0xFFFFFF &&
            color >= 0;
    },

    /**
     * 24-bit number `0xRRGGBB` to rgb `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.int
     * @alias ColorUtil.int.toRgb
     *
     * @example
     * ColorUtil.int.toRgb(0xFF0000);
     * // output: {r: 255, g: 0, b: 0, a: 255}
     *
     * ColorUtil.int.toRgb(0xFF0000, 128);
     * // output: {r: 255, g: 0, b: 0, a: 128}
     *
     * @param      {number}  int        Integer
     * @param      {number}  [a=0xFF]   Alpha value in range 0-255
     * @return     {object}
     */
    toRgb: (int, a=0xFF) => {
        return {
            r: (int & 0xFF0000) >> 16,
            g: (int & 0x00FF00) >> 8,
            b: int & 0x0000FF,
            a: a
        };
    },

    /**
     * 24-bit number `0xRRGGBB` to 24-bit hex string `'#RRGGBB'`.
     *
     * @memberof ColorUtil.int
     * @alias ColorUtil.int.toHex
     *
     * @example
     * ColorUtil.int.toHex(0x00FF00);
     * // output: "#00ff00"
     *
     * @param      {number}  int        Integer
     * @return     {string}
     */
    toHex: int => {
        return '#' + ((1 << 24) + int).toString(16).slice(1);
    },

    /**
     * 24-bit number `0xRRGGBB` to rgb functional notation string `'rgb(RRR,GGG,BBB)'`
     *
     * @memberof ColorUtil.int
     * @alias ColorUtil.int.toRgbString
     *
     * @example
     * ColorUtil.int.toRgbString(0x00FF00);
     * // output: "rgb(0,255,0)"
     *
     * @param      {number}  int        Integer
     * @return     {string}
     */
    toRgbString: int => {
        return 'rgb('
                + ((int & 0xFF0000) >> 16) + ','
                + ((int & 0x00FF00) >> 8) + ','
                + (int & 0x0000FF) + ')';
    },

    /**
     * 24-bit number `0xRRGGBB` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`
     *
     * @memberof ColorUtil.int
     * @alias ColorUtil.int.toRgbaString
     *
     * @example
     * ColorUtil.int.toRgbaString(0x00FF00);
     * // output: "rgba(0,255,0,1)"
     *
     * ColorUtil.int.toRgbaString(0x00FF00, 0.5);
     * // output: "rgba(0,255,0,0.5)"
     *
     * @param      {number}  int        Integer
     * @param      {number}  [a=1]      Alpha value in range 0-1
     * @return     {string}
     */
    toRgbaString: (int, a=1) => {
        return 'rgba('
                + ((int & 0xFF0000) >> 16) + ','
                + ((int & 0x00FF00) >> 8) + ','
                + (int & 0x0000FF) + ','
                + a +')';
    }
}

/**
 * @class Int32
 * @private
 */
let Int32 = {

    name: 'Int32',

    parent: Rgb,

    /**
     * 32-bit number `0xAABBGGRR` (little-endian) to rgb `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.int32
     * @alias ColorUtil.int32.toRgb
     *
     * @example
     * ColorUtil.int32.toRgb(0xFF112233)
     * // output: {a: 255, b: 17, g: 34, r: 51}
     *
     * @param      {number}  int        32-bit number
     * @return     {object}
     */
    toRgb: (int) => {
        return {
            a: (int >> 24) & 0xFF,
            b: (int >> 16) & 0xFF,
            g: (int >> 8) & 0xFF,
            r: int & 0xFF
        };
    }
};

/**
 * @class Int32b
 * @private
 */
let Int32b = {

    name: 'Int32b',

    parent: Rgb,

    /**
     * 32-bit number `0xRRGGBBAA` (big-endian) to rgb `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.int32b
     * @alias ColorUtil.int32b.toRgb
     *
     * @example
     * ColorUtil.int32b.toRgb(0xFF112233)
     * // output: {r: 255, g: 17, b: 34, a: 51}
     *
     * @param      {number}  int        32-bit number
     * @return     {object}
     */
    toRgb: (int) => {
        return {
            r: (int >> 24) & 0xFF,
            g: (int >> 16) & 0xFF,
            b: (int >> 8) & 0xFF,
            a: int & 0xFF
        };
    }
};

const REG_HEX_SHORT = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const REG_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

/**
 * @class Hex
 * @private
 */
let Hex = {

    name: 'Hex',

    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hex
     * @alias ColorUtil.hex.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' &&
            !!(REG_HEX.exec(color) || REG_HEX_SHORT.exec(color));
    },

    /**
     * 24-bit hex string `'#RRGGBB'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.hex
     * @alias ColorUtil.hex.toRgb
     *
     * @example
     * ColorUtil.hex.toRgb('#00FF00');
     * // output: {r: 0, g: 255, b: 0, a: 255}
     * ColorUtil.hex.toRgb('#00FF00', 127);
     * // output: {r: 0, g: 255, b: 0, a: 127}
     *
     * @param      {string}  hex        Hexadecimal string
     * @param      {number}  [a=0xFF]   Alpha value in range 0-255
     * @return     {object}
     */
    toRgb: (hex, a=0xFF) => {
        hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

        let [m,r,g,b] = REG_HEX.exec(hex) || [];

        return m ? {
            r: parseInt(r, 16),
            g: parseInt(g, 16),
            b: parseInt(b, 16),
            a: a
        } : null;
    },

    /**
     * 24-bit hex string `'#RRGGBB'` to 24-bit integer `0xRRGGBB`
     *
     * @memberof ColorUtil.hex
     * @alias ColorUtil.hex.toInt
     *
     * @example
     * ColorUtil.hex.toInt('#00FF00');
     * // output: 65280
     *
     * @param      {string}  hex        Hexadecimal string
     * @return     {number}
     */
    toInt: hex => {
        return parseInt(
            hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b)
            .replace('#', ''), 16);
    },

    /**
     * 24-bit hex string `'#RRGGBB'` to rgb functional notation string `'rgb(RRR,GGG,BBB)'`
     *
     * @memberof ColorUtil.hex
     * @alias ColorUtil.hex.toRgbString
     *
     * @example
     * ColorUtil.hex.toRgbString('#00FF00')
     * // output: "rgb(0,255,0)"
     *
     * @param      {string}  hex     Hexadecimal string
     * @return     {string}
     */
    toRgbString: hex => {
        hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

        let [m,r,g,b] = REG_HEX.exec(hex) || [];

        return m ? 'rgb('
            + parseInt(r, 16) + ','
            + parseInt(g, 16) + ','
            + parseInt(b, 16) + ')'
        : null;
    },

    /**
     * 24-bit hex string `'#RRGGBB'` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`
     *
     * @memberof ColorUtil.hex
     * @alias ColorUtil.hex.toRgbaString
     *
     * @example
     * ColorUtil.hex.toRgbaString('#00FF00')
     * // output: "rgba(0,255,0,1)"
     *
     * ColorUtil.hex.toRgbaString('#00FF00', 0.5)
     * // output: "rgba(0,255,0,0.5)"
     *
     * @param      {string}  hex     Hexadecimal string
     * @param      {number}  [a=1]   Alpha value in range 0-1
     * @return     {string}
     */
    toRgbaString: (hex, a=1) => {
        hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

        let [m,r,g,b] = REG_HEX.exec(hex) || [];

        return m ? 'rgba('
            + parseInt(r, 16) + ','
            + parseInt(g, 16) + ','
            + parseInt(b, 16) + ','
            + a + ')'
        : null;
    }
}

const REG_RGBA = /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*\.?\d*)\s*\)$/;
const REG_RGB = /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

/**
 * @class RgbString
 * @private
 */
let RgbString = {

    name: 'RgbString',

    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.rgbString
     * @alias ColorUtil.rgbString.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_RGB.exec(color);
    },

    /**
     * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.rgbString
     * @alias ColorUtil.rgbString.toRgb
     *
     * @example
     * ColorUtil.rgbString.toRgb('rgb(0,255,0)')
     * // output: {r: 0, g: 255, b: 0, a: 255}

     * @param      {string} rgbString   Rgb string
     * @param      {number} [a=0xFF]    Alpha value in range 0-255
     * @return     {object}
     */
    toRgb: (rgbString, a=0xFF) => {
        let [m,r,g,b] = REG_RGB.exec(rgbString) || [];

        return m ? {
                r: parseInt(r),
                g: parseInt(g),
                b: parseInt(b),
                a: a
            }
        : null;
    },

    /**
     * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to 24-bit integer `0xRRGGBB`. Alpha is ignored.
     *
     * @memberof ColorUtil.rgbString
     * @alias ColorUtil.rgbString.toInt
     *
     * @example
     * ColorUtil.rgbString.toInt('rgb(0,255,0)')
     * // output: 65280
     *
     * @param      {string} rgbString    Rgba string
     * @return     {number}
     */
    toInt: rgbString => {
        let [m,r,g,b] = REG_RGB.exec(rgbString) || [];

        return m ?
              (parseInt(r) << 16)
            + (parseInt(g) << 8)
            + parseInt(b)
        : null;
    },

    /**
     * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to hexadecimal string `'#RRGGBB'`. Alpha is ignored.
     *
     * @memberof ColorUtil.rgbString
     * @alias ColorUtil.rgbString.toHex
     *
     * @example
     * ColorUtil.rgbString.toHex('rgb(0,255,0)')
     * // output: "#00ff00"
     *
     * @param      {string} rgbString    Rgb string
     * @return     {string}
     */
    toHex: rgbString => {
        let [m,r,g,b] = REG_RGB.exec(rgbString) || [];

        return m ?
            '#' + ((1 << 24)
                + (parseInt(r) << 16)
                + (parseInt(g) << 8)
                + parseInt(b)).toString(16).slice(1)
        : null;
    }
}

/**
 * @class RgbString
 * @private
 */
let RgbaString = {

    name: 'RgbaString',

    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.rgbaString
     * @alias ColorUtil.rgbaString.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_RGBA.exec(color);
    },

    /**
     * Rgba functional notation string `'rgba(RRR,GGG,BBB,A)'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.rgbaString
     * @alias ColorUtil.rgbaString.toRgb
     *
     * @example
     * ColorUtil.rgbaString.toRgb('rgba(0,255,0,0.5)')
     * // output: {r: 0, g: 255, b: 0, a: 127}

     * @param      {string} rgbaString    Rgba string
     * @return     {object}
     */
    toRgb: rgbaString => {
        let [m,r,g,b,a] = REG_RGBA.exec(rgbaString) || [];

        return m ? {
                r: parseInt(r),
                g: parseInt(g),
                b: parseInt(b),
                a: a ? (parseFloat(a) * 0xFF) | 0 : 0xFF
            }
        : null;
    },

    /**
     * Rgba functional notation string `'rgba(RRR,GGG,BBB,A)'` to 24-bit integer `0xRRGGBB`. Alpha is ignored.
     *
     * @memberof ColorUtil.rgbaString
     * @alias ColorUtil.rgbaString.toInt
     *
     * @example
     * ColorUtil.rgbaString.toInt('rgba(0,255,0,0.5)')
     * // output: 65280
     *
     * @param      {string} rgbaString    Rgba string
     * @return     {number}
     */
    toInt: rgbaString => {
        let [m,r,g,b] = REG_RGBA.exec(rgbaString) || [];

        return m ?
              (parseInt(r) << 16)
            + (parseInt(g) << 8)
            + parseInt(b)
        : null;
    },

    /**
     * Rgba functional notation string `'rgba(RRR,GGG,BBB,A)'` to hexadecimal string `'#RRGGBB'`. Alpha is ignored.
     *
     * @memberof ColorUtil.rgbaString
     * @alias ColorUtil.rgbaString.toHex
     *
     * @example
     * ColorUtil.rgbaString.toHex('rgba(0,255,0,0.5)')
     * // output: "#00ff00"
     *
     * @param      {string} rgba    Rgba string
     * @return     {string}
     */
    toHex: rgbaString => {
        let [m,r,g,b] = REG_RGBA.exec(rgbaString) || [];

        return m ?
            '#' + ((1 << 24)
                + (parseInt(r) << 16)
                + (parseInt(g) << 8)
                + parseInt(b)).toString(16).slice(1)
        : null;
    }
}

/**
 * @class Hsl
 * @private
 */
let Hsl = {

    name: 'Hsl',

    parent: null,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hsl
     * @alias ColorUtil.hsl.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return color !== null &&
            typeof color === 'object' &&
            color.hasOwnProperty('h') &&
            color.hasOwnProperty('s') &&
            color.hasOwnProperty('l') &&
            (color.h >= 0 && color.h <= 1) &&
            (color.s >= 0 && color.s <= 1) &&
            (color.l >= 0 && color.l <= 1) &&
            (color.hasOwnProperty('a') ? (color.a >= 0 && color.a <= 1) : true);
    },

    /**
     * Hsl object `{h:H, s:S, l:L, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @example
     * ColorUtil.hsl.toRgb({h: 1/6, s: 0.5, l: 0.5});
     * // output: {r: 191, g: 191, b: 64, a: 255}
     *
     * ColorUtil.hsl.toRgb({h: 1/6, s: 0.5, l: 0.5, a: 0.5});
     * // output: {r: 191, g: 191, b: 64, a: 128}
     *
     * @memberof ColorUtil.hsl
     * @alias ColorUtil.hsl.toRgb
     *
     * @param      {object}  hsl        Hsl object
     * @return     {object}
     */
    toRgb: hsl => {
        let {h:h, s:s, l:l, a:a} = hsl;
        let c = (1 - Math.abs(2 * l - 1)) * s
        let x = c * (1 - Math.abs(h * 6 % 2 - 1));
        let m = l - c / 2;
        let r, g, b;

        if (h < 1/6) {
            [r, g, b] = [c, x, 0];

        } else if (h < 2/6) {
            [r, g, b] = [x, c, 0];

        } else if (h < 3/6) {
            [r, g, b] = [0, c, x];

        } else if (h < 4/6) {
            [r, g, b] = [0, x, c];

        } else if (h < 5/6) {
            [r, g, b] = [x, 0, c];

        } else {
            [r, g, b] = [c, 0, x];
        }

        return {
            r: (r + m) * 0xFF,
            g: (g + m) * 0xFF,
            b: (b + m) * 0xFF,
            a: a === undefined ? 0xFF : a * 0xFF
        };
    },

    /**
     * Hsl object `{h:H, s:S, l:L, a:A}` to hsv object `{h:H, s:S, v:V, a:A}`
     *
     * @example
     * ColorUtil.hsl.toHsv({h: 1/6, s: 0.5, l: 0.5});
     * // output: {h: 0.16666666666666666, s: 0.6666666666666666, v: 0.75, a: 1}
     *
     * @memberof ColorUtil.hsl
     * @alias ColorUtil.hsl.toHsv
     *
     * @param      {object}  hsl        Hsl object
     * @return     {object}
     */
    toHsv: hsl => {
        let {h:h, s:s, l:l, a:a} = hsl;

        let v = (2 * l + s * (1 - Math.abs(2 * l - 1))) / 2;
        s = (2 * (v - l)) / v;

        return {
            h: h,
            s: s,
            v: v,
            a: a === undefined ? 1 : a
        };
    },

    /**
     * Convert hsl object `{h:H, s:S, l:L}` to hsl functional notation string `'hsl(HHH,SSS%,LLL%)'`.
     *
     * @example
     * ColorUtil.hsl.toHslString({h:2/6, s:0.5, l:0.5});
     * // output: "hsl(120,50%,50%)"
     *
     * @memberof ColorUtil.hsl
     * @alias ColorUtil.hsl.toHslString
     *
     * @param      {object}    hsl
     * @return     {string}
     */
    toHslString: hsl => {
        return `hsl(${Math.round(hsl.h*360)},${Math.round(hsl.s*100)}%,${Math.round(hsl.l*100)}%)`;
    },

    /**
     * Convert hsl object `{h:H, s:S, l:L, a:A}` to hsl functional notation string `'hsla(HHH,SSS%,LLL%,A)'`.
     *
     * @example
     * ColorUtil.hsl.toHslaString({h:2/6, s:0.5, l:0.5, a:0.5});
     * // output: "hsla(120,50%,50%,0.5)"
     *
     * @memberof ColorUtil.hsl
     * @alias ColorUtil.hsl.toHslaString
     *
     * @param      {object}    hsl
     * @return     {string}
     */
    toHslaString: hsl => {
        return `hsla(${Math.round(hsl.h*360)},${Math.round(hsl.s*100)}%,${Math.round(hsl.l*100)}%,${hsl.a})`;
    }
}

const REG_HSL = /^hsla?\s*\(\s*(\d{1,3}\s*)\s*,\s*(\d{1,3}\s*)(%)\s*,\s*(\d{1,3}\s*)(%)\s*\)$/;
const REG_HSLA = /^hsla?\s*\(\s*(\d{1,3}\s*)\s*,\s*(\d{1,3}\s*)(%)\s*,\s*(\d{1,3}\s*)(%)\s*,\s*(\d*\.?\d*)\s*\)$/;

/**
 * @class HslString
 * @private
 */
let HslString = {

    name: 'HslString',

    parent: Hsl,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hslString
     * @alias ColorUtil.hslString.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_HSL.exec(color);
    },

    /**
     * Hsl functional notation string `'hsl(HHH,SSS%,LLL%)'` to hsl object `{h:H, s:S, l:L, a:A}`
     *
     * @memberof ColorUtil.hslString
     * @alias ColorUtil.hslString.toHsl
     *
     * @example
     * ColorUtil.hslString.toHsl('hsl(180, 50%, 60%)');
     * // output: {h: 0.5, s: 0.5, l: 0.6, a: 1}
     *
     * @param      {string} hslString    Hsl string
     * @param      {number} [a=1]        Alpha value in range 0-1
     * @return     {object}
     */
    toHsl: (hslString, a=1) => {
        let [m,h,s,p1,l] = REG_HSL.exec(hslString) || [];

        return m ? {
                h: parseInt(h) / 360,
                s: parseInt(s) / 100,
                l: parseInt(l) / 100,
                a: a
            }
        : null;
    }
};

/**
 * @class HslString
 * @private
 */
let HslaString = {

    name: 'HslaString',

    parent: Hsl,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hslaString
     * @alias ColorUtil.hslaString.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_HSLA.exec(color);
    },

    /**
     * Hsl functional notation string `'hsla(HHH,SSS%,LLL%,A)'` to hsl object `{h:H, s:S, l:L, a:A}`
     *
     * @memberof ColorUtil.hslaString
     * @alias ColorUtil.hslaString.toHsl
     *
     * @example
     * ColorUtil.hslaString.toHsl('hsla(180, 50%, 60%, 0.5)');
     * // output: {h: 0.5, s: 0.5, l: 0.6, a: 0.5}
     *
     * @param      {string} hslaString    Hsl string
     * @return     {object}
     */
    toHsl: hslaString => {
        let [m,h,s,p1,l,p2,a] = REG_HSLA.exec(hslaString) || [];

        return m ? {
                h: parseInt(h) / 360,
                s: parseInt(s) / 100,
                l: parseInt(l) / 100,
                a: a ? parseFloat(a) : 1
            }
        : null;
    }
}

/**
 * @class Hsv
 * @private
 */
let Hsv = {

    name: 'Hsv',

    parent: null,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hsv
     * @alias ColorUtil.hsv.test
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return color !== null &&
            typeof color === 'object' &&
            color.hasOwnProperty('h') &&
            color.hasOwnProperty('s') &&
            color.hasOwnProperty('v') &&
            (color.h >= 0 && color.h <= 1) &&
            (color.s >= 0 && color.s <= 1) &&
            (color.v >= 0 && color.v <= 1) &&
            (color.hasOwnProperty('a') ? (color.a >= 0 && color.a <= 1) : true);
    },

    /**
     * Hsv object `{h:H, s:S, v:V, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @example
     * ColorUtil.hsv.toRgb({h: 0, s: 1, v: 1});
     * // output: {r: 255, g: 0, b: 0, a: 255}
     * ColorUtil.hsv.toRgb({h: 0, s: 1, v: 1, a: 0.5});
     * // output: {r: 255, g: 0, b: 0, a: 128}
     *
     * @memberof ColorUtil.hsv
     * @alias ColorUtil.hsv.toRgb
     *
     * @param      {object}  hsv        Hsv object
     * @return     {object}
     */
    toRgb: hsv => {
        let {h:h, s:s, v:v, a:a} = hsv;
        let c = v * s
        let x = c * (1 - Math.abs(h * 6 % 2 - 1));
        let m = v - c;
        let r, g, b;

        if (h < 1/6) {
            [r, g, b] = [c, x, 0];

        } else if (h < 2/6) {
            [r, g, b] = [x, c, 0];

        } else if (h < 3/6) {
            [r, g, b] = [0, c, x];

        } else if (h < 4/6) {
            [r, g, b] = [0, x, c];

        } else if (h < 5/6) {
            [r, g, b] = [x, 0, c];

        } else {
            [r, g, b] = [c, 0, x];
        }

        return {
            r: (r + m) * 0xFF,
            g: (g + m) * 0xFF,
            b: (b + m) * 0xFF,
            a: !isNaN(parseFloat(a)) ? a * 0xFF : 0xFF
        };
    },

    /**
     * Hsv object `{h:H, s:S, v:V, a:A}` to hsl object `{h:H, s:S, l:L, a:A}`
     *
     * @example
     * ColorUtil.hsv.toHsl({h: 1/6, s: 0.5, v: 0.5});
     * // output: {h: 0.16666666666666666, s: 0.3333333333333333, l: 0.375, a: 1}
     *
     * @memberof ColorUtil.hsv
     * @alias ColorUtil.hsv.toHsl
     *
     * @param      {object}  hsl        Hsl object
     * @return     {object}
     */
    toHsl: hsv => {
        let {h:h, s:s, v:v, a:a} = hsv;

        let l = 0.5 * v * (2 - s);

        s = v * s / (1 - Math.abs(2 * l - 1));

        return {
            h: h,
            s: s,
            l: l,
            a: a === undefined ? 1 : a
        };
    }
}

const TYPES = [Rgb, Int, Hex, Hsl, Hsv, RgbaString, RgbString, HslaString, HslString];

/**
 * @class Any
 * @private
 */
let Any = {

    /**
     * Convert any color to rgb object notation `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @example
     * ColorUtil.any.toRgb(0xFF0000);
     * // output: {r: 255, g: 0, b: 0, a: 255}
     *
     * ColorUtil.any.toRgb({h: 1/6, s: 0.5, l: 0.5});
     * // output: {r: 191, g: 191, b: 64, a: 255}
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toRgb
     *
     * @param      {object}  color        Color in any notation
     * @return     {object}
     */
    toRgb: color => {
        return callConverter(Rgb, color, TYPES);
    },

    /**
     * Convert any color to number notation `0xRRGGBB`
     *
     * @example
     * ColorUtil.any.toInt('hsl(180, 50%, 60%)');
     * // output: 6737100
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toInt
     *
     * @param      {object}  color        Color in any notation
     * @return     {number}
     */
    toInt: color => {
        return callConverter(Int, color, TYPES);
    },

    /**
     * Convert any color to hex notation `'#RRGGBB'`
     *
     * @example
     * ColorUtil.any.toHex('hsl(180, 50%, 60%)');
     * // output: "#66cccc"
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toHex
     *
     * @param      {object}  color        Color in any notation
     * @return     {string}
     */
    toHex: color => {
        return callConverter(Hex, color, TYPES);
    },

    /**
     * Convert any color to rgb functional notation `'rgb(RRR,GGG,BBB)'`
     *
     * @example
     * ColorUtil.any.toRgbString('hsl(180, 50%, 60%)');
     * // output: "rgb(102,204,204)"
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toRgbString
     *
     * @param      {object}  color        Color in any notation
     * @return     {string}
     */
    toRgbString: color => {
        return callConverter(RgbString, color, TYPES);
    },

    /**
     * Convert any color to rgb functional notation `'rgba(RRR,GGG,BBB,A)'`
     *
     * @example
     * ColorUtil.any.toRgbaString('hsl(180, 50%, 60%)');
     * // output: "rgba(102,204,204,1)"
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toRgbaString
     *
     * @param      {object}  color        Color in any notation
     * @return     {string}
     */
    toRgbaString: color => {
        return callConverter(RgbaString, color, TYPES);
    },

    /**
     * Convert any color to hsl object notation `{h:H, s:S, v:V, a:A}`
     *
     * @example
     * ColorUtil.any.toHsl('hsl(180, 50%, 60%)');
     * // output: {h: 0.5, s: 0.5, l: 0.6, a: 1}
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toHsl
     *
     * @param      {object}  color        Color in any notation
     * @return     {object}
     */
    toHsl: color => {
        return callConverter(Hsl, color, TYPES);
    },

    /**
     * Convert any color to hsv object notation `{h:H, s:S, v:V, a:A}`
     *
     * @example
     * ColorUtil.any.toHsl('hsl(180, 50%, 60%)');
     * // output: {h: 0.5, s: 0.5, l: 0.6, a: 1}
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toHsv
     *
     * @param      {object}  color        Color in any notation
     * @return     {object}
     */
    toHsv: color => {
        return callConverter(Hsv, color, TYPES);
    },

    /**
     * Convert any color to hsl functional notation string `'hsl(HHH,SSS%,LLL%)'`
     *
     * @example
     * ColorUtil.any.toHslString({h: 0.5, s: 0.5, l: 0.6, a: 1});
     * // output: "hsl(180,50%,60%)"
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toHslString
     *
     * @param      {object}  color        Color in any notation
     * @return     {string}
     */
    toHslString: color => {
        return callConverter(HslString, color, TYPES);
    },

    /**
     * Convert any color to hsl functional notation string `'hsla(HHH,SSS%,LLL%,A)'`
     *
     * @example
     * ColorUtil.any.toHslaString({h: 0.5, s: 0.5, l: 0.6, a: 1});
     * // output: "hsla(180,50%,60%,1)"
     *
     * @memberof ColorUtil.any
     * @alias ColorUtil.any.toHslaString
     *
     * @param      {object}  color        Color in any notation
     * @return     {string}
     */
    toHslaString: color => {
        return callConverter(HslaString, color, TYPES);
    }
}

/**
 * @class ColorUtil
 * @classdesc Color conversion functions and gradient functions.
 */
let ColorUtil = {

    /**
     * Rgb conversion functions
     *
     * Rgb object notation is `{r:RRR, g:GGG, b:BBB, a:AAA}` where each color component
     * (red, grean, blue, alpha) range is 0-255. In some conversion functions
     * alpha is not required. In those where it is required and not present in
     * rgb object, a fully opaque value is used as a default.
     *
     * @memberof ColorUtil
     */
    rgb:Rgb,

    /**
     * Number conversion functions.
     *
     * Int notation is 24-bit number representing the RGB values `0xRRGGBB`.
     *
     * @memberof ColorUtil
     */
    int: Int,

    /**
     * Number conversion functions.
     *
     * Int32 notation converion functions for 32-bit numbers `0xAABBGGRR` (little-endian).
     *
     * @memberof ColorUtil
     */
    int32: Int32,

    /**
     * Number conversion functions.
     *
     * Int32 notation converion functions for 32-bit numbers `0xRRGGBBAA` (big-endian).
     *
     * @memberof ColorUtil
     */
    int32b: Int32b,

    /**
     * Hexadecimal conversion functions
     *
     * Hex notation is 24-bit hex string representing the RGB values `'#RRGGBB'`.
     *
     * @memberof ColorUtil
     */
    hex: Hex,

    /**
     * RgbString conversion functions
     *
     * RgbString notation is `'rgb(RRR,GGG,BBB)'`
     *
     * @memberof ColorUtil
     */
    rgbString: RgbString,

    /**
     * RgbaString conversion functions
     *
     * RgbString notation is `'rgba(RRR,GGG,BBB,A)'`
     *
     * @memberof ColorUtil
     */
    rgbaString: RgbaString,

    /**
     * Hsl conversion functions
     *
     * Hsl notation is `{h:H, s:S, l:L, a:A}` where each component (hue, saturation,
     * luminosity, alpha) is in range 0-1.
     *
     * @memberof ColorUtil
     */
    hsl: Hsl,

    /**
     * HslString conversion functions
     *
     * Hsl functional notation is `'hsl(HHH,SSS%,LLL%)'`
     *
     * @memberof ColorUtil
     */
    hslString: HslString,

    /**
     * HslaString conversion functions
     *
     * Hsla functional notation is `'hsla(HHH,SSS%,LLL%,A)'`
     *
     * @memberof ColorUtil
     */
    hslaString: HslaString,

    /**
     * Hsv conversion functions
     *
     * Hsv notation is `{h:H, s:S, v:V, a:A}` where each component
     * (hue, saturation, value, alpha) are in range 0-1.
     *
     * @memberof ColorUtil
     */
    hsv: Hsv,

    /**
     * Any conversion functions.
     *
     * Converts supported color notations to any notation.
     *
     * @memberof ColorUtil
     */
    any: Any,

    /**
     * @memberof ColorUtil
     *
     * @return     {array} Array of hue colors
     */
    hueColors: () => {
        return convert(
            [0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000],
            Int.toRgb);
    },

    /**
     * Get the endian used by the system.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Glossary/Endianness}
     *
     * @memberof ColorUtil
     *
     * @return     {number}  0=little-endian, 1=big-endian, 2=unknown-endian
     */
    endian: SYSTEM_ENDIAN,

    /**
     * Run conversion functions for single color, array of colors or
     * matrix of colors.
     *
     * @example
     * ColorUtil.convert(0xFF0000, ColorUtil.int.toHex);
     * // output: "#ff0000"
     *
     * ColorUtil.convert([0xFF0000, 0x00FF00], ColorUtil.int.toHex);
     * // output: ["#ff0000", "#00ff00"]
     *
     * ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex);
     * // output: [['#ff0000', '#00ff00'], '#0000ff']
     *
     * ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex, ColorUtil.hex.toRgbString);
     * // output: [['rgb(255,0,0)', 'rgb(0,255,0)'], 'rgb(0,0,255)']
     *
     * @memberof ColorUtil
     *
     * @param      {*}             colors               Array of colors or single color
     * @param      {...function}   conversionFunctions  Rest of the parameters are conversion functions
     *                                                  which are executed in the order they are listed.
     * @return     {array}
     */
    convert: convert,

    /**
     * A short-cut method for getting hue color
     *
     * @example
     * ColorUtil.hue({r:0x7F, g: 0x7F, b:0})
     * // output: {r: 255, g: 255, b: 0, a: 255}
     *
     * @memberof ColorUtil
     *
     * @param      {object}  rgb     Rgb object
     * @return     {object}  hue color in Rgb object notation
     */
    hue: (rgb) => {
        return ColorUtil.gradientColor(ColorUtil.hueColors(), Rgb.toHsv(rgb).h);
    },

    /**
     * Grdient continuity functions.
     *
     * @memberof ColorUtil
     */
    continuity: {
        none: (position) => {
            return position;
        },

        /**
         * Stop gradient at the edge color
         *
         * @memberof ColorUtil.continuity
         * @alias ColorUtil.continuity.stop
         */
        stop: (position) => {
            return position < 0 ? 0 : position > 1 ? 1 : position;
        },

        /**
         * Repeat gradient with the same pattern
         *
         * @memberof ColorUtil.continuity
         * @alias ColorUtil.continuity.repeat
         */
        repeat: (position) => {
            return position < 0 ? 1 + position % 1 : position > 1 ? position % 1 : position;
        }
    },

    /**
     * Calculate two items from a gradient array and a relative position of
     * the gradient between those two items in an evenly distributed
     * gradient. The resulting values can be used calculate the final color.
     *
     * @example
     * // The example position 0.25 is in the middle of the first and
     * // second colors so new 2 point gradient array contains only those
     * // first and second colors. The given absolute position 0.25 is relatively
     * // 0.5 between those two values.
     * ColorUtil.convertTo2StopGradient([0xFF0000, 0x00FF00, 0x0000FF], 0.25);
     * // output: {array: [0xFF0000, 0x00FF00], position: 0.5}
     *
     * @memberof ColorUtil
     * @private
     *
     * @param {array} array     Array of colors. Content of the array does not matter.
     * @param {number} position Position on the whole gradient.
     * @return {object} Relative position between two items and two items from gradient array
     *                           which are the closest to the point indicated by position argument
     */
    twoStopGradient: (array, position) => {
        let lastIndex = array.length - 1;
        let itemIndex = (position * lastIndex) | 0;
        let partSize = 1 / lastIndex * 1000;
        let positionBetweenItems = ((position*1000) % partSize) / partSize;

        // partSize and position are scaled in the above calculation to fix
        // a javascrip decimal rounding problem. The issue was seen in a gradient
        // in which there were exactly 6 colors. positionBetweenItems for the first
        // color of the 4th gradient stop was rounded to 0.9999... where the correct
        // value was 0 (0.6 % 0.2 = 0.1999.... should be 0)
        // That resulted to a weird vertical line in a gradient

        return {
            array: [
                array[itemIndex],
                array[itemIndex+1] !== undefined ? array[itemIndex+1] : array[itemIndex]
            ],
            position: positionBetweenItems
        }
    },

    /**
     * Get color from gradient. Calculation is done in
     * rgb object notation so colors should be converted to object notation.
     *
     * @example
     * let gradient = ColorUtil.convert([0xFF0000, 0x00FF00, 0x0000FF], ColorUtil.int.toRgb);
     * ColorUtil.gradientColor(gradient, 0.5);
     * // output: {r: 0, g: 255, b: 0, a: 255}
     *
     * @memberof ColorUtil
     *
     * @param {array} colors            Array of colors. Colors should be in rgb object notation.
     * @param {number} position         Position on the gradient. Value in range 0-1.
     * @param {function} [continuity=ColorUtil.continuity.stop]  Continuity function
     * @return {object} rgb object
     */
    gradientColor: (colors, position, continuity=ColorUtil.continuity.stop) => {
        position = continuity(position);

        let {
            array: [color1, color2],
            position: positionBetweenColors
        } = ColorUtil.twoStopGradient(colors, position);

        return {
            r: color1.r - positionBetweenColors * (color1.r - color2.r),
            g: color1.g - positionBetweenColors * (color1.g - color2.g),
            b: color1.b - positionBetweenColors * (color1.b - color2.b),
            a: color1.a - positionBetweenColors * (color1.a - color2.a)
        };
    },

    /**
     * Get color from matrix. Calculation is done in
     * rgb object notation so colors should be converted to object notation.
     *
     * @example
     * let matrix = ColorUtil.convert([[0xFF0000, 0x00FF00], [0x0000FF]], ColorUtil.int.toRgb);
     * ColorUtil.matrixColor(matrix, 0.5, 0.5);
     * // output: {r: 63.75, g: 63.75, b: 127.5, a: 255}
     *
     * @memberof ColorUtil
     *
     * @param {array} matrix    Array of gradient color arrays. Colors should be in rgb object notation.
     * @param {number} x        Horizontal position on the gradient. Value in range 0-1.
     * @param {number} y        Vertical position on the gradient. Value in range 0-1.
     * @param {function} [continuity=ColorUtil.continuity.stop]  Continuity function
     * @return {object} rgb object
     */
    matrixColor: (matrix, x, y, continuity=ColorUtil.continuity.stop) => {
        x = continuity(x);

        let {
            array: [gradient1, gradient2],
            position: positionBetweenGradients
        } = ColorUtil.twoStopGradient(matrix, continuity(y));

        let color1 = ColorUtil.gradientColor(gradient1, x, ColorUtil.continuity.none);
        let color2 = ColorUtil.gradientColor(gradient2, x, ColorUtil.continuity.none);

        return ColorUtil.gradientColor([color1, color2], positionBetweenGradients, continuity);
    },

    /**
     * Get color from circle gradient. Calculation is done in
     * rgb object notation so colors should be converted to object notation.
     *
     * @param      {array}   colors      Array of colors. Colors should be in rgb object notation.
     * @param      {number}  x           Horizontal position on the gradient. Value in range 0-1.
     * @param      {number}  y           Vertical position on the gradient. Value in range 0-1.
     * @param      {number}  rotation    Rotation of the gradient. Value in range 0-1.
     * @param      {number}  cx          Horizontal position of center point. Value in range 0-1.
     * @param      {number}  cy          Vertical position of center point. Value in range 0-1.
     * @param      {function}  [continuity=ColorUtil.continuity.repeat]  Continuity function
     * @return     {object}  rgb object
     */
    circleGradientColor: (colors, x, y, rotation=0, cx=0.5, cy=0.5, continuity=ColorUtil.continuity.repeat) => {
        let angle = (Math.atan2(y - cy, x - cx) + Math.PI) / (Math.PI * 2) - rotation;

        return ColorUtil.gradientColor(colors, angle, continuity);
    }
}

export default ColorUtil;