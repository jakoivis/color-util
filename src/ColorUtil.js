
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

/**
 * Color conversion functions and some other things
 *
 * @class ColorUtil
 */
export default class ColorUtil {

    /**
     * @return     {Obj} Object conversion functions
     */
    static get rgb() {
        return Rgb;
    }

    /**
     * @return     {Int} Integer conversion functions
     */
    static get int() {
        return Int;
    }

    /**
     * @return     {Hex} Hexadecimal conversion functions
     */
    static get hex() {
        return Hex;
    }

    /**
     * @return     {Rgba} Rgba conversion functions
     */
    static get rgbString() {
        return RgbString;
    }

    /**
     * @return     {Hsl} Hsl conversion functions
     */
    static get hsl() {
        return Hsl;
    }

    /**
     * @return     {array} Array of hue colors
     */
    static get hueColors() {
        return [0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000];
    }

    /**
     * Get the endian used by the system.
     * {@link https://developer.mozilla.org/en-US/docs/Glossary/Endianness}
     *
     * @return     {number}  0=little-endian, 1=big-endian, 2=unknown-endian
     */
    static getSystemEndian() {
        return SYSTEM_ENDIAN;
    }

    static _setSystemEndian(value) {
        SYSTEM_ENDIAN = value;
    }

    /**
     * Run conversion functions for color array or color matrix.
     *
     * @example
     * ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex);
     * // output: [['#ff0000', '#00ff00'], '#0000ff']
     * ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex, ColorUtil.hex.toRgba);
     * // output: [['rgba(255,0,0,1)', 'rgba(0,255,0,1)'], 'rgba(0,0,255,1)']
     *
     * @param      {array}         array                Array of colors
     * @param      {...function}   conversionFunctions  Rest of the parameters are conversion functions
     *                                                  which are executed in the order they are listed.
     * @return     {array}
     */
    static convert(array, ...conversionFunctions) {
        return array.map(item => {
            if (Array.isArray(item)) {
                return this.convert(item, ...conversionFunctions);
            } else {
                return conversionFunctions.reduce((acc, fn) => {
                    return fn(acc);
                }, item);
            }
        });
    }

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
     * @param {array} array     Array of colors. Content of the array does not matter.
     * @param {number} value    Position on the whole gradient.
     * @return {Object} Gradient array items which are the closest to the
     *                           point indicated by position and the relative position
     *                           between those two items
     */
    static convertTo2StopGradient(array, position) {
        position = position < 0 ? 0 : position > 1 ? 1 : position;

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
    }

    /**
     * Get color from gradient.
     *
     * Gradient calculation is done in object format so convertToObj must convert
     * to object and convertFromObj must convert from object type. In case colors
     * are preformatted to object no conversion is needed. In this case set null in
     * place for the conversion function.
     *
     * @exampl
     * let gradient = [0xFF0000, 0x00FF00, 0x0000FF];
     * ColorUtil.getGradientColor(gradient, 0.5, ColorUtil.int.toRgb, ColorUtil.rgb.toHex);
     *
     * @param {array} colors            Array of colors. Color format can be anything.
     *                                  convertToObj needs to be set depending on the format.
     * @param {number} position         Position on the gradient. Value from 0 to 1.
     * @param {number} [convertToObj=null] Convert incoming color to object.
     * @param {number} [convertFromObj=null] Convert outgoing color from object.
     * @return {number} Return value depend on the what has been set to convertFromObj.
     */
    static getGradientColor(colors, position, convertToObj=null, convertFromObj=null) {
        let {
            array: [color1, color2],
            position: positionBetweenColors
        } = this.convertTo2StopGradient(colors, position);

        if (convertToObj) {
            color1 = convertToObj(color1);
            color2 = convertToObj(color2);
        }

        let color = {
            r: color1.r - positionBetweenColors * (color1.r - color2.r),
            g: color1.g - positionBetweenColors * (color1.g - color2.g),
            b: color1.b - positionBetweenColors * (color1.b - color2.b),
            a: color1.a - positionBetweenColors * (color1.a - color2.a)
        };

        return convertFromObj ? convertFromObj(color) : color;
    }

