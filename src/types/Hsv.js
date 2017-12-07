
import Gradient from '../Gradient';

/**
 * Hsv conversion functions
 *
 * Hsv notation is `{h:H, s:S, v:V, a:A}` where each component
 * (hue, saturation, value, alpha) are in range 0-1.
 *
 * @namespace hsv
 * @memberof colorutil
 */
export default {

    name: 'hsv',
    className: 'Hsv',
    parent: null,

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof colorutil.hsv
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
     * @namespace to
     * @memberof colorutil.hsv
     */
    to: {

        /**
         * Hsv object `{h:H, s:S, v:V, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`
         *
         * @example
         * colorutil.hsv.to.rgb({h: 0, s: 1, v: 1});
         * // output: {r: 255, g: 0, b: 0, a: 255}
         * colorutil.hsv.to.rgb({h: 0, s: 1, v: 1, a: 0.5});
         * // output: {r: 255, g: 0, b: 0, a: 128}
         *
         * @memberof colorutil.hsv.to
         *
         * @param      {Object}  hsv        Hsv object
         * @return     {Object}
         */
        rgb: hsv => {
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
         * colorutil.hsv.to.hsl({h: 1/6, s: 0.5, v: 0.5});
         * // output: {h: 0.16666666666666666, s: 0.3333333333333333, l: 0.375, a: 1}
         *
         * @memberof colorutil.hsv.to
         *
         * @param      {Object}  hsv        Hsl object
         * @return     {Object}
         */
        hsl: hsv => {
            let {h:h, s:s, v:v, a:a} = hsv;

            let l = 0.5 * v * (2 - s);

            s = v * s / (1 - Math.abs(2 * l - 1));

            return {
                h: h,
                s: s,
                l: l,
                a: a === undefined ? 1 : a
            };
        }
    },

    /**
     * Creates a gradient.
     *
     * @memberof colorutil.hsv
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
     * @param      {function}  [options.defaultColor={h:0,s:0,v:0,a:1}] Default color used to fill the missing color components in gradient colors
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
     * @param      {boolean}   [options.centralize=false]           Overrides translate values and automatically adjusts the positioning to the center.
     * @param      {number}    [options.rotation=0]                 Rotation of the gradient. Value in range 0 to 1.
     * @param      {function}  [options.repeatX=colorutil.repeat.repeat] X repetition of gradient when calculating a color that is out of normal range 0 to 1.
     * @param      {function}  [options.repeatY=colorutil.repeat.repeat] Y repetition of gradient when calculating a color that is out of normal range 0 to 1.
     *
     * @return     {function}  Function that calculates a color for a single point on gradient. Accepts x and y parameters.
     *                         Though the x and y may exceed the limit, but gradient repeat will take effect.
     */
    gradient: options => {

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