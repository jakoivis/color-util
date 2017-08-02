
import Continuity from './Continuity';
import {convert} from './conversionFunctions';

import Rgb from './Rgb';
import Int from './Int';
import Int32 from './Int32';
import Int32b from './Int32b';
import Hex from './Hex';
import RgbString from './RgbString';
import RgbaString from './RgbaString';
import Hsl from './Hsl';
import HslString from './HslString';
import HslaString from './HslaString';
import Hsv from './Hsv';
import Any from './Any';

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

// alpha handling
// - parent type -> sub type: alpha is lost depending on sub type. no checking if alpha is present or not. incorrect/missing alpha might lead to NaN or fully transparent values.
// - parent type -> parent type: alpha is preserved or added if missing.
// - sub type -> parent type: offer alpha argument. alpha is always added to parent type. default fully opaque. arg alpha range is the target format alpha range
// - sub type -> sub type: offer alpha argument depending whether target sub type supports alpha. default fully opaque. arg alpha range is the target format alpha range

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
     * @return     {Array} Array of hue colors
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
     * @return     {Array}
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
     * @param      {Object}  rgb     Rgb object
     * @return     {Object}  hue color in Rgb object notation
     */
    hue: (rgb) => {
        return ColorUtil.gradientColor(ColorUtil.hueColors(), Rgb.toHsv(rgb).h);
    },

    /**
     * Gradient continuity functions
     */
    continuity: Continuity,

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
     * @param {Array} array     Array of colors. Content of the array does not matter.
     * @param {number} position Position on the whole gradient.
     * @return {Object} Relative position between two items and two items from gradient array
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
     * @param {Array} colors            Array of colors. Colors should be in rgb object notation.
     * @param {number} position         Position on the gradient. Value in range 0-1.
     * @param {function} [continuity=ColorUtil.continuity.stop]  Continuity function
     * @return {Object} rgb object
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
     * @param {Array} matrix    Array of gradient color arrays. Colors should be in rgb object notation.
     * @param {number} x        Horizontal position on the gradient. Value in range 0-1.
     * @param {number} y        Vertical position on the gradient. Value in range 0-1.
     * @param {function} [continuity=ColorUtil.continuity.stop]  Continuity function
     * @return {Object} rgb object
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
     * @example
     * let colors = ColorUtil.hueColors();
     * ColorUtil.circleGradientColor(colors, 0.1, 0.1);
     * // output: {r: 255, g: 191.25, b: 0, a: 255}
     *
     * // keep center the same but rotatio 180 degrees
     * ColorUtil.circleGradientColor(colors, 0.1, 0.1, 0.5, 0.5, 0.5);
     * // output: {r: 0, g: 63.74999999999994, b: 255, a: 255}
     *
     * @memberof ColorUtil
     *
     * @param      {Array}   colors      Array of colors. Colors should be in rgb object notation.
     * @param      {number}  x           Horizontal position on the gradient. Value in range 0-1.
     * @param      {number}  y           Vertical position on the gradient. Value in range 0-1.
     * @param      {number}  cx          Horizontal position of center point. Value in range 0-1.
     * @param      {number}  cy          Vertical position of center point. Value in range 0-1.
     * @param      {number}  rotation    Rotation of the gradient. Value in range 0-1.
     * @param      {function}  [continuity=ColorUtil.continuity.repeat]  Continuity function
     * @return     {Object}  rgb object
     */
    circleGradientColor: (colors, x, y, cx=0.5, cy=0.5, rotation=0, continuity=ColorUtil.continuity.repeat) => {
        let angle = (Math.atan2(cy - y, cx - x) + Math.PI) / (Math.PI * 2) - rotation;

        return ColorUtil.gradientColor(colors, angle, continuity);
    },

    circleMatrixColor: (matrix, x, y, cx=0.5, cy=0.5, rotation=0, continuity=ColorUtil.continuity.repeat) => {
        var dx = cx - x;
        var dy = cy - y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let angle = continuity((Math.atan2(cy - y, cx - x) + Math.PI) / (Math.PI * 2) - rotation);

        let {
            array: [gradient1, gradient2],
            position: positionBetweenGradients
        } = ColorUtil.twoStopGradient(matrix, continuity(distance));

        let color1 = ColorUtil.gradientColor(gradient1, angle, ColorUtil.continuity.none);
        let color2 = ColorUtil.gradientColor(gradient2, angle, ColorUtil.continuity.none);

        return ColorUtil.gradientColor([color1, color2], positionBetweenGradients, continuity);
    },
}

export default ColorUtil;