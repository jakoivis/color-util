
import Rgb from './Rgb';

/**
 * Number conversion functions.
 *
 * Int32 notation converion functions for 32-bit numbers `0xAABBGGRR` (little-endian).
 *
 * @namespace intabgr
 * @memberof colorutil
 */
export default {

    name: 'intabgr',
    className: 'Intabgr',
    parent: Rgb,

    /**
     * @namespace to
     * @memberof colorutil.intabgr
     */
    to: {

        /**
         * 32-bit number `0xAABBGGRR` (little-endian) to rgb `{r:RRR, g:GGG, b:BBB, a:AAA}`
         *
         * @memberof colorutil.intabgr.to
         *
         * @example
         * colorutil.intabgr.to.rgb(0xFF112233)
         * // output: {a: 255, b: 17, g: 34, r: 51}
         *
         * @param      {number}  int        32-bit number
         * @return     {Object}
         */
        rgb: (int) => {
            return {
                a: (int >> 24) & 0xFF,
                b: (int >> 16) & 0xFF,
                g: (int >> 8) & 0xFF,
                r: int & 0xFF
            };
        }
    }
};