    /**
     * Get color from gradient matrix. Gradient matrix is like normal gradient
     * but it is two dimensional.
     *
     * Gradient calculation is done in object format so convertToObj must convert
     * to object and convertFromObj must convert from object type. In case colors
     * are preformatted to object no conversion is needed. In this case set null in
     * place for the conversion function.
     *
     * @example
     * let matrix = [[0xFF0000, 0x00FF00], [0x0000FF]];
     * ColorUtil.getGradientMatrixColor(matrix, 0.5, 0.5, ColorUtil.int.toRgb, ColorUtil.rgb.toHex);
     *
     * @param {array} matrix    Array of gradient color arrays
     * @param {number} x        Horizontal position on the gradient. Value from 0 to 1.
     * @param {number} y        Vertical position on the gradient. Value from 0 to 1.
     * @param {function} [convertToObj=null] Convert incoming color to object.
     * @param {function} [convertFromObj=null] Convert outgoing color from object.
     * @return {number}
     */
    static getGradientMatrixColor(matrix, x, y, convertToObj=null, convertFromObj=null) {
        let {
            array: [gradient1, gradient2],
            position: positionBetweenGradients
        } = this.convertTo2StopGradient(matrix, y);

        // internally we cen drop the conversion between these 3 functions

        let color1 = this.getGradientColor(gradient1, x, convertToObj, null);
        let color2 = this.getGradientColor(gradient2, x, convertToObj, null);

        return this.getGradientColor([color1, color2], positionBetweenGradients, null, convertFromObj);
    }
}

/**
 * Rgb conversion functions
 *
 * Rgb format is `{r:RRR, g:GGG, b:BBB, a:AAA}` where each color component
 * (red, grean, blue, alpha) range is 0-255. In some conversion functions
 * alpha is not required. In those where it is required and not present in
 * Rgb object, a fully opaque value is used as a default.
 *
 * @class Rgb
 */
class Rgb {

    /**
     * Convert Rgb to 24-bit number (0xRRGGBB). Alpha is ignored.
     *
     * @example
     * ColorUtil.rgb.toInt({r: 0, g: 128, b: 255});
     * // output: 33023
     *
     * @param      {Rgb}    rgb
     * @return     {number}
     */
    static toInt(rgb) {
        return rgb.r << 16 | rgb.g << 8 | rgb.b;
    }

    /**
     * Convert Rgb to 24-bit hex string ('#RRGGBB'). Alpha is ignored.
     *
     * @example
     * ColorUtil.rgb.toHex({r: 0, g: 128, b: 255});
     * // output: "#0080ff"
     *
     * @param      {Rgb}    rgb
     * @return     {string}
     */
    static toHex(rgb) {
        // e.g. (10<<8).toString(16) equals A00, but we need write this in format 0A00
        // by adding 1<<16 (10000) to the result and removing the first digit
        // we have produced 0A00 like this: ((1<<16) + (10<<8)).toString(16).slice(1)
        return '#' + ((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b)
            .toString(16).slice(1);
    }

    /**
     * Convert Rgb to rgb string ('rgba(RRR,GGG,BBB,A)').
     * Alpha is converted from range 0-255 to 0-1. Default alpha
     * value is 1.
     *
     * @example
     * ColorUtil.rgb.toRgbString({r: 0, g: 128, b: 255});
     * // output: "rgba(0,128,255,1)"
     * ColorUtil.rgb.toRgbString({r: 0, g: 128, b: 255, a: 85});
     * // output: "rgba(0,128,255,0.3333333333333333)"
     *
     * @param      {Rgb}    rgb
     * @return     {string}
     */
    static toRgbString(rgb) {
        let a = !isNaN(parseInt(rgb.a)) ? rgb.a / 0xFF : 1;
        return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
    }

    /**
     * Convert Rgb to uint32 (0xAABBGGRR in little-endian, 0xRRGGBBAA in big-endian).
     * Default alpha value is 255. Resulting value is positive
     *
     * @example
     * ColorUtil.rgb.toUint32({r: 0, g: 128, b: 255, a: 255});
     * // output: 4294934528
     * ColorUtil.rgb.toUint32({r: 0, g: 128, b: 255, a: 85});
     * // output: 1442807808
     *
     * @param      {Rgb}    rgb
     * @return     {number}
     */
    static toUint32(rgb) {
        let a = !isNaN(parseInt(rgb.a)) ? rgb.a : 0xFF;
        return SYSTEM_ENDIAN === LITTLE_ENDIAN ?
                  (a << 24 | rgb.b << 16 | rgb.g << 8 | rgb.r) >>> 0
            : (rgb.r << 24 | rgb.g << 16 | rgb.b << 8 | a) >>> 0;
    }

    /**
     * Convert Rgb to int32 (0xAABBGGRR in little-endian, 0xRRGGBBAA in big-endian).
     * Default alpha value is 255. Resulting value can be negative
     *
     * @example
     * ColorUtil.rgb.toInt32({r: 0, g: 128, b: 255, a: 255});
     * // output: -32768
     * ColorUtil.rgb.toInt32({r: 0, g: 128, b: 255, a: 85});
     * // output: 1442807808
     *
     * @param      {Rgb}    rgb
     * @return     {number}
     */
    static toInt32(rgb) {
        let a = !isNaN(parseInt(rgb.a)) ? rgb.a : 0xFF;
        return SYSTEM_ENDIAN === LITTLE_ENDIAN ?
                  (a << 24 | rgb.b << 16 | rgb.g << 8 | rgb.r)
            : (rgb.r << 24 | rgb.g << 16 | rgb.b << 8 | a);
    }

    /**
     * Convert Rgb to Hsl. Hsl format is `{h:HHH, s:S, l:L}`
     * where h (hue) is in range 0-360, s and l (saturation and luminosity)
     * are in range 0-1.
     *
     * @param      {Rgb}    rgb
     * @return     {Hsl}
     */
    static toHsl(rgb) {
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
                hue = ((r - g) / delta) + 4

            } else if (g === max) {
                hue = ((b - r) / delta) + 2

            } else if (r === max) {
                hue = ((g - b) / delta) % 6
            }

            hue *= 60;
        }

