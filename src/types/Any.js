
import _ from '../Utils';
import ConversionUtil from '../ConversionUtil';
import {TYPES} from './types';

let Any = {to:{}};

_.forEach(TYPES, (type) => {

    let name = _.lowerFirst(type.name);

    Any.to[name] = (color) => {

        return ConversionUtil.convertAny(color, type, TYPES);
    };
});

export default Any;

/**
 * Any conversion functions.
 *
 * Converts color notations to any notation. (Except for Intrgba and Int32ABGR)
 *
 * The any conversion functions provide an easy way to convert to specific notation
 * without knowing the notation of a source color. This is just a collection of
 * convenience methods making the usage a little bit easier. These functions are not
 * as fast as the direct conversion functions.
 *
 * @namespace any
 * @memberof colorutil
 */

/**
 * @namespace to
 * @memberof colorutil.any
 */

/**
 * Convert any color to rgb object notation `{r:RRR, g:GGG, b:BBB, a:AAA}`
 *
 * @example
 * colorutil.any.to.rgb(0xFF0000);
 * // output: {r: 255, g: 0, b: 0, a: 255}
 *
 * colorutil.any.to.rgb({h: 1/6, s: 0.5, l: 0.5});
 * // output: {r: 191, g: 191, b: 64, a: 255}
 *
 * @name rgb
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {Object}
 */

/**
 * Convert any color to number notation `0xRRGGBB`
 *
 * @example
 * colorutil.any.to.int('hsl(180, 50%, 60%)');
 * // output: 6737100
 *
 * @name int
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {number}
 */

/**
 * Convert any color to hex notation `'#RRGGBB'`
 *
 * @example
 * colorutil.any.to.hex('hsl(180, 50%, 60%)');
 * // output: "#66cccc"
 *
 * @name hex
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {string}
 */

/**
 * Convert any color to rgb functional notation `'rgb(RRR,GGG,BBB)'`
 *
 * @example
 * colorutil.any.to.cssrgb('hsl(180, 50%, 60%)');
 * // output: "rgb(102,204,204)"
 *
 * @name cssrgb
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {string}
 */

/**
 * Convert any color to rgb functional notation `'rgba(RRR,GGG,BBB,A)'`
 *
 * @example
 * colorutil.any.to.cssrgba('hsl(180, 50%, 60%)');
 * // output: "rgba(102,204,204,1)"
 *
 * @name cssrgba
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {string}
 */

/**
 * Convert any color to hsl object notation `{h:H, s:S, v:V, a:A}`
 *
 * @example
 * colorutil.any.to.hsl('hsl(180, 50%, 60%)');
 * // output: {h: 0.5, s: 0.5, l: 0.6, a: 1}
 *
 * @name hsl
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {Object}
 */

/**
 * Convert any color to hsv object notation `{h:H, s:S, v:V, a:A}`
 *
 * @example
 * colorutil.any.to.hsv('hsl(180, 50%, 60%)');
 * // output: {h: 0.5, s: 0.5000000000000001, v: 0.8, a: 1}
 *
 * @name hsv
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {Object}
 */

/**
 * Convert any color to hsl functional notation string `'hsl(HHH,SSS%,LLL%)'`
 *
 * @example
 * colorutil.any.csshsl({h: 0.5, s: 0.5, l: 0.6, a: 1});
 * // output: "hsl(180,50%,60%)"
 *
 * @name csshsl
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {string}
 */

/**
 * Convert any color to hsl functional notation string `'hsla(HHH,SSS%,LLL%,A)'`
 *
 * @example
 * colorutil.any.csshsla({h: 0.5, s: 0.5, l: 0.6, a: 1});
 * // output: "hsla(180,50%,60%,1)"
 *
 * @name csshsla
 * @memberof colorutil.any.to
 *
 * @param      {Object}  color        Color in any notation
 * @return     {string}
 */
