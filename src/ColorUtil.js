
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
 * All the inputted colors are expected to be in big endian byte order. (RRGGBB)
 *
 * @class ColorUtil
 */
export default class ColorUtil {

    static get obj() {
        return Obj;
    }

    static get int() {
        return Int;
    }

    static get hex() {
        return Hex;
    }

    static get rgba() {
        return Rgba;
    }

    static getSystemEndian() {
        return SYSTEM_ENDIAN;
    }

    static _setSystemEndian(value) {
        SYSTEM_ENDIAN = value;
    }

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

    static getGradientEdgesAndPosition(array, value) {
        value = value < 0 ? 0 : value > 1 ? 1 : value;

        let lastIndex = array.length - 1;
        let itemIndex = (value * lastIndex) | 0;
        let partSize = 1 / lastIndex;
        let valueBetweenItems = (value % partSize) / partSize;

        return {
            item1: array[itemIndex],
            item2: array[itemIndex+1] !== undefined ? array[itemIndex+1] : array[itemIndex],
            valueBetweenItems: valueBetweenItems
        }
    }

    /**
     * Get color from gradient.
     *
     * @param      {string[]}   colors      Array of colors in decimal format
     * @param      {number}     value       Position on the gradient. Value from 0 to 1.
     * @return     {number}
     */
    static getGradientColor(colors, position, convertToObj=this.int.toObj, convertFromObj=this.obj.toHex) {
        let {
            item1: color1,
            item2: color2,
            valueBetweenItems: valueBetweenColors
        } = this.getGradientEdgesAndPosition(colors, position);

        if (convertToObj) {
            color1 = convertToObj(color1);
            color2 = convertToObj(color2);
        }

        let color = {
            r: color1.r - valueBetweenColors * (color1.r - color2.r),
            g: color1.g - valueBetweenColors * (color1.g - color2.g),
            b: color1.b - valueBetweenColors * (color1.b - color2.b),
            a: color1.a - valueBetweenColors * (color1.a - color2.a)
        };

        return convertFromObj ? convertFromObj(color) : color;
    }

    /**
     * Get color from gradient matrix. Gradient matrix is like normal gradient
     * but it is two dimensional.
     *
     * Gradient calculation is done in object format so convertToObj must convert
     * to object and convertFromObj must convert from object type.
     *
     * @param      {string[][]} matrix  Array of gradient color arrays
     * @param      {number}     x       Horizontal position on the gradient. Value from 0 to 1.
     * @param      {number}     y       Vertical position on the gradient. Value from 0 to 1.
     * @return     {number}
     */
    static getGradientMatrixColor(matrix, x, y, convertToObj=this.int.toObj, convertFromObj=this.obj.toUint32) {
        let {
            item1: gradient1,
            item2: gradient2,
            valueBetweenItems: valueBetweenGradients
        } = this.getGradientEdgesAndPosition(matrix, y);

        // internally we cen drop the conversion between these 3 functions

        let color1 = this.getGradientColor(gradient1, x, convertToObj, null);
        let color2 = this.getGradientColor(gradient2, x, convertToObj, null);

        return this.getGradientColor([color1, color2], valueBetweenGradients, null, convertFromObj);
    }
}

class Obj {

    static toInt(o) {
        return o.r << 16 | o.g << 8 | o.b;
    }

    static toHex(o) {
        // e.g. (10<<8).toString(16) equals A00, but we need write this in format 0A00
        // by adding 1<<16 (10000) to the result and removing the first digit
        // we have produced 0A00 like this: ((1<<16) + (10<<8)).toString(16).slice(1)
        // last | 0 is added to remove possible decimals. << handles that from the others.
        return '#' + ((1 << 24) + (o.r << 16) + (o.g << 8) + o.b | 0)
            .toString(16).slice(1);
    }

    static toRgba(o) {
        let a = !isNaN(parseInt(o.a)) ? o.a / 0xFF : 1;
        return `rgba(${o.r},${o.g},${o.b},${a})`;
    }

    // TODO: test
    static toUint32(o) {
        return SYSTEM_ENDIAN === LITTLE_ENDIAN ?
              (o.a << 24 | o.b << 16 | o.g << 8 | o.r) >>> 0
            : (o.r << 24 | o.g << 16 | o.b << 8 | o.a) >>> 0;
    }

    static toInt32(o) {
        return SYSTEM_ENDIAN === LITTLE_ENDIAN ?
              (o.a << 24 | o.b << 16 | o.g << 8 | o.r)
            : (o.r << 24 | o.g << 16 | o.b << 8 | o.a);
    }
}

class Int {

    static toObj(int, a=0xFF) {
        return {
            r: (int & 0xFF0000) >> 16,
            g: (int & 0x00FF00) >> 8,
            b: int & 0x0000FF,
            a: a
        };
    }

    static toHex(int) {
        return '#' + ((1 << 24) + int).toString(16).slice(1);
    }

    static toRgba(int, a=1) {
        return 'rgba('
                + ((int & 0xFF0000) >> 16) + ','
                + ((int & 0x00FF00) >> 8) + ','
                + (int & 0x0000FF) + ','
                + a +')';
    }

    // TODO: test
    static toSystemEndian(int) {
        if (SYSTEM_ENDIAN === LITTLE_ENDIAN) {
            return  (int & 0xFF0000) >> 16 |
                    (int & 0x00FF00) |
                    (int & 0x0000FF) << 16
        }

        return int;
    }

    static toSystemEndianUint32(int, a=0xFF) {
        if (SYSTEM_ENDIAN === LITTLE_ENDIAN) {
            // split calculation with * and +
            // since left shift and | convert the number
            // to a signed 32-bit integrer
            return  (a * (1 << 24)) +
                    ((int & 0xFF0000) >> 16 |
                    (int & 0x00FF00) |
                    (int & 0x0000FF) << 16);
        }

        return a + (
            (int & 0xFF0000) << 8 |
            (int & 0x00FF00) << 8 |
            (int & 0x0000FF) << 8 );
    }
}

const REG_HEX_SHORT = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const REG_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

class Hex {

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

    static toInt(hex) {
        return parseInt(
            hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b)
            .replace('#', ''), 16);
    }

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

class Rgba {

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

    static toInt(rgba) {
        let [m,r,g,b,a] = REG_RGBA.exec(rgba) || REG_RGB.exec(rgba) || [];

        return m ?
              (parseInt(r) << 16)
            + (parseInt(g) << 8)
            + parseInt(b)
        : null;
    }

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