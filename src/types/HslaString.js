
import Hsl from './Hsl';

const REG_HSLA = /^hsla?\s*\(\s*(\d{1,3}\s*)\s*,\s*(\d{1,3}\s*)(%)\s*,\s*(\d{1,3}\s*)(%)\s*,\s*(\d*\.?\d*)\s*\)$/;

/**
 * @class HslString
 * @private
 */
export default {

    name: 'HslaString',

    parent: Hsl,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hslaString
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
     *
     * @example
     * ColorUtil.hslaString.toHsl('hsla(180, 50%, 60%, 0.5)');
     * // output: {h: 0.5, s: 0.5, l: 0.6, a: 0.5}
     *
     * @param      {string} hslaString    Hsl string
     * @return     {Object}
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