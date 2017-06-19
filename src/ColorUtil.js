
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
 * @class ColorUtil
 */
export default class ColorUtil {

    /**
     * @return     {Obj} Object conversion functions
     */
    static get obj() {
        return Obj;
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
    static get rgba() {
        return Rgba;
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
     * @param {array} colors            Array of colors. Color format can be anything.
     *                                  convertToObj needs to be set depending on the format.
     * @param {number} position         Position on the gradient. Value from 0 to 1.
     * @param {number} [convertToObj=ColorUtil.int.toObj] Convert incoming color to object.
     * @param {number} [convertFromObj=ColorUtil.obj.toHex] Convert outgoing color from object.
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
 * Object conversion functions
 *
 * @class Obj
 */
class Obj {

    /**
     * Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to 24-bit number (0xRRGGBB). Alpha is ignored.
     *
     * @param      {object}  o  Object
     * @return     {number}
     */
    static toInt(o) {
        return o.r << 16 | o.g << 8 | o.b;
    }

    /**
     * Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to 24-bit hex string ('#RRGGBB'). Alpha is ignored.
     *
     * @param      {object}  o  Object
     * @return     {string}
     */
    static toHex(o) {
        // e.g. (10<<8).toString(16) equals A00, but we need write this in format 0A00
        // by adding 1<<16 (10000) to the result and removing the first digit
        // we have produced 0A00 like this: ((1<<16) + (10<<8)).toString(16).slice(1)
        return '#' + ((1 << 24) | (o.r << 16) | (o.g << 8) | o.b)
            .toString(16).slice(1);
    }

    /**
     * Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to rgba string ('rgba(RRR,GGG,BBB,A)').
     * Alpha is converted from range 0-255 to 0-1. Default alpha
     * value is 1.
     *
     * @param      {object}  o  Object
     * @return     {string}
     */
    static toRgba(o) {
        let a = !isNaN(parseInt(o.a)) ? o.a / 0xFF : 1;
        return `rgba(${o.r},${o.g},${o.b},${a})`;
    }

    /**
     * Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to uint32 (0xAABBGGRR in little-endian, 0xRRGGBBAA in big-endian).
     * Default alpha value is 255. Resulting value is positive
     * e.g. {r:255,g:0,b:0,a:255} would be 4278190335.
     *
     * @param      {object}   o
     * @return     {number}
     */
    static toUint32(o) {
        let a = !isNaN(parseInt(o.a)) ? o.a : 0xFF;
        return SYSTEM_ENDIAN === LITTLE_ENDIAN ?
                (a << 24 | o.b << 16 | o.g << 8 | o.r) >>> 0
            : (o.r << 24 | o.g << 16 | o.b << 8 | a) >>> 0;
    }

    /**
     * Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to int32 (0xAABBGGRR in little-endian, 0xRRGGBBAA in big-endian).
     * Default alpha value is 255. Resulting value can be negative
     * e.g. {r:255,g:0,b:0,a:255} would be -16776961.
     *
     * @param      {object}   o Object
     * @return     {number}
     */
    static toInt32(o) {
        let a = !isNaN(parseInt(o.a)) ? o.a : 0xFF;
        return SYSTEM_ENDIAN === LITTLE_ENDIAN ?
                (a << 24 | o.b << 16 | o.g << 8 | o.r)
            : (o.r << 24 | o.g << 16 | o.b << 8 | a);
    }
}

/**
 * Integer conversion functions
 *
 * @class Int
 */
class Int {

    /**
     * 24-bit integer number (0xRRGGBB) to object ({r:RRR, g:GGG, b:BBB, a:AAA})
     *
     * @param      {number}  int        Integer
     * @param      {number}  [a=0xFF]   Alpha value in range 0-255
     * @return     {object}
     */
    static toObj(int, a=0xFF) {
        return {
            r: (int & 0xFF0000) >> 16,
            g: (int & 0x00FF00) >> 8,
            b: int & 0x0000FF,
            a: a
        };
    }

    /**
     * 24-bit integer number (0xRRGGBB) to 24-bit hex string ('#RRGGBB').
     *
     * @param      {number}  int        Integer
     * @return     {string}
     */
    static toHex(int) {
        return '#' + ((1 << 24) + int).toString(16).slice(1);
    }

    /**
     * 24-bit integer number (0xRRGGBB) to rgba string ('rgba(RRR,GGG,BBB,A)')
     *
     * @param      {number}  int        Integer
     * @param      {number}  [a=1]      Alpha value in range 0-1
     * @return     {string}
     */
    static toRgba(int, a=1) {
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
 * @class Hex
 */
class Hex {

    /**
     * 24-bit hex string ('#RRGGBB') to object ({r:RRR, g:GGG, b:BBB, a:AAA})
     *
     * @param      {string}  hex        Hexadecimal string
     * @param      {number}  [a=0xFF]   Alpha value in range 0-255
     * @return     {object}
     */
    static toObj(hex, a=0xFF) {
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
     * 24-bit hex string ('#RRGGBB') to 24-bit integer (0xRRGGBB)
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
     * 24-bit hex string ('#RRGGBB') to rgba string ('rgba(RRR,GGG,BBB,A)')
     *
     * @param      {string}  hex     Hexadecimal string
     * @param      {number}  [a=1]   Alpha value in range 0-1
     * @return     {string}
     */
    static toRgba(hex, a=1) {
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
 * Rgba conversion functions
 * Notice that rgba values should not have spaces.
 *
 * @class Rgba
 */
class Rgba {

    /**
     * Rgba string ('rgba(RRR,GGG,BBB,A)') to object ({r:RRR, g:GGG, b:BBB, a:AAA})
     *
     * @param      {string} rgba    Rgba string
     * @return     {object}
     */
    static toObj(rgba) {
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