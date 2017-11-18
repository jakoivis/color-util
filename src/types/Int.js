
import Rgb from './Rgb';

/**
 * @class Int
 * @private
 */
export default {

    name: 'int',
    className: 'Int',
    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.int
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'number' &&
            color <= 0xFFFFFF &&
            color >= 0;
    },

    to: {

        /**
         * 24-bit number `0xRRGGBB` to rgb `{r:RRR, g:GGG, b:BBB, a:AAA}`
         *
         * @memberof ColorUtil.int
         *
         * @example
         * ColorUtil.int.toRgb(0xFF0000);
         * // output: {r: 255, g: 0, b: 0, a: 255}
         *
         * ColorUtil.int.toRgb(0xFF0000, 128);
         * // output: {r: 255, g: 0, b: 0, a: 128}
         *
         * @param      {number}  int        Integer
         * @param      {number}  [a=0xFF]   Alpha value in range 0-255
         * @return     {Object}
         */
        rgb: (int, a=0xFF) => {
            return {
                r: (int & 0xFF0000) >> 16,
                g: (int & 0x00FF00) >> 8,
                b: int & 0x0000FF,
                a: a
            };
        },

        /**
         * 24-bit number `0xRRGGBB` to 24-bit hex string `'#RRGGBB'`.
         *
         * @memberof ColorUtil.int
         *
         * @example
         * ColorUtil.int.toHex(0x00FF00);
         * // output: "#00ff00"
         *
         * @param      {number}  int        Integer
         * @return     {string}
         */
        hex: int => {
            return '#' + ((1 << 24) + int).toString(16).slice(1);
        },

        /**
         * 24-bit number `0xRRGGBB` to rgb functional notation string `'rgb(RRR,GGG,BBB)'`
         *
         * @memberof ColorUtil.int
         *
         * @example
         * ColorUtil.int.to.cssrgb(0x00FF00);
         * // output: "rgb(0,255,0)"
         *
         * @param      {number}  int        Integer
         * @return     {string}
         */
        cssrgb: int => {
            return 'rgb('
                    + ((int & 0xFF0000) >> 16) + ','
                    + ((int & 0x00FF00) >> 8) + ','
                    + (int & 0x0000FF) + ')';
        },

        /**
         * 24-bit number `0xRRGGBB` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`
         *
         * @memberof ColorUtil.int
         *
         * @example
         * ColorUtil.int.to.cssrgba(0x00FF00);
         * // output: "rgba(0,255,0,1)"
         *
         * ColorUtil.int.to.cssrgba(0x00FF00, 0.5);
         * // output: "rgba(0,255,0,0.5)"
         *
         * @param      {number}  int        Integer
         * @param      {number}  [a=1]      Alpha value in range 0-1
         * @return     {string}
         */
        cssrgba: (int, a=1) => {
            return 'rgba('
                    + ((int & 0xFF0000) >> 16) + ','
                    + ((int & 0x00FF00) >> 8) + ','
                    + (int & 0x0000FF) + ','
                    + a +')';
        }
    }
}