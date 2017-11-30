
import Rgb from './Rgb';

const REG_RGBA = /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d*\.?\d*)\s*\)$/;

/**
 * cssrgba conversion functions
 *
 * cssrgba notation is `'rgba(RRR,GGG,BBB,A)'`
 *
 * @namespace cssrgba
 * @memberof colorutil
 */
export default {

    name: 'cssrgba',
    className: 'Cssrgba',
    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof colorutil.cssrgba
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_RGBA.exec(color);
    },

    /**
     * @namespace to
     * @memberof colorutil.cssrgba
     */
    to: {

        /**
         * Rgba functional notation string `'rgba(RRR,GGG,BBB,A)'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
         *
         * @memberof colorutil.cssrgba.to
         *
         * @example
         * ColorUtil.cssrgba.toRgb('rgba(0,255,0,0.5)')
         * // output: {r: 0, g: 255, b: 0, a: 127}

         * @param      {string} cssrgba    Rgba string
         * @return     {Object}
         */
        rgb: cssrgba => {
            let [m,r,g,b,a] = REG_RGBA.exec(cssrgba) || [];

            return m ? {
                    r: parseInt(r),
                    g: parseInt(g),
                    b: parseInt(b),
                    a: a ? (parseFloat(a) * 0xFF) | 0 : 0xFF
                }
            : null;
        },

        /**
         * Rgba functional notation string `'rgba(RRR,GGG,BBB,A)'` to 24-bit integer `0xRRGGBB`. Alpha is ignored.
         *
         * @memberof colorutil.cssrgba.to
         *
         * @example
         * ColorUtil.cssrgba.toInt('rgba(0,255,0,0.5)')
         * // output: 65280
         *
         * @param      {string} cssrgba    Rgba string
         * @return     {number}
         */
        int: cssrgba => {
            let [m,r,g,b] = REG_RGBA.exec(cssrgba) || [];

            return m ?
                  (parseInt(r) << 16)
                + (parseInt(g) << 8)
                + parseInt(b)
            : null;
        },

        /**
         * Rgba functional notation string `'rgba(RRR,GGG,BBB,A)'` to hexadecimal string `'#RRGGBB'`. Alpha is ignored.
         *
         * @memberof colorutil.cssrgba.to
         *
         * @example
         * ColorUtil.cssrgba.toHex('rgba(0,255,0,0.5)')
         * // output: "#00ff00"
         *
         * @param      {string} cssrgba    Rgba string
         * @return     {string}
         */
        hex: cssrgba => {
            let [m,r,g,b] = REG_RGBA.exec(cssrgba) || [];

            return m ?
                '#' + ((1 << 24)
                    + (parseInt(r) << 16)
                    + (parseInt(g) << 8)
                    + parseInt(b)).toString(16).slice(1)
            : null;
        }
    }
}