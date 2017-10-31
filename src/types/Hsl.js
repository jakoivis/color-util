
import Gradient from '../Gradient';

/**
 * @class Hsl
 * @private
 */
export default {

    name: 'Hsl',

    parent: null,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof ColorUtil.hsl
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    test: color => {
        return color !== null &&
            typeof color === 'object' &&
            color.hasOwnProperty('h') &&
            color.hasOwnProperty('s') &&
            color.hasOwnProperty('l') &&
            (color.h >= 0 && color.h <= 1) &&
            (color.s >= 0 && color.s <= 1) &&
            (color.l >= 0 && color.l <= 1) &&
            (color.hasOwnProperty('a') ? (color.a >= 0 && color.a <= 1) : true);
    },

    /**
     * Hsl object `{h:H, s:S, l:L, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
     *
     * @example
     * ColorUtil.hsl.toRgb({h: 1/6, s: 0.5, l: 0.5});
     * // output: {r: 191, g: 191, b: 64, a: 255}
     *
     * ColorUtil.hsl.toRgb({h: 1/6, s: 0.5, l: 0.5, a: 0.5});
     * // output: {r: 191, g: 191, b: 64, a: 128}
     *
     * @memberof ColorUtil.hsl
     *
     * @param      {Object}  hsl        Hsl object
     * @return     {Object}
     */
    toRgb: hsl => {
        let {h:h, s:s, l:l, a:a} = hsl;
        let c = (1 - Math.abs(2 * l - 1)) * s
        let x = c * (1 - Math.abs(h * 6 % 2 - 1));
        let m = l - c / 2;
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
            a: a === undefined ? 0xFF : a * 0xFF
        };
    },

    /**
     * Hsl object `{h:H, s:S, l:L, a:A}` to hsv object `{h:H, s:S, v:V, a:A}`
     *
     * @example
     * ColorUtil.hsl.toHsv({h: 1/6, s: 0.5, l: 0.5});
     * // output: {h: 0.16666666666666666, s: 0.6666666666666666, v: 0.75, a: 1}
     *
     * @memberof ColorUtil.hsl
     *
     * @param      {Object}  hsl        Hsl object
     * @return     {Object}
     */
    toHsv: hsl => {
        let {h:h, s:s, l:l, a:a} = hsl;

        let v = (2 * l + s * (1 - Math.abs(2 * l - 1))) / 2;
        s = (2 * (v - l)) / v;

        return {
            h: h,
            s: s,
            v: v,
            a: a === undefined ? 1 : a
        };
    },

    /**
     * Convert hsl object `{h:H, s:S, l:L}` to hsl functional notation string `'hsl(HHH,SSS%,LLL%)'`.
     *
     * @example
     * ColorUtil.hsl.toHslString({h:2/6, s:0.5, l:0.5});
     * // output: "hsl(120,50%,50%)"
     *
     * @memberof ColorUtil.hsl
     *
     * @param      {Object}    hsl
     * @return     {string}
     */
    toHslString: hsl => {
        return `hsl(${Math.round(hsl.h*360)},${Math.round(hsl.s*100)}%,${Math.round(hsl.l*100)}%)`;
    },

    /**
     * Convert hsl object `{h:H, s:S, l:L, a:A}` to hsl functional notation string `'hsla(HHH,SSS%,LLL%,A)'`.
     *
     * @example
     * ColorUtil.hsl.toHslaString({h:2/6, s:0.5, l:0.5, a:0.5});
     * // output: "hsla(120,50%,50%,0.5)"
     *
     * @memberof ColorUtil.hsl
     *
     * @param      {Object}    hsl
     * @return     {string}
     */
    toHslaString: hsl => {
        return `hsla(${Math.round(hsl.h*360)},${Math.round(hsl.s*100)}%,${Math.round(hsl.l*100)}%,${hsl.a})`;
    },


    createGradient: options => {

        return Gradient.createGradient(options, {

            gradientPointColor: gradientPointColor,

            defaults: () => {
                return {
                    h: 0,
                    s: 0,
                    l: 0,
                    a: 1
                };
            }
        });
    }
}

function gradientPointColor(color1, color2, position) {

    return {
        h: color1.h - position * (color1.h - color2.h),
        s: color1.s - position * (color1.s - color2.s),
        l: color1.l - position * (color1.l - color2.l),
        a: color1.a - position * (color1.a - color2.a)
    }
}