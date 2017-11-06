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
The main difference to native canvas gradients is that ColorUtil gradient functions return one color value from the gradient and whole gradient can be draw on canvas by iterating each canvas pixel whereas the native canvas gradient functions are used as a fillStyle to draw a gradient on canvas. ColorUtil gradient drawing performance on canvas isn't that fast compared to native canvas gradients thus these are not suitable for animation or rendering large areas.

This project started only to satisfy my curiosity, but there are some interesting things ColorUtil gradients can do what the native canvas gradients can't. Canvas has basically linear and radial gradient types where as ColorUtil has linear, matrix, circular and circlular matrix types.

```javascript
// There are couple of different ways to present colors. In this example a two dimensional RGB color array is used to create a gradient where each corner has of a square has different color value.

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

// Since we are using rgb colors here we use ColorUtil.rgb.createGradient to create a gradient function. HSV and HSL colors both have the same function.

let gradient = ColorUtil.rgb.createGradient({
    colors: colors,
    width: 300,
    height: 300
});

console.log(gradient(150, 150));
// {r: 127.5, g: 127.5, b: 127.5, a: 255}

console.log(gradient(300, 300));
// {r: 0, g: 255, b: 255, a: 255}

```

Now in order to draw a gradient you can create a canvas and draw each pixel on it. [Examples on how to do that can be found here.](https://github.com/jakoivis/color-util/tree/master/example)

#### Gradient color data structures
There are couple of supported data structures. You may choose the one you like. `createGradient` function converts the data internally to structure 1 or structure 2.

In the examples below RGB colors are used, but the same format is supported by HSV and HSL gradients. RGB colors consist of four components (r, g, b, a). If any of the component is missing from color object, default value is used. Default values can be changed with `createGradient` function's `defaultColor` property.

x and y properties within color object are color stops; they indicate the position of a color within a gradient. x and y propperties are also optional. If they are missing `createGradient` will generate them. You may leave some or all of the properties unspecified in which case the colors are distributed evenly. Value of x and y properties range from 0 to 1.

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
Two dimensional structure. This example produces exact same gradient as structure 2 above. Noteice that this structure is similar to structure 1, but the difference is that this is two dimensional. This data structure is identified as two dimensional if it has at least one y property specified within the structure. Otherwise it is understood as one dimensional.
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
    * Gradient color stops
    * Gradient data validator
    * Multiple types of gradient data structures allowed
    * HSL & HSV gradients
    * Gradient scaling, translate and centerize
    * Default gradient color
    * Renaming of some properties
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
