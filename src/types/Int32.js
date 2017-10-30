
import Rgb from './Rgb';

/**
 * @class Int32
 * @private
 */
export default {

    name: 'Int32',

    parent: Rgb,

    /**
     * 32-bit number `0xAABBGGRR` (little-endian) to rgb `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.int32
     *
     * @example
     * ColorUtil.int32.toRgb(0xFF112233)
     * // output: {a: 255, b: 17, g: 34, r: 51}
     *
     * @param      {number}  int        32-bit number
     * @return     {Object}
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