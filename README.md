[![Build Status](https://travis-ci.org/jakoivis/color-util.svg?branch=master)](https://travis-ci.org/jakoivis/color-util)
[![Downloads this month](https://img.shields.io/npm/dm/color-util.svg)](https://npmjs.org/package/color-util)
[![Npm version](https://img.shields.io/npm/v/color-util.svg)](https://npmjs.org/package/color-util)

Utility with color format conversion and gradients functions.

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

For a complete list of functions see [API documentation](API.md)

### Some color format conversion examples
```javascript
ColorUtil.rgb.toHsv({r: 255, g: 0, b: 0, a: 255});
// output: {h: 0, s: 1, v: 1, a: 1}

ColorUtil.hex.toRgb('#00FF00');
// output: {r: 0, g: 255, b: 0, a: 255}

ColorUtil.any.toRgbaString('hsl(180, 50%, 60%)');
// output: "rgba(102,204,204,1)"

ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex);
// output: [['#ff0000', '#00ff00'], '#0000ff']
```
### Gradients
The main difference to canvas gradients is that ColorUtil gradient functions return one color value from the gradient and whole gradient can be draw on canvas by iterating each canvas pixel whereas the native canvas gradient functions are used as a fillStyle to draw a gradient on canvas. ColorUtil gradient drawing performance on canvas isn't that fast compared to native canvas gradients thus these are not suitable for animation or rendering large areas.

This project started only to satisfy my curiosity, but there are some interesting things ColorUtil gradients can do what the native canvas gradients can't. Canvas has basically linear and radial gradient types where as ColorUtil has linear, matrix, circular and circlular matrix types.

A gradient in ColorUtil is presented as an array of colors. Gradient functions handle colors in rgb object notation. The following is a gradient from red to green and to blue.
```javascript
let gradientColors = [
    {a: 255, b: 0, g: 0, r: 255},
    {a: 255, b: 0, g: 255, r: 0},
    {a: 255, b: 255, g: 0, r: 0}
];
```

It might be easier to handle colors in numerical format and later convert them to rgb object notation.
```javascript
let colors = [0xFF0000, 0x00FF00, 0x0000FF];
let gradientColors = ColorUtil.convert(colors, ColorUtil.int.toRgb);
```

All gradient functions in ColorUtil calculate a color for a single point on gradient. Position on a gradient is a value between 0 and 1. Assuming `gradientColors` is the same as above, this function would return a color from the middle of the gradient.
```javascript
ColorUtil.rgb.gradientColor(gradientColors, 0.5);
// output: {r: 0, g: 255, b: 0, a: 255}
```

Gradient matrix works the same way but it needs a two dimensional color array and x and y points on the matrix. This function would return a color from the middle of the matrix.
```javascript
let matrix = ColorUtil.convert([[0xFF0000, 0x00FF00], [0x0000FF]], ColorUtil.int.toRgb);
ColorUtil.rgb.matrixColor(matrix, 0.5, 0.5);
// output: {r: 63.75, g: 63.75, b: 127.5, a: 255}
```

Now in order to draw a gradient you can create a canvas and draw each pixel on it. [Examples on how to do that can be found here.](https://github.com/jakoivis/color-util/tree/master/example)

![Preview](/example/githubimage.png)


## Features
- Fast color format conversion functions (number, hex, rgb, hsv, hsl, etc)
- Slower but more flexible Any color format conversion.
- gradient functions (regular gradient, matrix gradient, circular gradient, circular gradient matrix)
- gradient rotation and scaling
- gradient repeat
- alpha support in gradients and color conversions


## Change history
* 1.0.0
    * No code changes to previous version. I just like creating new releases.
* 0.6.0
    * hueColors -> getHueColors() & return value changed from array of numbers to array of rgb objects.
    * shorten function names: getGradientColor -> gradientColor, getMatrixColor -> matrixColor, convertTo2StopGradient -> twoStopGradient
    * No interface changes after this release.
    * hue shortcut mehod for getting hue color
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
