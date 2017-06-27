[![Build Status](https://travis-ci.org/jakoivis/ColorUtil.svg?branch=master)](https://travis-ci.org/jakoivis/ColorUtil)

![Preview](/example/githubimage.jpg)

<a name="getSystemEndian"></a>

## getSystemEndian() ⇒ <code>number</code>
Get the endian used by the system.
[https://developer.mozilla.org/en-US/docs/Glossary/Endianness](https://developer.mozilla.org/en-US/docs/Glossary/Endianness)

**Kind**: global function  
**Returns**: <code>number</code> - 0=little-endian, 1=big-endian, 2=unknown-endian  
<a name="convert"></a>

## convert(array, ...conversionFunctions) ⇒ <code>array</code>
Run conversion functions for color array or color matrix. 

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | Array of colors |
| ...conversionFunctions | <code>function</code> | Rest of the parameters are conversion functions                                                  which are executed in the order they are listed. |

**Example**  
```js
ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex);
// output: [['#ff0000', '#00ff00'], '#0000ff']
ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex, ColorUtil.hex.toRgba);
// output: [['rgba(255,0,0,1)', 'rgba(0,255,0,1)'], 'rgba(0,0,255,1)']
```
<a name="convertTo2StopGradient"></a>

## convertTo2StopGradient(array, value) ⇒ <code>Object</code>
Calculate two items from a gradient array and a relative position of
the gradient between those two items in an evenly distributed
gradient. The resulting values can be used calculate the final color.
 
**Returns**: <code>Object</code> - Gradient array items which are the closest to the
                          point indicated by position and the relative position
                          between those two items  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | Array of colors. Content of the array does not matter. |
| value | <code>number</code> | Position on the whole gradient. |

**Example**  
```js
// The example position 0.25 is in the middle of the first and
// second colors so new 2 point gradient array contains only those
// first and second colors. The given absolute position 0.25 is relatively
// 0.5 between those two values.
ColorUtil.convertTo2StopGradient([0xFF0000, 0x00FF00, 0x0000FF], 0.25);
// output: {array: [0xFF0000, 0x00FF00], position: 0.5}
```
<a name="getGradientColor"></a>

## getGradientColor(colors, position, [convertToObj], [convertFromObj]) ⇒ <code>number</code>
Get color from gradient.

Gradient calculation is done in object format so convertToObj must convert
to object and convertFromObj must convert from object type. In case colors
are preformatted to object no conversion is needed. In this case set null in
place for the conversion function.

**Returns**: <code>number</code> - Return value depend on the what has been set to convertFromObj.  
**Exampl**: let gradient = [0xFF0000, 0x00FF00, 0x0000FF];
ColorUtil.getGradientColor(gradient, 0.5, ColorUtil.int.toRgb, ColorUtil.rgb.toHex);  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| colors | <code>array</code> |  | Array of colors. Color format can be anything.                                  convertToObj needs to be set depending on the format. |
| position | <code>number</code> |  | Position on the gradient. Value from 0 to 1. |
| [convertToObj] | <code>number</code> | <code></code> | Convert incoming color to object. |
| [convertFromObj] | <code>number</code> | <code></code> | Convert outgoing color from object. |

<a name="getGradientMatrixColor"></a>

## getGradientMatrixColor(matrix, x, y, [convertToObj], [convertFromObj]) ⇒ <code>number</code>
Get color from gradient matrix. Gradient matrix is like normal gradient
but it is two dimensional.

Gradient calculation is done in object format so convertToObj must convert
to object and convertFromObj must convert from object type. In case colors
are preformatted to object no conversion is needed. In this case set null in
place for the conversion function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| matrix | <code>array</code> |  | Array of gradient color arrays |
| x | <code>number</code> |  | Horizontal position on the gradient. Value from 0 to 1. |
| y | <code>number</code> |  | Vertical position on the gradient. Value from 0 to 1. |
| [convertToObj] | <code>function</code> | <code></code> | Convert incoming color to object. |
| [convertFromObj] | <code>function</code> | <code></code> | Convert outgoing color from object. |

**Example**  
```js
let matrix = [[0xFF0000, 0x00FF00], [0x0000FF]];
ColorUtil.getGradientMatrixColor(matrix, 0.5, 0.5, ColorUtil.int.toRgb, ColorUtil.rgb.toHex);
```
