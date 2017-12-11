

import ConversionUtil from './ConversionUtil';
import Gradient from './Gradient';
import Repeat from './Repeat';
import Color from './Color';
import _ from './Utils';

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
 * @class colorutil
 * @classdesc Color conversion functions and gradient functions.
 */
let colorutil = {

    any: Any,

    /**
     * Get the endian used by the system.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Glossary/Endianness}
     *
     * @memberof colorutil
     *
     * @return     {number}  0=little-endian, 1=big-endian, 2=unknown-endian
     */
    endian: SYSTEM_ENDIAN,

    /**
     * Run conversion functions for single color, array of colors or
     * matrix of colors.
     *
     * @example
     * colorutil.convert(0xFF0000, colorutil.int.to.hex);
     * // output: "#ff0000"
     *
     * colorutil.convert([0xFF0000, 0x00FF00], colorutil.int.to.hex);
     * // output: ["#ff0000", "#00ff00"]
     *
     * colorutil.convert([[0xFF0000, 0x00FF00], 0x0000FF], colorutil.int.to.hex);
     * // output: [['#ff0000', '#00ff00'], '#0000ff']
     *
     * colorutil.convert([[0xFF0000, 0x00FF00], 0x0000FF], colorutil.int.to.hex, colorutil.hex.to.cssrgb);
     * // output: [['rgb(255,0,0)', 'rgb(0,255,0)'], 'rgb(0,0,255)']
     *
     * @memberof colorutil
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

    repeat: Repeat,

    color: (color) => {

        return new Color(color);
    }
}

_.forEach(TYPES_ALL, (type) => {

    colorutil[type.name] = type;
});




export default colorutil;