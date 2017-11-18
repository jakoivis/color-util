
import Repeat from './Repeat';
import ConversionUtil from './ConversionUtil';
import Gradient from './Gradient';
import Color from './Color';

import Any from './types/Any';
import {TYPES_ALL, TYPES} from './types/types';

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
    // rgb:Rgb,

    /**
     * Number conversion functions.
     *
     * Int notation is 24-bit number representing the RGB values `0xRRGGBB`.
     *
     * @memberof ColorUtil
     */
    // int: Int,

    /**
     * Number conversion functions.
     *
     * Int32 notation converion functions for 32-bit numbers `0xAABBGGRR` (little-endian).
     *
     * @memberof ColorUtil
     */
    // int32ABGR: Int32ABGR,

    /**
     * Number conversion functions.
     *
     * Int32 notation converion functions for 32-bit numbers `0xRRGGBBAA` (big-endian).
     *
     * @memberof ColorUtil
     */
    // int32RGBA: Int32RGBA,

    /**
     * Hexadecimal conversion functions
     *
     * Hex notation is 24-bit hex string representing the RGB values `'#RRGGBB'`.
     *
     * @memberof ColorUtil
     */
    // hex: Hex,

    /**
     * cssrgb conversion functions
     *
     * cssrgb notation is `'rgb(RRR,GGG,BBB)'`
     *
     * @memberof ColorUtil
     */
    // cssrgb: cssrgb,

    /**
     * cssrgba conversion functions
     *
     * cssrgba notation is `'rgba(RRR,GGG,BBB,A)'`
     *
     * @memberof ColorUtil
     */
    // cssrgba: cssrgba,

    /**
     * Hsl conversion functions
     *
     * Hsl notation is `{h:H, s:S, l:L, a:A}` where each component (hue, saturation,
     * luminosity, alpha) is in range 0-1.
     *
     * @memberof ColorUtil
     */
    // hsl: Hsl,

    /**
     * csshsl conversion functions
     *
     * Hsl functional notation is `'hsl(HHH,SSS%,LLL%)'`
     *
     * @memberof ColorUtil
     */
    // csshsl: csshsl,

    /**
     * csshsla conversion functions
     *
     * Hsla functional notation is `'hsla(HHH,SSS%,LLL%,A)'`
     *
     * @memberof ColorUtil
     */
    // csshsla: csshsla,

    /**
     * Hsv conversion functions
     *
     * Hsv notation is `{h:H, s:S, v:V, a:A}` where each component
     * (hue, saturation, value, alpha) are in range 0-1.
     *
     * @memberof ColorUtil
     */
    // hsv: Hsv,

    /**
     * Any conversion functions.
     *
     * Converts color notations to any notation. (Except for Int32RGBA and Int32ABGR)
     *
     * The any conversion functions provide an easy way to convert to specific notation
     * without knowing the notation of a source color. This is just a collection of
     * convenience methods making the usage a little bit easier. These functions are not
     * as fast as the direct conversion functions.
     *
     * @memberof ColorUtil
     */
    any: Any,

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
     * ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex, ColorUtil.hex.tocssrgb);
     * // output: [['rgb(255,0,0)', 'rgb(0,255,0)'], 'rgb(0,0,255)']
     *
     * @memberof ColorUtil
     *
     * @param      {*}             colors               Array of colors or single color
     * @param      {...function}   conversionFunctions  Rest of the parameters are conversion functions
     *                                                  which are executed in the order they are listed.
     * @return     {Array}
     */
    convert: ConversionUtil.convert,

    colorType: (color) => {

        return ConversionUtil.getColorType(color, TYPES);
    },

    /**
     * Gradient repeat functions
     */
    repeat: Repeat,

    gradient: Gradient,

    color: (color) => {

        return new Color(color);
    }
}

for (let type of TYPES_ALL) {

    ColorUtil[type.name] = type;
}




export default ColorUtil;