        return {
            h: hue,
            s: saturation,
            l: luminosity,
            a: a
        }
    }
}

/**
 * Integer conversion functions.
 *
 * Int format is 24-bit number represnting the RGB values (0xRRGGBB).
 *
 * @class Int
 */
class Int {

    /**
     * int to Rgb ({r:RRR, g:GGG, b:BBB, a:AAA})
     *
     * @param      {number}  int        Integer
     * @param      {number}  [a=0xFF]   Alpha value in range 0-255
     * @return     {object}
     */
    static toRgb(int, a=0xFF) {
        return {
            r: (int & 0xFF0000) >> 16,
            g: (int & 0x00FF00) >> 8,
            b: int & 0x0000FF,
            a: a
        };
    }

    /**
     * int to 24-bit hex string ('#RRGGBB').
     *
     * @param      {number}  int        Integer
     * @return     {string}
     */
    static toHex(int) {
        return '#' + ((1 << 24) + int).toString(16).slice(1);
    }

    /**
     * int to rgb string ('rgba(RRR,GGG,BBB,A)')
     *
     * @param      {number}  int        Integer
     * @param      {number}  [a=1]      Alpha value in range 0-1
     * @return     {string}
     */
    static toRgbString(int, a=1) {
        return 'rgba('
                + ((int & 0xFF0000) >> 16) + ','
                + ((int & 0x00FF00) >> 8) + ','
                + (int & 0x0000FF) + ','
                + a +')';
    }
}

const REG_HEX_SHORT = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const REG_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

/**
 * Hexadecimal conversion functions
 *
 * Hex format is 24-bit hex string represnting the RGB values ('#RRGGBB').
 *
 * @class Hex
 */
class Hex {

    /**
     * 24-bit hex string to Rgb ({r:RRR, g:GGG, b:BBB, a:AAA})
     *
     * @param      {string}  hex        Hexadecimal string
     * @param      {number}  [a=0xFF]   Alpha value in range 0-255
     * @return     {object}
     */
    static toRgb(hex, a=0xFF) {
        hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

        let [m,r,g,b] = REG_HEX.exec(hex) || [];

        return m ? {
            r: parseInt(r, 16),
            g: parseInt(g, 16),
            b: parseInt(b, 16),
            a: a
        } : null;
    }

