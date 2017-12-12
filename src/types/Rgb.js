
import Gradient from '../Gradient';
import GradientData from '../gradientData/GradientData';

const INT32_ALPHA_LE = (0xFF << 24) >>> 0;

const DEFAULT_COLOR = {
    r: 0,
    g: 0,
    b: 0,
    a: 255
};

/**
 * Rgb conversion functions
 *
 * Rgb object notation is `{r:RRR, g:GGG, b:BBB, a:AAA}` where each color component
 * (red, grean, blue, alpha) range is 0-255. In some conversion functions
 * alpha is not required. In those where it is required and not present in
 * rgb object, a fully opaque value is used as a default.
 *
 * @namespace rgb
 * @memberof colorutil
 */
let Rgb = new function() {

    this.name = 'rgb';
    this.className = 'Rgb';
    this.parent = null;

    /**
     * Test validity of a color whether it is in correct notation for this class.
     *
     * @memberof colorutil.rgb
     *
     * @param      {*}          color   The color
     * @return     {boolean}    True if valid, False otherwise.
     */
    this.test = color => {
        return color !== null &&
            typeof color === 'object' &&
            color.hasOwnProperty('r') &&
            color.hasOwnProperty('g') &&
            color.hasOwnProperty('b') &&
            (color.r >= 0 && color.r <= 255) &&
            (color.g >= 0 && color.g <= 255) &&
            (color.b >= 0 && color.b <= 255) &&
            (color.hasOwnProperty('a') ? (color.a >= 0 && color.a <= 255) : true);
    };

    /**
     * @memberof colorutil.rgb
     *
     * @return     {Array} Array of hue colors
     */
    this.hueColors = () => {
        return [
            {a: 255, b: 0, g: 0, r: 255},
            {a: 255, b: 0, g: 255, r: 255},
            {a: 255, b: 0, g: 255, r: 0},
            {a: 255, b: 255, g: 255, r: 0},
            {a: 255, b: 255, g: 0, r: 0},
            {a: 255, b: 255, g: 0, r: 255},
            {a: 255, b: 0, g: 0, r: 255}
        ];
    };

    /**
     * @memberof colorutil.rgb
     *
     * @param      {Object}  rgb     Rgb object
     * @return     {Object}  hue color in Rgb object notation
     */
    this.hue = (rgb) => {

        let parts = Gradient.partialGradient(Rgb.hueColors(), Rgb.to.hsv(rgb).h);

        return this.mix(
            parts.item1,
            parts.item2,
            parts.position);
    };

    /**
     * Creates a gradient.
     *
     * @memberof colorutil.rgb
     *
     * @param      {Object}    options                              Options
     * @param      {Array|GradientData}     options.colors          Array of colors or instance of GradientData. There are multiple types of data structures. Data structure
     *                                                              defines whether the gradient is one or two-dimensional.
     * @param      {string}    [options.type='linear']              Gradient type: linear | circular
     * @param      {boolean}   [options.verify=false]               Verify that each of the colors in colors property have valid data structure.
     *                                                              If set to true, createGradient will throw an error if data structure is not correct.
     *                                                              Data structure is tested from one sample to identify the data structure. This does not
     *                                                              affect that behavior.
     * @param      {boolean}   [options.validate=true]              Validate and add missing color stops and convert colors data structure to internal data structure
     * @param      {function}  [options.defaultColor={r:0,g:0,b:0,a:255}] Default color used to fill the missing color components in gradient colors.
     *                                                              If options.colors is GradientData, specify the defaultColor for GradientData instead.
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
    this.gradient = (options) => {

        return Gradient.createGradient(options, {

            mixColors: this.mix,
            defaultColor: DEFAULT_COLOR
        });
    };

    /**
     * Create a gradient data object which allows conversion
     * between the supported data structures
     *
     * @memberof colorutil.rgb
     *
     * @param      {Array}          data            Array of colors. There are multiple types of data structures.
     * @param      {Object}         [defaultColor={r:0,g:0,b:0,a:255}]  The default color
     * @return     {GradientData}
     */
    this.gradientData = (data, defaultColor) => {

        defaultColor = defaultColor || DEFAULT_COLOR;

        return new GradientData(data, defaultColor);
    };

    /**
     * Mix two colors. This function has no checking if values are correct.
     *
     * @memberof colorutil.rgb
     * @private
     *
     * @param      {Object} color1    Rgb color
     * @param      {Object} color2    Rgb color
     * @param      {number} position  Position between colors. A value in range 0 - 1
     * @return     {Object}
     */
    this.mix = (color1, color2, position) => {

        return {
            r: color1.r - position * (color1.r - color2.r),
            g: color1.g - position * (color1.g - color2.g),
            b: color1.b - position * (color1.b - color2.b),
            a: color1.a - position * (color1.a - color2.a)
        }
    }

    /**
     * @namespace to
     * @memberof colorutil.rgb
     */
    this.to = {

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 24-bit number `0xRRGGBB`. Alpha is ignored.
         *
         * @example
         * colorutil.rgb.to.int({r: 0, g: 128, b: 255});
         * // output: 33023
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {number}
         */
        int: rgb => {
            return rgb.r << 16 | rgb.g << 8 | rgb.b;
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 24-bit hex string `'#RRGGBB'`. Alpha is ignored.
         *
         * @example
         * colorutil.rgb.to.hex({r: 0, g: 128, b: 255});
         * // output: "#0080ff"
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {string}
         */
        hex: rgb => {
            // e.g. (10<<8).toString(16) equals A00, but we need to write this in format 0A00
            // by adding 1<<16 (10000) to the result and removing the first digit
            // we have produced 0A00 like this: ((1<<16) + (10<<8)).toString(16).slice(1)
            return '#' + ((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b)
                .toString(16).slice(1);
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB}` to rgb functional notation string `'rgb(RRR,GGG,BBB)'`.
         * Alpha is converted from range 0-255 to 0-1.
         *
         * @example
         * colorutil.rgb.to.cssrgb({r: 0, g: 128, b: 255});
         * // output: "rgb(0,128,255)"
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {string}
         */
        cssrgb: rgb => {
            return `rgb(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)})`;
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`.
         * Alpha is converted from range 0-255 to 0-1.
         *
         * @example
         * colorutil.rgb.to.cssrgba({r: 0, g: 128, b: 255, a: 85});
         * // output: "rgba(0,128,255,0.3333333333333333)"
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {string}
         */
        cssrgba: rgb => {
            return `rgba(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)},${rgb.a/0xFF})`;
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xAABBGGRR` (little-endian)
         * Resulting value is positive
         *
         * @example
         * colorutil.rgb.to.uintabgr({r: 0, g: 128, b: 255, a: 255});
         * // output: 4294934528
         * colorutil.rgb.to.uintabgr({r: 0, g: 128, b: 255, a: 85});
         * // output: 1442807808
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {number}
         */
        uintabgr: rgb => {
            return (rgb.a << 24 | rgb.b << 16 | rgb.g << 8 | rgb.r) >>> 0
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB}` to 32-bit number `0xAABBGGRR` (little-endian)
         * Alpha value is discarded and fully opaque value is used. Resulting value is positive
         *
         * @example
         * colorutil.rgb.to.uintabgrOpaque({r: 0, g: 128, b: 255})
         * // output: 4294934528
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {number}
         */
        uintabgrOpaque: rgb => {
            return (INT32_ALPHA_LE | rgb.b << 16 | rgb.g << 8 | rgb.r) >>> 0
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xRRGGBBAA` (big-endian)
         * Resulting value is positive
         *
         * @example
         * colorutil.rgb.to.uintrgba({r: 0, g: 128, b: 255, a: 255});
         * // output: 8454143
         * colorutil.rgb.to.uintrgba({r: 0, g: 128, b: 255, a: 85});
         * // output: 8453973
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {number}
         */
        uintrgba: rgb => {
            return (rgb.r << 24 | rgb.g << 16 | rgb.b << 8 | rgb.a) >>> 0;
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xAABBGGRR` (little-endian)
         * Resulting value can be negative.
         *
         * @example
         * colorutil.rgb.to.intabgr({r: 0, g: 128, b: 255, a: 255});
         * // output: -32768
         * colorutil.rgb.to.intabgr({r: 0, g: 128, b: 255, a: 85});
         * // output: 1442807808
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {number}
         */
        intabgr: rgb => {
            return rgb.a << 24 | rgb.b << 16 | rgb.g << 8 | rgb.r;
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB}` to 32-bit number `0xAABBGGRR` (little-endian)
         * Alpha value is discarded and fully opaque value is used. Resulting value can be negative.
         *
         * @example
         * colorutil.rgb.to.intabgrOpaque({r: 0, g: 128, b: 255})
         * // output: -32768
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {number}
         */
        intabgrOpaque: rgb => {
            return INT32_ALPHA_LE | rgb.b << 16 | rgb.g << 8 | rgb.r;
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xRRGGBBAA` (big-endian).
         * Resulting value can be negative.
         *
         * @example
         * colorutil.rgb.to.intrgba({r: 0, g: 128, b: 255, a: 255});
         * // output: 8454143
         * colorutil.rgb.to.intrgba({r: 0, g: 128, b: 255, a: 85});
         * // output: 8453973
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {number}
         */
        intrgba: rgb => {
            return rgb.r << 24 | rgb.g << 16 | rgb.b << 8 | rgb.a;
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to hsl object `{h:H, s:S, l:L, a:A}`
         * where h, s, l, a (saturation, luminosity, alpha) are in range 0-1.
         *
         * @example
         * colorutil.rgb.to.hsl({r: 255, g: 0, b: 0, a: 255});
         * // output: {h: 0, s: 1, l: 0.5, a: 1}
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {Object}
         */
        hsl: rgb => {
            let {r:r, g:g, b:b, a:a} = rgb;

            r /= 0xFF;
            g /= 0xFF;
            b /= 0xFF;
            a = !isNaN(parseInt(a)) ? a / 0xFF : 1;

            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let delta = max - min;
            let luminosity = (max + min) / 2;
            let saturation = 0;
            let hue = 0;

            if (delta > 0) {
                saturation = delta / (1 - Math.abs(luminosity * 2 - 1));

                if (b === max) {
                    hue = ((r - g) / delta) + 4;

                } else if (g === max) {
                    hue = ((b - r) / delta) + 2;

                } else if (r === max) {
                    hue = ((g - b) / delta) + (g < b ? 6 : 0);
                    // or this one
                    // hue = ((g - b) / delta) % 6;

                    // TODO: check why this is here and not after hue *= 60 statement and why unit tests don't break when removing
                    if (hue < 0) {
                        hue += 360;
                    }
                }

                hue /= 6;
            }

            return {
                h: hue,
                s: saturation,
                l: luminosity,
                a: a
            }
        },

        /**
         * Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to hsv object `{h:H, s:S, v:V, a:A}`
         * where h, s, v, a (hue, saturation, value, alpha) are in range 0-1.
         *
         * @example
         * colorutil.rgb.to.hsv({r: 255, g: 0, b: 0, a: 255});
         * // output: {h: 0, s: 1, v: 1, a: 1}
         *
         * @memberof colorutil.rgb.to
         *
         * @param      {Object}    rgb
         * @return     {Object}
         */
        hsv: rgb => {
            let {r:r, g:g, b:b, a:a} = rgb;

            r /= 0xFF;
            g /= 0xFF;
            b /= 0xFF;
            a = !isNaN(parseInt(a)) ? a / 0xFF : 1;

            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let delta = max - min;
            let saturation = 0;
            let hue = 0;

            if (delta > 0) {
                saturation = delta / max;

                if (b === max) {
                    hue = ((r - g) / delta) + 4;

                } else if (g === max) {
                    hue = ((b - r) / delta) + 2;

                } else if (r === max) {
                    hue = ((g - b) / delta) + (g < b ? 6 : 0);
                    // or this one
                    // hue = ((g - b) / delta) % 6;

                    if (hue < 0) {
                        hue += 360;
                    }
                }

                hue /= 6;
            }

            return {
                h: hue,
                s: saturation,
                v: max,
                a: a
            }
        }
    };
}();

export default Rgb;