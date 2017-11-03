
import Gradient from '../Gradient';

/**
 * @class Hsv
 * @private
 */
export default {

    name: 'Hsv',

    parent: null,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hsv
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return color !== null &&
            typeof color === 'object' &&
            color.hasOwnProperty('h') &&
            color.hasOwnProperty('s') &&
            color.hasOwnProperty('v') &&
            (color.h >= 0 && color.h <= 1) &&
            (color.s >= 0 && color.s <= 1) &&
            (color.v >= 0 && color.v <= 1) &&
            (color.hasOwnProperty('a') ? (color.a >= 0 && color.a <= 1) : true);
    },

    /**
     * Hsv object `{h:H, s:S, v:V, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @example
     * ColorUtil.hsv.toRgb({h: 0, s: 1, v: 1});
     * // output: {r: 255, g: 0, b: 0, a: 255}
     * ColorUtil.hsv.toRgb({h: 0, s: 1, v: 1, a: 0.5});
     * // output: {r: 255, g: 0, b: 0, a: 128}
     *
     * @memberof ColorUtil.hsv
     *
     * @param      {Object}  hsv        Hsv object
     * @return     {Object}
     */
    toRgb: hsv => {
        let {h:h, s:s, v:v, a:a} = hsv;
        let c = v * s
        let x = c * (1 - Math.abs(h * 6 % 2 - 1));
        let m = v - c;
        let r, g, b;

        if (h < 1/6) {
            [r, g, b] = [c, x, 0];

        } else if (h < 2/6) {
            [r, g, b] = [x, c, 0];

        } else if (h < 3/6) {
            [r, g, b] = [0, c, x];

        } else if (h < 4/6) {
            [r, g, b] = [0, x, c];

        } else if (h < 5/6) {
            [r, g, b] = [x, 0, c];

        } else {
            [r, g, b] = [c, 0, x];
        }

        return {
            r: (r + m) * 0xFF,
            g: (g + m) * 0xFF,
            b: (b + m) * 0xFF,
            a: !isNaN(parseFloat(a)) ? a * 0xFF : 0xFF
        };
    },

    /**
     * Hsv object `{h:H, s:S, v:V, a:A}` to hsl object `{h:H, s:S, l:L, a:A}`
     *
     * @example
     * ColorUtil.hsv.toHsl({h: 1/6, s: 0.5, v: 0.5});
     * // output: {h: 0.16666666666666666, s: 0.3333333333333333, l: 0.375, a: 1}
     *
     * @memberof ColorUtil.hsv
     *
     * @param      {Object}  hsv        Hsl object
     * @return     {Object}
     */
    toHsl: hsv => {
        let {h:h, s:s, v:v, a:a} = hsv;

        let l = 0.5 * v * (2 - s);

        s = v * s / (1 - Math.abs(2 * l - 1));

        return {
            h: h,
            s: s,
            l: l,
            a: a === undefined ? 1 : a
        };
    },

    createGradient: options => {

        return Gradient.createGradient(options, {

            mixColors: mixColors,

            defaultColor: {
                h: 0,
                s: 0,
                v: 0,
                a: 1
            }
        });
    }
}

function mixColors(color1, color2, position) {

    return {
        h: color1.h - position * (color1.h - color2.h),
        s: color1.s - position * (color1.s - color2.s),
        v: color1.v - position * (color1.v - color2.v),
        a: color1.a - position * (color1.a - color2.a)
    }
}