    /**
     * 24-bit hex string to 24-bit integer (0xRRGGBB)
     *
     * @param      {string}  hex        Hexadecimal string
     * @return     {number}
     */
    static toInt(hex) {
        return parseInt(
            hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b)
            .replace('#', ''), 16);
    }

    /**
     * 24-bit hex string to rgb string ('rgba(RRR,GGG,BBB,A)')
     *
     * @param      {string}  hex     Hexadecimal string
     * @param      {number}  [a=1]   Alpha value in range 0-1
     * @return     {string}
     */
    static toRgbString(hex, a=1) {
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

const REG_RGBA = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d*.?\d*)\)$/;
const REG_RGB = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;

/**
 * RgbString conversion functions
 *
 * RgbString format is `'rgba(RRR,GGG,BBB,A)'`
 *
 * Notice that rgba values should not have spaces.
 *
 * @class Rgba
 */
class RgbString {

    /**
     * Rgb string ('rgba(RRR,GGG,BBB,A)') to rgb ({r:RRR, g:GGG, b:BBB, a:AAA})
     *
     * @param      {string} rgba    Rgb string
     * @return     {object}
     */
    static toRgb(rgba) {
        let [m,r,g,b,a] = REG_RGBA.exec(rgba) || REG_RGB.exec(rgba) || [];

        return m ? {
                r: parseInt(r),
                g: parseInt(g),
                b: parseInt(b),
                a: a ? (parseFloat(a) * 0xFF) | 0 : 0xFF
            }
        : null;
    }

    /**
     * Rgba string ('rgba(RRR,GGG,BBB,A)') to 24-bit integer (0xRRGGBB). Alpha is ignored.
     *
     * @param      {string} rgba    Rgba string
     * @return     {number}
     */
    static toInt(rgba) {
        let [m,r,g,b,a] = REG_RGBA.exec(rgba) || REG_RGB.exec(rgba) || [];

        return m ?
              (parseInt(r) << 16)
            + (parseInt(g) << 8)
            + parseInt(b)
        : null;
    }

    /**
     * Rgba string ('rgba(RRR,GGG,BBB,A)') to hexadecimal string ('#RRGGBB'). Alpha is ignored.
     *
     * @param      {string} rgba    Rgba string
     * @return     {string}
     */
    static toHex(rgba) {
        let [m,r,g,b,a] = REG_RGBA.exec(rgba) || REG_RGB.exec(rgba) || [];

        return m ?
            '#' + ((1 << 24)
                + (parseInt(r) << 16)
                + (parseInt(g) << 8)
                + parseInt(b)).toString(16).slice(1)
        : null;
    }
}

/**
 * Hsl conversion functions
 *
 * Hsl format is `{h:HHH, s:S, l:L, a:A}` where h (hue) is in range 0-360,
 * s, l and a (saturation, luminosity, alpha) are in range 0-1.
 *
 * @class Rgb
 */
class Hsl {

    /**
     * Hsl object `{h:HHH, s:S, l:L, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @example
     * ColorUtil.hsl.toRgb({h: 100, s: 0.5, l: 0.5});
     * // output: {r: 106, g: 191, b: 64, a: 255}
     * ColorUtil.hsl.toRgb({h: 100, s: 0.5, l: 0.5, a: 0.5});
     * // output: {r: 106, g: 191, b: 64, a: 50}
     *
     * @param      {object}  hsl        Hsl object
     * @return     {Object}
     */
    static toRgb(hsl) {
        let {h:h, s:s, l:l, a:a} = hsl;
        let c = (1 - Math.abs(2 * l - 1)) * s
        let x = c * (1 - Math.abs(h / 60 % 2 - 1));
        let m = l - c / 2;
        let r, g, b;

        if (h < 60) {
            [r, g, b] = [c, x, 0];

        } else if (h < 120) {
            [r, g, b] = [x, c, 0];

        } else if (h < 180) {
            [r, g, b] = [0, c, x];

        } else if (h < 240) {
            [r, g, b] = [0, x, c];

        } else if (h < 300) {
            [r, g, b] = [x, 0, c];

        } else {
            [r, g, b] = [c, 0, x];
        }

        return {
            r: Math.round((r + m) * 0xFF),
            g: Math.round((g + m) * 0xFF),
            b: Math.round((b + m) * 0xFF),
            a: !isNaN(parseFloat(a)) ? Math.round(a * 0xFF) : 0xFF
        };
    }
}