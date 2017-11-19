# color-util

[![Build Status](https://travis-ci.org/jakoivis/color-util.svg?branch=master)](https://travis-ci.org/jakoivis/color-util)
[![Downloads this month](https://img.shields.io/npm/dm/color-util.svg)](https://npmjs.org/package/color-util)
[![Npm version](https://img.shields.io/npm/v/color-util.svg)](https://npmjs.org/package/color-util)

Color format conversion, gradients colors, etc

<!-- toc -->

- [Installation & import](#installation--import)
- [Usage examples](#usage-examples)
  * [Basic color format conversion methods](#basic-color-format-conversion-methods)
  * [Mass conversions](#mass-conversions)
  * [Easy but slow option](#easy-but-slow-option)
  * [Type checking](#type-checking)
  * [hue](#hue)
  * [Gradients](#gradients)
    + [Gradient color data structures](#gradient-color-data-structures)
      - [Data structure 1](#data-structure-1)
      - [Data structure 2](#data-structure-2)
      - [Data structure 3](#data-structure-3)
      - [Data structure 4](#data-structure-4)
- [Features](#features)
- [Change history](#change-history)

<!-- tocstop -->

## Installation & import
```javascript
$ npm install color-util --save
```
```javascript
var ColorUtil = require('color-util');
```
or
```
<script src="path/to/ColorUtil.js"></script>
```

## Usage examples

### Basic color format conversion methods
These are pure conversion functions without any intelligence. If you have massive amount of colors and you need to convert them fast then these are the ones you want to use. You have to know the source type of a color and a color needs to be in valid format.

There are three main type of color formats (rgb, hsl, hsv). In addition those there are 8 sub types (csshsl, csshsla, cssrgb, cssrgba, hex, int, intrgba, intabgr). These basic conversions can convert between the main types and between the main type and it's sub type. So e.g. converting from hex to hsl requires two steps (hex to rgb, rgb to hsl). If speed is not your concern then in color-util there are other utilities that can make the conversion easier.

The follwing list shows all the available basic conversions
```javascript
// rgb
colorutil.rgb.to.int({r: 0, g: 0, b: 255, a:255}) // 255
colorutil.rgb.to.hex({r: 0, g: 0, b: 255, a:255}) // "#0000ff"
colorutil.rgb.to.cssrgb({r: 0, g: 0, b: 255, a:255}) // "rgb(0,0,255)"
colorutil.rgb.to.cssrgba({r: 0, g: 0, b: 255, a:255}) // "rgba(0,0,255,1)"
colorutil.rgb.to.hsl({r: 0, g: 0, b: 255, a:255}) // {h: 0.6666666666666666, s: 1, l: 0.5, a: 1}
colorutil.rgb.to.hsv({r: 0, g: 0, b: 255, a:255}) // {h: 0.6666666666666666, s: 1, v: 1, a: 1}
colorutil.rgb.to.uintabgr({r: 0, g: 0, b: 255, a:0x7f}) // 2147418112
colorutil.rgb.to.uintabgrOpaque({r: 0, g: 0, b: 255, a:0x7f}) // 4294901760
colorutil.rgb.to.intabgr({r: 0, g: 0, b: 255, a:0x7f}) // 2147418112
colorutil.rgb.to.intabgrOpaque({r: 0, g: 0, b: 255, a:0x7f}) // -65536
colorutil.rgb.to.uintrgba({r: 0, g: 0, b: 255, a:0x7f}) // 65407
colorutil.rgb.to.intrgba({r: 0, g: 0, b: 255, a:0x7f}) // 65407

// hsl
colorutil.hsl.to.rgb({h: 4/6, s: 1, l: 0.5, a: 1}) // {r: 0, g: 0, b: 255, a: 255}
colorutil.hsl.to.hsv({h: 4/6, s: 1, l: 0.5, a: 1}) // {h: 0.6666666666666666, s: 1, v: 1, a: 1}
colorutil.hsl.to.csshsl({h: 4/6, s: 1, l: 0.5, a: 1}) // "hsl(240,100%,50%)"
colorutil.hsl.to.csshsla({h: 4/6, s: 1, l: 0.5, a: 1}) // "hsla(240,100%,50%,1)"

// hsv
colorutil.hsv.to.rgb({h: 4/6, s: 1, v: 1, a: 1}) // {r: 0, g: 0, b: 255, a: 255}
colorutil.hsv.to.hsl({h: 4/6, s: 1, v: 1, a: 1}) // {h: 0.6666666666666666, s: 1, l: 0.5, a: 1}

// hex (sub type of rgb)
colorutil.hex.to.rgb("#0000ff") // {r: 0, g: 0, b: 255, a: 255}
colorutil.hex.to.rgb("#0000ff", 0x7f) // {r: 0, g: 0, b: 255, a: 127}
colorutil.hex.to.int("#0000ff") // 255
colorutil.hex.to.cssrgb("#0000ff") // "rgb(0,0,255)"
colorutil.hex.to.cssrgba("#0000ff") // "rgba(0,0,255,1)"
colorutil.hex.to.cssrgba("#0000ff", 0x7f) // "rgba(0,0,255,127)"

// int (sub type of rgb)
colorutil.int.to.rgb(0x0000ff) // {r: 0, g: 0, b: 255, a: 255}
colorutil.int.to.rgb(0x0000ff, 0x7f) // {r: 0, g: 0, b: 255, a: 127}
colorutil.int.to.hex(0x0000ff) // "#0000ff"
colorutil.int.to.cssrgb(0x0000ff) // "rgb(0,0,255)"
colorutil.int.to.cssrgba(0x0000ff) // "rgba(0,0,255,1)"
colorutil.int.to.cssrgba(0x0000ff, 0x7f) // "rgba(0,0,255,127)"

// intabgr (sub type of rgb)
colorutil.intrgba.to.rgb(65407) // {r: 0, g: 0, b: 255, a: 127}

// intabgr (subtype of rgb)
colorutil.intabgr.to.rgb(2147418112) // {a: 127, b: 255, g: 0, r: 0}

// cssrgb (subtype of rgb)
colorutil.cssrgb.to.rgb("rgb(0, 0, 255)") // {r: 0, g: 0, b: 255, a: 255}
colorutil.cssrgb.to.rgb("rgb(0, 0, 255)", 0x7f) // {r: 0, g: 0, b: 255, a: 127}
colorutil.cssrgb.to.int("rgb(0, 0, 255)") // 255
colorutil.cssrgb.to.hex("rgb(0, 0, 255)") // "#0000ff"

// cssrgba (subtype of rgb)
colorutil.cssrgba.to.rgb("rgb(0, 0, 255, 0.5)") // {r: 0, g: 0, b: 255, a: 127}
colorutil.cssrgba.to.int("rgb(0, 0, 255, 0.5)") // 255
colorutil.cssrgba.to.hex("rgb(0, 0, 255, 0.5)") // "#0000ff"

// csshsl (subtype of hsl)
colorutil.csshsl.to.hsl("hsl(240, 100%, 50%)") // {h: 0.6666666666666666, s: 1, l: 0.5, a: 1}
colorutil.csshsl.to.hsl("hsl(240, 100%, 50%)", 0.5) // {h: 0.6666666666666666, s: 1, l: 0.5, a: 0.5}

// csshsla (subtype of hsl)
colorutil.csshsla.to.hsl("hsl(240, 100%, 50%, 0.5)") // {h: 0.6666666666666666, s: 1, l: 0.5, a: 0.5}
```

### Mass conversions
When you have a lot of colors that need to be converted then you can use `convert` function together with the basic conversion functions.
```javascript
let colors = [0xff0000, 0xb2ff00, 0x00ff99, 0x0011ff];
colorutil.convert(colors, colorutil.int.to.rgb) // [{r: 255, g: 0, b: 0, a: 255},...]
```

Multidimensional arrays are fine as well. Returned array structure is retained.
```javascript
let colors = [[0xff0000, 0xb2ff00], [0x00ff99, 0x0011ff]];
colorutil.convert(colors, colorutil.int.to.rgb) // [[{r: 255, g: 0, b: 0, a: 255},...],[...]]
```

Multiple conversion are also supported. Since a color cannot be directly converted e.g. from int to hsv, first convert from int to rgb then from rgb to hsv.
```javascript
let colors = [0xff0000, 0xb2ff00, 0x00ff99, 0x0011ff];
colorutil.convert(colors,
    colorutil.int.to.rgb,
    colorutil.rgb.to.hsv) // [{h: 0, s: 1, v: 1, a: 1},...]
```

Using `colorutil.any` is a useful way to do mass conversion for any type of colors, though it is not too fast (`colorutil.any` does not support 32-bit integers: intabgr, intrgba)
```javascript
let colors = [
    {h: 1/6, s: 1, v: 1, a: 1},
    {r: 0, g: 0, b: 255, a: 255},
    0xb2ff00,
    "hsl(200, 100%, 50%)"
];
colorutil.convert(colors, colorutil.any.to.rgb) // [{r: 255, g: 255, b: 0, a: 255},...]
```

### Easy but slow option
`colorutil.color` takes any type of color and provide getters for each type. It calculates the color only when getter is called and stores that color so it's not caclulcated next time. (`colorutil.color` does not support 32-bit integers: intabgr, intrgba)
```javascript
let color = colorutil.color(0xff0000);

color.int // 16711680
color.hex // "#ff0000"
color.rgb // {r: 255, g: 0, b: 0, a: 255}
color.cssrgb // "rgb(255,0,0)"
color.cssrgba // "rgba(255,0,0,1)"
color.hsl // {h: 0, s: 1, l: 0.5, a: 1}
color.csshsl // "hsl(0,100%,50%)"
color.csshsla // "hsla(0,100%,50%,1)"
color.hsv // {h: 0, s: 1, v: 1, a: 1}
```

### Type checking


### hue


### Gradients
The main difference to native canvas gradients is that ColorUtil gradient functions return one color value from the gradient and whole gradient can be draw on canvas by iterating each canvas pixel whereas the native canvas gradient functions are used as a fillStyle to draw a gradient on canvas. ColorUtil gradient drawing performance on canvas isn't that fast compared to native canvas gradients thus these are not suitable for animation or rendering large areas.

This project started only to satisfy my curiosity, but there are some interesting things ColorUtil gradients can do what the native canvas gradients can't. Canvas has basically linear and radial gradient types where as ColorUtil has linear, matrix, circular and circular matrix types.

```javascript
// There are couple of different ways to present colors. In this
// example a two dimensional RGB color array is used to create a
// gradient where each corner has of a square has different color value.

let colors = [
    [
        {r: 255},
        {r: 255, g: 255}
    ],
    [
        {b: 255},
        {g: 255, b: 255}
    ]
];

// Since we are using rgb colors here we use ColorUtil.rgb.createGradient
// to create a gradient function. HSV and HSL colors both have the same function.

let gradient = ColorUtil.rgb.createGradient({
    colors: colors,
    width: 300,
    height: 300
});

// Color is calculate with this gradient function
// by providing x and y coordinates

console.log(gradient(150, 150));
// {r: 127.5, g: 127.5, b: 127.5, a: 255}

console.log(gradient(300, 300));
// {r: 0, g: 255, b: 255, a: 255}

```

Now in order to draw a gradient you can create a canvas and draw each pixel on it. [Examples on how to do that can be found here.](https://github.com/jakoivis/color-util/tree/master/example)

#### Gradient color data structures
There are couple of supported data structures. You may choose the one you like. `createGradient` function converts the data internally to structure 1 or structure 2.

In the examples below RGB colors are used, but the same format is supported by HSV and HSL gradients. RGB colors consist of four components (r, g, b, a). If any of the component is missing from color object, default value is used. Default values can be changed with `createGradient` function's `defaultColor` property.

x and y properties within color object are color stops; they indicate the position of a color within a gradient. x and y properties are also optional. If they are missing `createGradient` will generate them. You may leave some or all of the properties unspecified in which case the colors are distributed evenly. Value of x and y properties range from 0 to 1.

##### Data structure 1
One dimensional gradient from red to green.
```javascript
[
    {x:0, r: 255},
    {x:1: g: 255}
]
```

##### Data structure 2
Two dimensional structure where top is gradient from red to green, bottom is gradient from blue to transparent.
```javascript
[
    {
        y: 0,
        colors: [
            {x:0, r: 255},
            {x:1, g: 255}
        ]
    },
    {
        y: 1,
        colors: [
            {x:0, b: 255},
            {x:1, a: 0}
        ]
    }
];
```

##### Data structure 3
Two dimensional structure. This example produces exact same gradient as structure 2 above. With this structure it is not possible to specify y-stops.
```javascript
[
    [
        {x:0, r: 255},
        {x:1, g: 255}
    ],
    [
        {x:0, b: 255},
        {x:1, a: 0}
    ]
];
```

##### Data structure 4
Two dimensional structure. This example produces exact same gradient as structure 2 above. Notice that this structure is similar to structure 1, but the difference is that this is two-dimensional. This data structure is identified as two-dimensional if it has at least one y property specified within the structure, otherwise it is understood as one dimensional.
```javascript
[
    {x:0, y:0, r: 255},
    {x:1, y:0, g: 255},
    {x:0, y:1, b: 255},
    {x:1, y:1, a: 0}
];
```

![Preview](/example/githubimage.png)


## Features
- Fast color format conversion functions (number, hex, rgb, hsv, hsl, etc)
- Slower but more flexible Any color format conversion.
- gradient functions (regular gradient, matrix gradient, circular gradient, circular gradient matrix)
- gradient rotation, scaling, translation
- gradient repeat
- gradient color stops
- alpha support in gradients and color conversions


## Change history
* 2.0.0
    * Gradients are accessed with createGradient method
    * Gradient color stops
    * Gradient data validator
    * Multiple types of gradient data structures allowed
    * HSL & HSV gradients
    * Gradient scaling, translate and centerize
    * Default gradient color
    * Renaming of some properties functions and classes
* 1.0.0
    * No code changes to previous version. I just like creating new releases.
* 0.6.0
    * hueColors -> getHueColors() & return value changed from array of numbers to array of rgb objects.
    * shorten function names: getGradientColor -> gradientColor, getMatrixColor -> matrixColor, convertTo2StopGradient -> twoStopGradient
    * No interface changes after this release.
    * hue shortcut method for getting hue color
    * more strict test functions for Rgb, Hsv and Hsl
    * toUint32BigEndian and toInt32BigEndian renamed to toUint32b and toInt32b
    * ColorUtil.int32.toRgb and ColorUtil.int32b.toRgb added
    * twoStopGradient changed to private
    * circleGradientColor and circleMatrixColor functions added
    * gradient rotation
    * convert function bug fix.
* 0.5.0
    * benchmarks and some optimizations added
    * `getGradientColor` and `getGradientMatrixColor` conversion arguments removed -> input and output is now only rgb object notation.
    * Removed endianness check from `toUint32` and `toInt32` conversion functions -> endianness check should be done manually if required.
    * Split `toUint32` and `toInt32` to `toUint32`, `toUint32Opaque`, `toUint32BigEndian`, `toInt32`, `toInt32Opaque`, `toInt32BigEndian`.
    * Default alpha values removed when converting from rgb to rgb sub-type.
    * `getGradientMatrixColor` renamed to `getMatrixColor`
    * `getSystemEndian` function changed to `endian` property
    * change `toRgbString` and `toHslString` to `toRgbString`, `toRgbaString`, `toHslString` and `toHslaString`
    * add any.toHslString, any.toHslaString
* 0.4.0
    * ColorUtil.any conversion functions.
    * Hue range changed to 0-1.
    * Convert function can convert single color.
    * RgbString spaces allowed.
    * HslString conversion functions.
    * RgbString regexp fixed.
    * Rounding removed when converting to Rgb object.
* 0.3.0
    * Rgb -> Hsv -> Rgb
    * fix rgb.toHsl conversion negative hue value
* 0.2.0
    * Rgb -> Hsl -> Rgb
    * backward compatibility broken (e.g. ColorUtil.obj -> ColorUtil.rgb)
* 0.1.2
    * Rgb color conversion functions, gradient and gradient matrix
