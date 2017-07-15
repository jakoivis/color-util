[![Build Status](https://travis-ci.org/jakoivis/color-util.svg?branch=master)](https://travis-ci.org/jakoivis/color-util)
[![Downloads this month](https://img.shields.io/npm/dm/color-util.svg)](https://npmjs.org/package/color-util)
[![Npm version](https://img.shields.io/npm/v/color-util.svg)](https://npmjs.org/package/color-util)

[![NPM](https://nodei.co/npm/color-util.png)](https://npmjs.org/package/color-util)

![Preview](/example/githubimage.jpg)

Note that this package is still in ealy version 0.x.x so you should expect some changes that break backward compatibility. Target of this package is to have color utilities that concentrate on performance rather than usability.

[benchmarks](http://www.jarmokoivisto.fi/projects/color-util/benchmark-0.4.1-chrome-result.html)

## Change history
* 0.4.0 ColorUtil.any conversion functions. Hue range changed to 0-1. Convert function can convert single color. RgbString spaces allowed. HslString conversion functions. RgbString regexp fixed. Rounding removed when converting to Rgb object.
* 0.3.0 Rgb -> Hsv -> Rgb, fix rgb.toHsl conversion negative hue value
* 0.2.0 Rgb -> Hsl -> Rgb, backward compatibility broken (e.g. ColorUtil.obj -> ColorUtil.rgb)
* 0.1.2 Rgb color conversion functions, gradient and gradient matrix

<a name="ColorUtil"></a>

## ColorUtil
Color conversion functions and gradient functions.

**Kind**: global class  

* [ColorUtil](#ColorUtil)
    * [.rgb](#ColorUtil.rgb)
        * [.test(color)](#ColorUtil.rgb.test) ⇒ <code>boolean</code>
        * [.toInt(rgb)](#ColorUtil.rgb.toInt) ⇒ <code>number</code>
        * [.toHex(rgb)](#ColorUtil.rgb.toHex) ⇒ <code>string</code>
        * [.toRgbString(rgb)](#ColorUtil.rgb.toRgbString) ⇒ <code>string</code>
        * [.toUint32(rgb)](#ColorUtil.rgb.toUint32) ⇒ <code>number</code>
        * [.toInt32(rgb)](#ColorUtil.rgb.toInt32) ⇒ <code>number</code>
        * [.toHsl(rgb)](#ColorUtil.rgb.toHsl) ⇒ <code>object</code>
        * [.toHsv(rgb)](#ColorUtil.rgb.toHsv) ⇒ <code>object</code>
    * [.int](#ColorUtil.int)
        * [.test(color)](#ColorUtil.int.test) ⇒ <code>boolean</code>
        * [.toRgb(int, [a])](#ColorUtil.int.toRgb) ⇒ <code>object</code>
        * [.toHex(int)](#ColorUtil.int.toHex) ⇒ <code>string</code>
        * [.toRgbString(int, [a])](#ColorUtil.int.toRgbString) ⇒ <code>string</code>
    * [.hex](#ColorUtil.hex)
        * [.test(color)](#ColorUtil.hex.test) ⇒ <code>boolean</code>
        * [.toRgb(hex, [a])](#ColorUtil.hex.toRgb) ⇒ <code>object</code>
        * [.toInt(hex)](#ColorUtil.hex.toInt) ⇒ <code>number</code>
        * [.toRgbString(hex, [a])](#ColorUtil.hex.toRgbString) ⇒ <code>string</code>
    * [.rgbString](#ColorUtil.rgbString)
        * [.test(color)](#ColorUtil.rgbString.test) ⇒ <code>boolean</code>
        * [.toRgb(rgba)](#ColorUtil.rgbString.toRgb) ⇒ <code>object</code>
        * [.toInt(rgba)](#ColorUtil.rgbString.toInt) ⇒ <code>number</code>
        * [.toHex(rgba)](#ColorUtil.rgbString.toHex) ⇒ <code>string</code>
    * [.hsl](#ColorUtil.hsl)
        * [.test(color)](#ColorUtil.hsl.test) ⇒ <code>boolean</code>
        * [.toRgb(hsl)](#ColorUtil.hsl.toRgb) ⇒ <code>object</code>
        * [.toHsv(hsl)](#ColorUtil.hsl.toHsv) ⇒ <code>object</code>
        * [.toHslString(hsl)](#ColorUtil.hsl.toHslString) ⇒ <code>string</code>
    * [.hslString](#ColorUtil.hslString)
        * [.test(color)](#ColorUtil.hslString.test) ⇒ <code>boolean</code>
        * [.toHsl(hsla)](#ColorUtil.hslString.toHsl) ⇒ <code>object</code>
    * [.hsv](#ColorUtil.hsv)
        * [.test(color)](#ColorUtil.hsv.test) ⇒ <code>boolean</code>
        * [.toRgb(hsv)](#ColorUtil.hsv.toRgb) ⇒ <code>object</code>
        * [.toHsl(hsl)](#ColorUtil.hsv.toHsl) ⇒ <code>object</code>
    * [.any](#ColorUtil.any)
        * [.toRgb(color)](#ColorUtil.any.toRgb) ⇒ <code>object</code>
        * [.toInt(color)](#ColorUtil.any.toInt) ⇒ <code>object</code>
        * [.toHex(color)](#ColorUtil.any.toHex) ⇒ <code>object</code>
        * [.toRgbString(color)](#ColorUtil.any.toRgbString) ⇒ <code>object</code>
        * [.toHsl(color)](#ColorUtil.any.toHsl) ⇒ <code>object</code>
        * [.toHsv(color)](#ColorUtil.any.toHsv) ⇒ <code>object</code>
    * [.hueColors](#ColorUtil.hueColors) ⇒ <code>array</code>
    * [.getSystemEndian()](#ColorUtil.getSystemEndian) ⇒ <code>number</code>
    * [.convert(colors, ...conversionFunctions)](#ColorUtil.convert) ⇒ <code>array</code>
    * [.convertTo2StopGradient(array, position)](#ColorUtil.convertTo2StopGradient) ⇒ <code>object</code>
    * [.getGradientColor(colors, position, [convertToRgb], [convertFromRgb])](#ColorUtil.getGradientColor) ⇒ <code>\*</code>
    * [.getGradientMatrixColor(matrix, x, y, [convertToRgb], [convertFromRgb])](#ColorUtil.getGradientMatrixColor) ⇒ <code>\*</code>

<a name="ColorUtil.rgb"></a>

### ColorUtil.rgb
Rgb conversion functionsRgb object notation is `{r:RRR, g:GGG, b:BBB, a:AAA}` where each color component(red, grean, blue, alpha) range is 0-255. In some conversion functionsalpha is not required. In those where it is required and not present inrgb object, a fully opaque value is used as a default.

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.rgb](#ColorUtil.rgb)
    * [.test(color)](#ColorUtil.rgb.test) ⇒ <code>boolean</code>
    * [.toInt(rgb)](#ColorUtil.rgb.toInt) ⇒ <code>number</code>
    * [.toHex(rgb)](#ColorUtil.rgb.toHex) ⇒ <code>string</code>
    * [.toRgbString(rgb)](#ColorUtil.rgb.toRgbString) ⇒ <code>string</code>
    * [.toUint32(rgb)](#ColorUtil.rgb.toUint32) ⇒ <code>number</code>
    * [.toInt32(rgb)](#ColorUtil.rgb.toInt32) ⇒ <code>number</code>
    * [.toHsl(rgb)](#ColorUtil.rgb.toHsl) ⇒ <code>object</code>
    * [.toHsv(rgb)](#ColorUtil.rgb.toHsv) ⇒ <code>object</code>

<a name="ColorUtil.rgb.test"></a>

#### rgb.test(color) ⇒ <code>boolean</code>
Test validity of a color whether it is in correct notation for this class.

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  
**Returns**: <code>boolean</code> - True if valid, False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>\*</code> | The color |

<a name="ColorUtil.rgb.toInt"></a>

#### rgb.toInt(rgb) ⇒ <code>number</code>
Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 24-bit number `0xRRGGBB`. Alpha is ignored.

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  

| Param | Type |
| --- | --- |
| rgb | <code>object</code> | 

**Example**  
```js
ColorUtil.rgb.toInt({r: 0, g: 128, b: 255});// output: 33023
```
<a name="ColorUtil.rgb.toHex"></a>

#### rgb.toHex(rgb) ⇒ <code>string</code>
Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 24-bit hex string `'#RRGGBB'`. Alpha is ignored.

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  

| Param | Type |
| --- | --- |
| rgb | <code>object</code> | 

**Example**  
```js
ColorUtil.rgb.toHex({r: 0, g: 128, b: 255});// output: "#0080ff"
```
<a name="ColorUtil.rgb.toRgbString"></a>

#### rgb.toRgbString(rgb) ⇒ <code>string</code>
Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`.Alpha is converted from range 0-255 to 0-1. Default alphavalue is 1.

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  

| Param | Type |
| --- | --- |
| rgb | <code>object</code> | 

**Example**  
```js
ColorUtil.rgb.toRgbString({r: 0, g: 128, b: 255});// output: "rgba(0,128,255,1)"ColorUtil.rgb.toRgbString({r: 0, g: 128, b: 255, a: 85});// output: "rgba(0,128,255,0.3333333333333333)"
```
<a name="ColorUtil.rgb.toUint32"></a>

#### rgb.toUint32(rgb) ⇒ <code>number</code>
Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xAABBGGRR` in little-endian, `0xRRGGBBAA` in big-endian.Default alpha value is 255. Resulting value is positive

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  

| Param | Type |
| --- | --- |
| rgb | <code>object</code> | 

**Example**  
```js
ColorUtil.rgb.toUint32({r: 0, g: 128, b: 255, a: 255});// output: 4294934528ColorUtil.rgb.toUint32({r: 0, g: 128, b: 255, a: 85});// output: 1442807808
```
<a name="ColorUtil.rgb.toInt32"></a>

#### rgb.toInt32(rgb) ⇒ <code>number</code>
Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to 32-bit number `0xAABBGGRR` in little-endian, `0xRRGGBBAA` in big-endian.Default alpha value is 255. Resulting value can be negative

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  

| Param | Type |
| --- | --- |
| rgb | <code>object</code> | 

**Example**  
```js
ColorUtil.rgb.toInt32({r: 0, g: 128, b: 255, a: 255});// output: -32768ColorUtil.rgb.toInt32({r: 0, g: 128, b: 255, a: 85});// output: 1442807808
```
<a name="ColorUtil.rgb.toHsl"></a>

#### rgb.toHsl(rgb) ⇒ <code>object</code>
Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to hsl object `{h:H, s:S, l:L, a:A}`where h, s, l, a (saturation, luminosity, alpha) are in range 0-1.

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  

| Param | Type |
| --- | --- |
| rgb | <code>object</code> | 

**Example**  
```js
ColorUtil.rgb.toHsl({r: 255, g: 0, b: 0, a: 255});// output: {h: 0, s: 1, l: 0.5, a: 1}
```
<a name="ColorUtil.rgb.toHsv"></a>

#### rgb.toHsv(rgb) ⇒ <code>object</code>
Convert rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}` to hsv object `{h:H, s:S, v:V, a:A}`where h, s, v, a (hue, saturation, value, alpha) are in range 0-1.

**Kind**: static method of [<code>rgb</code>](#ColorUtil.rgb)  

| Param | Type |
| --- | --- |
| rgb | <code>object</code> | 

**Example**  
```js
ColorUtil.rgb.toHsv({r: 255, g: 0, b: 0, a: 255});// output: {h: 0, s: 1, v: 1, a: 1}
```
<a name="ColorUtil.int"></a>

### ColorUtil.int
Integer conversion functions.Int notation is 24-bit number represnting the RGB values `0xRRGGBB`.

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.int](#ColorUtil.int)
    * [.test(color)](#ColorUtil.int.test) ⇒ <code>boolean</code>
    * [.toRgb(int, [a])](#ColorUtil.int.toRgb) ⇒ <code>object</code>
    * [.toHex(int)](#ColorUtil.int.toHex) ⇒ <code>string</code>
    * [.toRgbString(int, [a])](#ColorUtil.int.toRgbString) ⇒ <code>string</code>

<a name="ColorUtil.int.test"></a>

#### int.test(color) ⇒ <code>boolean</code>
Test validity of a color whether it is in correct notation for this class.

**Kind**: static method of [<code>int</code>](#ColorUtil.int)  
**Returns**: <code>boolean</code> - True if valid, False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>\*</code> | The color |

<a name="ColorUtil.int.toRgb"></a>

#### int.toRgb(int, [a]) ⇒ <code>object</code>
24-bit number `0xRRGGBB` to rgb `{r:RRR, g:GGG, b:BBB, a:AAA}`

**Kind**: static method of [<code>int</code>](#ColorUtil.int)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| int | <code>number</code> |  | Integer |
| [a] | <code>number</code> | <code>0xFF</code> | Alpha value in range 0-255 |

**Example**  
```js
ColorUtil.int.toRgb(0xFF0000);// output: {r: 255, g: 0, b: 0, a: 255}ColorUtil.int.toRgb(0xFF0000, 128);// output: {r: 255, g: 0, b: 0, a: 128}
```
<a name="ColorUtil.int.toHex"></a>

#### int.toHex(int) ⇒ <code>string</code>
24-bit number `0xRRGGBB` to 24-bit hex string `'#RRGGBB'`.

**Kind**: static method of [<code>int</code>](#ColorUtil.int)  

| Param | Type | Description |
| --- | --- | --- |
| int | <code>number</code> | Integer |

**Example**  
```js
ColorUtil.int.toHex(0x00FF00);// output: "#00ff00"
```
<a name="ColorUtil.int.toRgbString"></a>

#### int.toRgbString(int, [a]) ⇒ <code>string</code>
24-bit number `0xRRGGBB` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`

**Kind**: static method of [<code>int</code>](#ColorUtil.int)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| int | <code>number</code> |  | Integer |
| [a] | <code>number</code> | <code>1</code> | Alpha value in range 0-1 |

**Example**  
```js
ColorUtil.int.toRgbString(0x00FF00);// output: "rgba(0,255,0,1)"ColorUtil.int.toRgbString(0x00FF00, 0.5);// output: "rgba(0,255,0,0.5)"
```
<a name="ColorUtil.hex"></a>

### ColorUtil.hex
Hexadecimal conversion functionsHex notation is 24-bit hex string represnting the RGB values `'#RRGGBB'`.

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.hex](#ColorUtil.hex)
    * [.test(color)](#ColorUtil.hex.test) ⇒ <code>boolean</code>
    * [.toRgb(hex, [a])](#ColorUtil.hex.toRgb) ⇒ <code>object</code>
    * [.toInt(hex)](#ColorUtil.hex.toInt) ⇒ <code>number</code>
    * [.toRgbString(hex, [a])](#ColorUtil.hex.toRgbString) ⇒ <code>string</code>

<a name="ColorUtil.hex.test"></a>

#### hex.test(color) ⇒ <code>boolean</code>
Test validity of a color whether it is in correct notation for this class.

**Kind**: static method of [<code>hex</code>](#ColorUtil.hex)  
**Returns**: <code>boolean</code> - True if valid, False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>\*</code> | The color |

<a name="ColorUtil.hex.toRgb"></a>

#### hex.toRgb(hex, [a]) ⇒ <code>object</code>
24-bit hex string `'#RRGGBB'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`

**Kind**: static method of [<code>hex</code>](#ColorUtil.hex)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hex | <code>string</code> |  | Hexadecimal string |
| [a] | <code>number</code> | <code>0xFF</code> | Alpha value in range 0-255 |

**Example**  
```js
ColorUtil.hex.toRgb('#00FF00');// output: {r: 0, g: 255, b: 0, a: 255}ColorUtil.hex.toRgb('#00FF00', 127);// output: {r: 0, g: 255, b: 0, a: 127}
```
<a name="ColorUtil.hex.toInt"></a>

#### hex.toInt(hex) ⇒ <code>number</code>
24-bit hex string `'#RRGGBB'` to 24-bit integer `0xRRGGBB`

**Kind**: static method of [<code>hex</code>](#ColorUtil.hex)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | Hexadecimal string |

**Example**  
```js
ColorUtil.hex.toInt('#00FF00');// output: 65280
```
<a name="ColorUtil.hex.toRgbString"></a>

#### hex.toRgbString(hex, [a]) ⇒ <code>string</code>
24-bit hex string `'#RRGGBB'` to rgb functional notation string `'rgba(RRR,GGG,BBB,A)'`

**Kind**: static method of [<code>hex</code>](#ColorUtil.hex)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hex | <code>string</code> |  | Hexadecimal string |
| [a] | <code>number</code> | <code>1</code> | Alpha value in range 0-1 |

**Example**  
```js
ColorUtil.hex.toRgbString('#00FF00')// output: "rgba(0,255,0,1)"ColorUtil.hex.toRgbString('#00FF00', 0.5)// output: "rgba(0,255,0,0.5)"
```
<a name="ColorUtil.rgbString"></a>

### ColorUtil.rgbString
RgbString conversion functionsRgbString notation is `'rgba(RRR,GGG,BBB[,A])'`

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.rgbString](#ColorUtil.rgbString)
    * [.test(color)](#ColorUtil.rgbString.test) ⇒ <code>boolean</code>
    * [.toRgb(rgba)](#ColorUtil.rgbString.toRgb) ⇒ <code>object</code>
    * [.toInt(rgba)](#ColorUtil.rgbString.toInt) ⇒ <code>number</code>
    * [.toHex(rgba)](#ColorUtil.rgbString.toHex) ⇒ <code>string</code>

<a name="ColorUtil.rgbString.test"></a>

#### rgbString.test(color) ⇒ <code>boolean</code>
Test validity of a color whether it is in correct notation for this class.

**Kind**: static method of [<code>rgbString</code>](#ColorUtil.rgbString)  
**Returns**: <code>boolean</code> - True if valid, False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>\*</code> | The color |

<a name="ColorUtil.rgbString.toRgb"></a>

#### rgbString.toRgb(rgba) ⇒ <code>object</code>
Rgb functional notation string `'rgba(RRR,GGG,BBB[,A])'` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`

**Kind**: static method of [<code>rgbString</code>](#ColorUtil.rgbString)  

| Param | Type | Description |
| --- | --- | --- |
| rgba | <code>string</code> | Rgb string |

**Example**  
```js
ColorUtil.rgbString.toRgb('rgba(0,255,0,0.5)')// output: {r: 0, g: 255, b: 0, a: 127}
```
<a name="ColorUtil.rgbString.toInt"></a>

#### rgbString.toInt(rgba) ⇒ <code>number</code>
Rgba functional notation string `'rgba(RRR,GGG,BBB[,A])'` to 24-bit integer `0xRRGGBB`. Alpha is ignored.

**Kind**: static method of [<code>rgbString</code>](#ColorUtil.rgbString)  

| Param | Type | Description |
| --- | --- | --- |
| rgba | <code>string</code> | Rgba string |

**Example**  
```js
ColorUtil.rgbString.toInt('rgba(0,255,0,0.5)')// output: 65280
```
<a name="ColorUtil.rgbString.toHex"></a>

#### rgbString.toHex(rgba) ⇒ <code>string</code>
Rgba functional notation string `'rgba(RRR,GGG,BBB[,A])'` to hexadecimal string `'#RRGGBB'`. Alpha is ignored.

**Kind**: static method of [<code>rgbString</code>](#ColorUtil.rgbString)  

| Param | Type | Description |
| --- | --- | --- |
| rgba | <code>string</code> | Rgba string |

**Example**  
```js
ColorUtil.rgbString.toHex('rgba(0,255,0,0.5)')// output: "#00ff00"
```
<a name="ColorUtil.hsl"></a>

### ColorUtil.hsl
Hsl conversion functionsHsl notation is `{h:H, s:S, l:L, a:A}` where each component (hue, saturation,luminosity, alpha) is in range 0-1.

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.hsl](#ColorUtil.hsl)
    * [.test(color)](#ColorUtil.hsl.test) ⇒ <code>boolean</code>
    * [.toRgb(hsl)](#ColorUtil.hsl.toRgb) ⇒ <code>object</code>
    * [.toHsv(hsl)](#ColorUtil.hsl.toHsv) ⇒ <code>object</code>
    * [.toHslString(hsl)](#ColorUtil.hsl.toHslString) ⇒ <code>string</code>

<a name="ColorUtil.hsl.test"></a>

#### hsl.test(color) ⇒ <code>boolean</code>
Test validity of a color whether it is in correct notation for this class.

**Kind**: static method of [<code>hsl</code>](#ColorUtil.hsl)  
**Returns**: <code>boolean</code> - True if valid, False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>\*</code> | The color |

<a name="ColorUtil.hsl.toRgb"></a>

#### hsl.toRgb(hsl) ⇒ <code>object</code>
Hsl object `{h:H, s:S, l:L, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`

**Kind**: static method of [<code>hsl</code>](#ColorUtil.hsl)  

| Param | Type | Description |
| --- | --- | --- |
| hsl | <code>object</code> | Hsl object |

**Example**  
```js
ColorUtil.hsl.toRgb({h: 1/6, s: 0.5, l: 0.5});// output: {r: 191, g: 191, b: 64, a: 255}ColorUtil.hsl.toRgb({h: 1/6, s: 0.5, l: 0.5, a: 0.5});// output: {r: 191, g: 191, b: 64, a: 128}
```
<a name="ColorUtil.hsl.toHsv"></a>

#### hsl.toHsv(hsl) ⇒ <code>object</code>
Hsl object `{h:H, s:S, l:L, a:A}` to hsv object `{h:H, s:S, v:V, a:A}`

**Kind**: static method of [<code>hsl</code>](#ColorUtil.hsl)  

| Param | Type | Description |
| --- | --- | --- |
| hsl | <code>object</code> | Hsl object |

**Example**  
```js
ColorUtil.hsl.toHsv({h: 1/6, s: 0.5, l: 0.5});// output: {h: 0.16666666666666666, s: 0.6666666666666666, v: 0.75, a: 1}
```
<a name="ColorUtil.hsl.toHslString"></a>

#### hsl.toHslString(hsl) ⇒ <code>string</code>
Convert hsl object `{h:H, s:S, l:L, a:A}` to hsl functional notation string `'hsla(HHH,SSS%,LLL%[,A])'`.Default alpha value is 1.

**Kind**: static method of [<code>hsl</code>](#ColorUtil.hsl)  

| Param | Type |
| --- | --- |
| hsl | <code>object</code> | 

**Example**  
```js
ColorUtil.hsl.toHslString({h:2/6, s:0.5, l:0.5});// output: "hsla(120,50%,50%,1)"ColorUtil.hsl.toHslString({h:2/6, s:0.5, l:0.5, a:0.5});// output: "hsla(120,50%,50%,0.5)"
```
<a name="ColorUtil.hslString"></a>

### ColorUtil.hslString
HslString conversion functionsHsl functional notation is `'hsla(HHH,SSS%,LLL%[,A])'`

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.hslString](#ColorUtil.hslString)
    * [.test(color)](#ColorUtil.hslString.test) ⇒ <code>boolean</code>
    * [.toHsl(hsla)](#ColorUtil.hslString.toHsl) ⇒ <code>object</code>

<a name="ColorUtil.hslString.test"></a>

#### hslString.test(color) ⇒ <code>boolean</code>
Test validity of a color whether it is in correct notation for this class.

**Kind**: static method of [<code>hslString</code>](#ColorUtil.hslString)  
**Returns**: <code>boolean</code> - True if valid, False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>\*</code> | The color |

<a name="ColorUtil.hslString.toHsl"></a>

#### hslString.toHsl(hsla) ⇒ <code>object</code>
Hsl functional notation string `'hsla(HHH,SSS%,LLL%[,A])'` to hsl object `{h:H, s:S, l:L, a:A}`

**Kind**: static method of [<code>hslString</code>](#ColorUtil.hslString)  

| Param | Type | Description |
| --- | --- | --- |
| hsla | <code>string</code> | Hsl string |

**Example**  
```js
ColorUtil.hslString.toHsl('hsla(180, 50%, 60%, 0.5)');// output: {h: 0.5, s: 0.5, l: 0.6, a: 0.5}
```
<a name="ColorUtil.hsv"></a>

### ColorUtil.hsv
Hsv conversion functionsHsv notation is `{h:H, s:S, v:V, a:A}` where each component(hue, saturation, value, alpha) are in range 0-1.

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.hsv](#ColorUtil.hsv)
    * [.test(color)](#ColorUtil.hsv.test) ⇒ <code>boolean</code>
    * [.toRgb(hsv)](#ColorUtil.hsv.toRgb) ⇒ <code>object</code>
    * [.toHsl(hsl)](#ColorUtil.hsv.toHsl) ⇒ <code>object</code>

<a name="ColorUtil.hsv.test"></a>

#### hsv.test(color) ⇒ <code>boolean</code>
Test validity of a color whether it is in correct notation for this class.

**Kind**: static method of [<code>hsv</code>](#ColorUtil.hsv)  
**Returns**: <code>boolean</code> - True if valid, False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>\*</code> | The color |

<a name="ColorUtil.hsv.toRgb"></a>

#### hsv.toRgb(hsv) ⇒ <code>object</code>
Hsv object `{h:H, s:S, v:V, a:A}` to rgb object `{r:RRR, g:GGG, b:BBB, a:AAA}`

**Kind**: static method of [<code>hsv</code>](#ColorUtil.hsv)  

| Param | Type | Description |
| --- | --- | --- |
| hsv | <code>object</code> | Hsv object |

**Example**  
```js
ColorUtil.hsv.toRgb({h: 0, s: 1, v: 1});// output: {r: 255, g: 0, b: 0, a: 255}ColorUtil.hsv.toRgb({h: 0, s: 1, v: 1, a: 0.5});// output: {r: 255, g: 0, b: 0, a: 128}
```
<a name="ColorUtil.hsv.toHsl"></a>

#### hsv.toHsl(hsl) ⇒ <code>object</code>
Hsv object `{h:H, s:S, v:V, a:A}` to hsl object `{h:H, s:S, l:L, a:A}`

**Kind**: static method of [<code>hsv</code>](#ColorUtil.hsv)  

| Param | Type | Description |
| --- | --- | --- |
| hsl | <code>object</code> | Hsl object |

**Example**  
```js
ColorUtil.hsv.toHsl({h: 1/6, s: 0.5, v: 0.5});// output: {h: 0.16666666666666666, s: 0.3333333333333333, l: 0.375, a: 1}
```
<a name="ColorUtil.any"></a>

### ColorUtil.any
Any conversion functions.Converts supported color notations to any notation.TODO: toUint32, toInt32

**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  

* [.any](#ColorUtil.any)
    * [.toRgb(color)](#ColorUtil.any.toRgb) ⇒ <code>object</code>
    * [.toInt(color)](#ColorUtil.any.toInt) ⇒ <code>object</code>
    * [.toHex(color)](#ColorUtil.any.toHex) ⇒ <code>object</code>
    * [.toRgbString(color)](#ColorUtil.any.toRgbString) ⇒ <code>object</code>
    * [.toHsl(color)](#ColorUtil.any.toHsl) ⇒ <code>object</code>
    * [.toHsv(color)](#ColorUtil.any.toHsv) ⇒ <code>object</code>

<a name="ColorUtil.any.toRgb"></a>

#### any.toRgb(color) ⇒ <code>object</code>
Convert any color to rgb object notation `{r:RRR, g:GGG, b:BBB, a:AAA}`

**Kind**: static method of [<code>any</code>](#ColorUtil.any)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>object</code> | Color in any notation |

**Example**  
```js
ColorUtil.any.toRgb(0xFF0000);// output: {r: 255, g: 0, b: 0, a: 255}ColorUtil.any.toRgb({h: 1/6, s: 0.5, l: 0.5});// output: {r: 191, g: 191, b: 64, a: 255}
```
<a name="ColorUtil.any.toInt"></a>

#### any.toInt(color) ⇒ <code>object</code>
Convert any color to number notation `0xRRGGBB`

**Kind**: static method of [<code>any</code>](#ColorUtil.any)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>object</code> | Color in any notation |

**Example**  
```js
ColorUtil.any.toInt('hsl(180, 50%, 60%)')// output: 6737100
```
<a name="ColorUtil.any.toHex"></a>

#### any.toHex(color) ⇒ <code>object</code>
Convert any color to hex notation `'#RRGGBB'`

**Kind**: static method of [<code>any</code>](#ColorUtil.any)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>object</code> | Color in any notation |

**Example**  
```js
ColorUtil.any.toHex('hsl(180, 50%, 60%)')// output: "#66cccc"
```
<a name="ColorUtil.any.toRgbString"></a>

#### any.toRgbString(color) ⇒ <code>object</code>
Convert any color to rgb functional notation `'rgba(RRR,GGG,BBB,A)'`

**Kind**: static method of [<code>any</code>](#ColorUtil.any)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>object</code> | Color in any notation |

**Example**  
```js
ColorUtil.any.toRgbString('hsl(180, 50%, 60%)')// output: "rgba(102,204,204,1)"
```
<a name="ColorUtil.any.toHsl"></a>

#### any.toHsl(color) ⇒ <code>object</code>
Convert any color to hsl object notation `{h:H, s:S, v:V, a:A}`

**Kind**: static method of [<code>any</code>](#ColorUtil.any)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>object</code> | Color in any notation |

**Example**  
```js
ColorUtil.any.toHsl('hsl(180, 50%, 60%)')// output: {h: 0.5, s: 0.5, l: 0.6, a: 1}
```
<a name="ColorUtil.any.toHsv"></a>

#### any.toHsv(color) ⇒ <code>object</code>
Convert any color to hsv object notation `{h:H, s:S, v:V, a:A}`

**Kind**: static method of [<code>any</code>](#ColorUtil.any)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>object</code> | Color in any notation |

**Example**  
```js
ColorUtil.any.toHsl('hsl(180, 50%, 60%)')// output: {h: 0.5, s: 0.5, l: 0.6, a: 1}
```
<a name="ColorUtil.hueColors"></a>

### ColorUtil.hueColors ⇒ <code>array</code>
**Kind**: static property of [<code>ColorUtil</code>](#ColorUtil)  
**Returns**: <code>array</code> - Array of hue colors  
<a name="ColorUtil.getSystemEndian"></a>

### ColorUtil.getSystemEndian() ⇒ <code>number</code>
Get the endian used by the system.[https://developer.mozilla.org/en-US/docs/Glossary/Endianness](https://developer.mozilla.org/en-US/docs/Glossary/Endianness)

**Kind**: static method of [<code>ColorUtil</code>](#ColorUtil)  
**Returns**: <code>number</code> - 0=little-endian, 1=big-endian, 2=unknown-endian  
<a name="ColorUtil.convert"></a>

### ColorUtil.convert(colors, ...conversionFunctions) ⇒ <code>array</code>
Run conversion functions for single color, array of colors ormatrix of colors.

**Kind**: static method of [<code>ColorUtil</code>](#ColorUtil)  

| Param | Type | Description |
| --- | --- | --- |
| colors | <code>\*</code> | Array of colors or single color |
| ...conversionFunctions | <code>function</code> | Rest of the parameters are conversion functions                                                  which are executed in the order they are listed. |

**Example**  
```js
ColorUtil.convert(0xFF0000, ColorUtil.int.toHex);// output: "#ff0000"ColorUtil.convert([0xFF0000, 0x00FF00], ColorUtil.int.toHex);// output: ["#ff0000", "#00ff00"]ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex);// output: [['#ff0000', '#00ff00'], '#0000ff']ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex, ColorUtil.hex.toRgbString);// output: [['rgba(255,0,0,1)', 'rgba(0,255,0,1)'], 'rgba(0,0,255,1)']
```
<a name="ColorUtil.convertTo2StopGradient"></a>

### ColorUtil.convertTo2StopGradient(array, position) ⇒ <code>object</code>
Calculate two items from a gradient array and a relative position ofthe gradient between those two items in an evenly distributedgradient. The resulting values can be used calculate the final color.

**Kind**: static method of [<code>ColorUtil</code>](#ColorUtil)  
**Returns**: <code>object</code> - Relative position between two items and two items from gradient array                          which are the closest to the point indicated by position argument  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | Array of colors. Content of the array does not matter. |
| position | <code>number</code> | Position on the whole gradient. |

**Example**  
```js
// The example position 0.25 is in the middle of the first and// second colors so new 2 point gradient array contains only those// first and second colors. The given absolute position 0.25 is relatively// 0.5 between those two values.ColorUtil.convertTo2StopGradient([0xFF0000, 0x00FF00, 0x0000FF], 0.25);// output: {array: [0xFF0000, 0x00FF00], position: 0.5}
```
<a name="ColorUtil.getGradientColor"></a>

### ColorUtil.getGradientColor(colors, position, [convertToRgb], [convertFromRgb]) ⇒ <code>\*</code>
Get color from gradient.Gradient calculation is done in rgb object notation so convertToRgb must convertto rgb object and convertFromRgb must convert from rgb object type. In case colorsare preformatted to rgb object, convertToRgb conversion is not needed. Similarlyif rgb object notation is the desired output then convertFromRgb is not needed.In this case set null in place for the conversion function.

**Kind**: static method of [<code>ColorUtil</code>](#ColorUtil)  
**Returns**: <code>\*</code> - Return value depend on the what has been set to convertFromRgb.  

| Param | Type | Description |
| --- | --- | --- |
| colors | <code>array</code> | Array of colors. Color notation can be anything.                                  convertToRgb needs to be set depending on the notation. |
| position | <code>number</code> | Position on the gradient. Value in range 0-1. |
| [convertToRgb] | <code>function</code> | Convert incoming color to object. |
| [convertFromRgb] | <code>function</code> | Convert outgoing color from object. |

**Example**  
```js
let gradient = [0xFF0000, 0x00FF00, 0x0000FF];ColorUtil.getGradientColor(gradient, 0.5, ColorUtil.int.toRgb, ColorUtil.rgb.toHex);// output: "#00ff00"gradient = ColorUtil.convert(gradient, ColorUtil.int.toRgb)ColorUtil.getGradientColor(gradient, 0.5, null, ColorUtil.rgb.toHex);// output: "#00ff00"
```
<a name="ColorUtil.getGradientMatrixColor"></a>

### ColorUtil.getGradientMatrixColor(matrix, x, y, [convertToRgb], [convertFromRgb]) ⇒ <code>\*</code>
Get color from gradient matrix. Gradient matrix is like normal gradientbut it is two dimensional.Gradient calculation is done in rgb object notation so convertToRgb must convertto rgb object and convertFromRgb must convert from rgb object type. In case colorsare preformatted to rgb object, convertToRgb conversion is not needed. Similarlyif rgb object notation is the desired output then convertFromRgb is not needed.In this case set null in place for the conversion function.

**Kind**: static method of [<code>ColorUtil</code>](#ColorUtil)  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>array</code> | Array of gradient color arrays. Color notation can be anything.                          convertToRgb needs to be set depending on the notation. |
| x | <code>number</code> | Horizontal position on the gradient. Value in range 0-1. |
| y | <code>number</code> | Vertical position on the gradient. Value in range 0-1. |
| [convertToRgb] | <code>function</code> | Convert incoming color to object. |
| [convertFromRgb] | <code>function</code> | Convert outgoing color from object. |

**Example**  
```js
let matrix = [[0xFF0000, 0x00FF00], [0x0000FF]];ColorUtil.getGradientMatrixColor(matrix, 0.5, 0.5, ColorUtil.int.toRgb, ColorUtil.rgb.toHex);// output: "#3f3f7f"matrix = ColorUtil.convert(matrix, ColorUtil.int.toRgb)ColorUtil.getGradientMatrixColor(matrix, 0.5, 0.5, null, ColorUtil.rgb.toHex);// output: "#3f3f7f"
```
