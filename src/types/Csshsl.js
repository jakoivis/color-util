
import Hsl from './Hsl';

const REG_HSL = /^hsla?\s*\(\s*(\d{1,3}\s*)\s*,\s*(\d{1,3}\s*)(%)\s*,\s*(\d{1,3}\s*)(%)\s*\)$/;

/**
 * @class Csshsl
 * @private
 */
export default {

    name: 'csshsl',
    className: 'Csshsl',
    parent: Hsl,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.csshsl
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_HSL.exec(color);
    },

    to: {

        /**
         * Hsl functional notation string `'hsl(HHH,SSS%,LLL%)'` to hsl object `{h:H, s:S, l:L, a:A}`
         *
         * @memberof ColorUtil.csshsl
         *
         * @example
         * ColorUtil.csshsl.toHsl('hsl(180, 50%, 60%)');
         * // output: {h: 0.5, s: 0.5, l: 0.6, a: 1}
         *
         * @param      {string} csshsl    Hsl string
         * @param      {number} [a=1]        Alpha value in range 0-1
         * @return     {Object}
         */
        hsl: (csshsl, a=1) => {
            let [m,h,s,p1,l] = REG_HSL.exec(csshsl) || [];

            return m ? {
                    h: parseInt(h) / 360,
                    s: parseInt(s) / 100,
                    l: parseInt(l) / 100,
                    a: a
                }
            : null;
        }
    }
};