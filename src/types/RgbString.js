
import Rgb from './Rgb';

const REG_RGB = /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

/**
 * @class RgbString
 * @private
 */
export default {

    name: 'RgbString',

    parent: Rgb,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.rgbString
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return typeof color === 'string' && !!REG_RGB.exec(color);
    },

    /**
     * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @memberof ColorUtil.rgbString
     *
     * @example
     * ColorUtil.rgbString.toRgb('rgb(0,255,0)')
     * // output: {r: 0, g: 255, b: 0, a: 255}

     * @param      {string} rgbString   Rgb string
     * @param      {number} [a=0xFF]    Alpha value in range 0-255
     * @return     {Object}
     */
    toRgb: (rgbString, a=0xFF) => {
        let [m,r,g,b] = REG_RGB.exec(rgbString) || [];

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
     * @memberof ColorUtil.rgbString
     *
     * @example
     * ColorUtil.rgbString.toInt('rgb(0,255,0)')
     * // output: 65280
     *
     * @param      {string} rgbString    Rgba string
     * @return     {number}
     */
    toInt: rgbString => {
        let [m,r,g,b] = REG_RGB.exec(rgbString) || [];

        return m ?
              (parseInt(r) << 16)
            + (parseInt(g) << 8)
            + parseInt(b)
        : null;
    },

    /**
     * Rgb functional notation string `'rgb(RRR,GGG,BBB)'` to hexadecimal string `'#RRGGBB'`. Alpha is ignored.
     *
     * @memberof ColorUtil.rgbString
     *
     * @example
     * ColorUtil.rgbString.toHex('rgb(0,255,0)')
     * // output: "#00ff00"
     *
     * @param      {string} rgbString    Rgb string
     * @return     {string}
     */
    toHex: rgbString => {
        let [m,r,g,b] = REG_RGB.exec(rgbString) || [];

        return m ?
            '#' + ((1 << 24)
                + (parseInt(r) << 16)
                + (parseInt(g) << 8)
                + parseInt(b)).toString(16).slice(1)
        : null;
    }
}