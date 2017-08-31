[![Build Status](https://travis-ci.org/jakoivis/color-util.svg?branch=master)](https://travis-ci.org/jakoivis/color-util)
[![Downloads this month](https://img.shields.io/npm/dm/color-util.svg)](https://npmjs.org/package/color-util)
[![Npm version](https://img.shields.io/npm/v/color-util.svg)](https://npmjs.org/package/color-util)

Utility with color format conversion and gradients functions.

Features
- Fast color format conversion functions (number, hex, rgb, hsv, hsl, etc)
- Slower but more flexible Any color format conversion.
- gradient functions (regular gradient, matrix gradient, circular gradient, circular gradient matrix)
- gradient rotation and scaling
- gradient repeat
- alpha support in gradients and color conversions

![Preview](/example/githubimage.png)

[API documentation](API.md)

[Examples](https://github.com/jakoivis/color-util/tree/master/example)

## Change history
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
