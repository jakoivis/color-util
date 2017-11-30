
import Rgb from './Rgb';

const REG_RGB = /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

/**
 * cssrgb conversion functions
 *
 * cssrgb notation is `'rgb(RRR,GGG,BBB)'`
 *
 * @namespace cssrgb
 * @memberof colorutil
 */
export default {

    name: 'cssrgb',
    className: 'Cssrgb',
    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof colorutil.cssrgb
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_RGB.exec(color);
    },

    /**
     * @namespace to
     * @memberof colorutil.cssrgb
     */
    to: {

        /**
         * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
         *
         * @memberof colorutil.cssrgb.to
         *
         * @example
         * ColorUtil.cssrgb.toRgb('rgb(0,255,0)')
         * // output: {r: 0, g: 255, b: 0, a: 255}

         * @param      {string} cssrgb   Rgb string
         * @param      {number} [a=0xFF]    Alpha value in range 0-255
         * @return     {Object}
         */
        rgb: (cssrgb, a=0xFF) => {
            let [m,r,g,b] = REG_RGB.exec(cssrgb) || [];

            return m ? {
                    r: parseInt(r),
                    g: parseInt(g),
                    b: parseInt(b),
                    a: a
                }
            : null;
        },

        /**
         * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to 24-bit integer `0xRRGGBB`. Alpha is ignored.
         *
         * @memberof colorutil.cssrgb.to
         *
         * @example
         * ColorUtil.cssrgb.toInt('rgb(0,255,0)')
         * // output: 65280
         *
         * @param      {string} cssrgb    Rgba string
         * @return     {number}
         */
        int: cssrgb => {
            let [m,r,g,b] = REG_RGB.exec(cssrgb) || [];

            return m ?
                  (parseInt(r) << 16)
                + (parseInt(g) << 8)
                + parseInt(b)
            : null;
        },

        /**
         * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to hexadecimal string `'#RRGGBB'`. Alpha is ignored.
         *
         * @memberof colorutil.cssrgb.to
         *
         * @example
         * ColorUtil.cssrgb.toHex('rgb(0,255,0)')
         * // output: "#00ff00"
         *
         * @param      {string} cssrgb    Rgb string
         * @return     {string}
         */
        hex: cssrgb => {
            let [m,r,g,b] = REG_RGB.exec(cssrgb) || [];

            return m ?
                '#' + ((1 << 24)
                    + (parseInt(r) << 16)
                    + (parseInt(g) << 8)
                    + parseInt(b)).toString(16).slice(1)
            : null;
        }
    }
}