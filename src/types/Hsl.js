
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

    /**
     * Creates a gradient.
     *
     * @memberof ColorUtil.hsl
     *
     * @param      {Object}    options                              Options provided by user
     * @param      {Array}     options.colors                       Array of colors. There are multiple types of data structures. Data structure
     *                                                              defines whether the gradient is one or two-dimensional.
     * @param      {string}    [options.type='linear']              Gradient type: linear | circular
     * @param      {boolean}   [options.verify=false]               Verify that each of the colors in colors property have valid data structure.
     *                                                              If set to true, createGradient will throw an error if data structure is not correct.
     *                                                              Data structure is tested from one sample to identify the data structure. This does not
     *                                                              affect that behavior.
     * @param      {boolean}   [options.validate=true]              Validate and add missing color stops and convert colors data structure to internal data structure
     * @param      {boolean}   [options.addDefaultColors=true]      Whether to add default colors to fill the missing values. This allows using e.g. {r:0xff}
     *                                                              as a red value for Rgb gradient without the need for defining the rest of the color components.
     *                                                              Use defaultColor property to specify a color.
     * @param      {function}  [options.defaultColor={h:0,s:0,l:0,a:1}] Default color used to fill the missing color components in gradient colors
     * @param      {number}    [options.width=100]                  Set size of the gradient in pixels.
     * @param      {number}    [options.height=100]                 Set size of the gradient in pixels.
     * @param      {number}    [options.centerX=0]                  Center position of a gradient. Value in range 0 to 1 where 0 is the left edge of the gradient and 1 is the right edge.
     *                                                              centerX can be used with linear type of gradients to set point of rotation.
     * @param      {number}    [options.centerY=0]                  Center position of a gradient. Value in range 0 to 1 where 0 is the top edge of the gradient and 1 is the bottom edge.
     *                                                              centerY can be used with linear type of gradients to set point of rotation.
     * @param      {number}    [options.scale=1]                    Scale of the gradient. Value in range 0 to 1.
     * @param      {number}    [options.scaleX=1]                   Scale of the gradient on x axis. Value in range 0 to 1.
     * @param      {number}    [options.scaleY=1]                   Scale of the gradient on y axis. Value in range 0 to 1.
     * @param      {number}    [options.translateX=0]               Translate gradient along x axis. Value in range 0 to 1.
     * @param      {number}    [options.translateY=0]               Translate gradient along y axis. Value in range 0 to 1.
     * @param      {boolean}   [options.centerize=false]            Overrides translate values and automatically adjusts the positioning to the center.
     * @param      {number}    [options.rotation=0]                 Rotation of the gradient. Value in range 0 to 1.
     * @param      {function}  [options.repeatX=ColorUtil.Repeat.repeat] X repetition of gradient when calculating a color that is out of normal range 0 to 1.
     * @param      {function}  [options.repeatY=ColorUtil.Repeat.repeat] Y repetition of gradient when calculating a color that is out of normal range 0 to 1.
     *
     * @return     {function}  Function that calculates a color for a single point on gradient. Accepts x and y parameters.
     *                         Though the x and y may exceed the limit, but gradient repeat will take effect.
     */
    createGradient: options => {

        return Gradient.createGradient(options, {

            mixColors: mixColors,

            defaultColor: {
                h: 0,
                s: 0,
                l: 0,
                a: 1
            }
        });
    }
}

function mixColors(color1, color2, position) {

    return {
        h: color1.h - position * (color1.h - color2.h),
        s: color1.s - position * (color1.s - color2.s),
        l: color1.l - position * (color1.l - color2.l),
        a: color1.a - position * (color1.a - color2.a)
    }
}