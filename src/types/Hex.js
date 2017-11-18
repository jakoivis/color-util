
import Rgb from './Rgb';

const REG_HEX_SHORT = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const REG_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

/**
 * @class Hex
 * @private
 */
export default {

    name: 'hex',
    className: 'Hex',
    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hex
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' &&
            !!(REG_HEX.exec(color) || REG_HEX_SHORT.exec(color));
    },

    to: {

        /**
         * 24-bit hex string `'#RRGGBB'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
         *
         * @memberof ColorUtil.hex
         *
         * @example
         * ColorUtil.hex.toRgb('#00FF00');
         * // output: {r: 0, g: 255, b: 0, a: 255}
         * ColorUtil.hex.toRgb('#00FF00', 127);
         * // output: {r: 0, g: 255, b: 0, a: 127}
         *
         * @param      {string}  hex        Hexadecimal string
         * @param      {number}  [a=0xFF]   Alpha value in range 0-255
         * @return     {Object}
         */
        rgb: (hex, a=0xFF) => {
            hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

            let [m,r,g,b] = REG_HEX.exec(hex) || [];

            return m ? {
                r: parseInt(r, 16),
                g: parseInt(g, 16),
                b: parseInt(b, 16),
                a: a
            } : null;
        },

        /**
         * 24-bit hex string `'#RRGGBB'` to 24-bit integer `0xRRGGBB`
         *
         * @memberof ColorUtil.hex
         *
         * @example
         * ColorUtil.hex.toInt('#00FF00');
         * // output: 65280
         *
         * @param      {string}  hex        Hexadecimal string
         * @return     {number}
         */
        int: hex => {
            return parseInt(
                hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b)
                .replace('#', ''), 16);
        },

        /**
         * 24-bit hex string `'#RRGGBB'` to rgb functional notation string `'rgb(RRR,GGG,BBB)'`
         *
         * @memberof ColorUtil.hex
         *
         * @example
         * ColorUtil.hex.to.cssrgb('#00FF00')
         * // output: "rgb(0,255,0)"
         *
         * @param      {string}  hex     Hexadecimal string
         * @return     {string}
         */
        cssrgb: hex => {
            hex = hex.replace(REG_HEX_SHORT, (m, r, g, b) => r + r + g + g + b + b);

            let [m,r,g,b] = REG_HEX.exec(hex) || [];

            return m ? 'rgb('
                + parseInt(r, 16) + ','
                + parseInt(g, 16) + ','
                + parseInt(b, 16) + ')'
            : null;
        },

        /**
         * 24-bit hex string `'#RRGGBB'` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`
         *
         * @memberof ColorUtil.hex
         *
         * @example
         * ColorUtil.hex.to.cssrgba('#00FF00')
         * // output: "rgba(0,255,0,1)"
         *
         * ColorUtil.hex.to.cssrgba('#00FF00', 0.5)
         * // output: "rgba(0,255,0,0.5)"
         *
         * @param      {string}  hex     Hexadecimal string
         * @param      {number}  [a=1]   Alpha value in range 0-1
         * @return     {string}
         */
        cssrgba: (hex, a=1) => {
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
}