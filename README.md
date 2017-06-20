[![Build Status](https://travis-ci.org/jakoivis/ColorUtil.svg?branch=master)](https://travis-ci.org/jakoivis/ColorUtil)

![Preview](/example/githubimage.jpg)

## Classes

<dl>
<dt><a href="#ColorUtil">ColorUtil</a></dt>
<dd></dd>
<dt><a href="#Obj">Obj</a></dt>
<dd></dd>
<dt><a href="#Int">Int</a></dt>
<dd></dd>
<dt><a href="#Hex">Hex</a></dt>
<dd></dd>
<dt><a href="#Rgba">Rgba</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#obj">obj</a> ⇒ <code><a href="#Obj">Obj</a></code></dt>
<dd></dd>
<dt><a href="#int">int</a> ⇒ <code><a href="#Int">Int</a></code></dt>
<dd></dd>
<dt><a href="#hex">hex</a> ⇒ <code><a href="#Hex">Hex</a></code></dt>
<dd></dd>
<dt><a href="#rgba">rgba</a> ⇒ <code><a href="#Rgba">Rgba</a></code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getSystemEndian">getSystemEndian()</a> ⇒ <code>number</code></dt>
<dd><p>Get the endian used by the system.
<a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">https://developer.mozilla.org/en-US/docs/Glossary/Endianness</a></p>
</dd>
<dt><a href="#convert">convert(array, ...conversionFunctions)</a> ⇒ <code>array</code></dt>
<dd><p>Run conversion functions for color array or color matrix.</p>
</dd>
<dt><a href="#convertTo2StopGradient">convertTo2StopGradient(array, value)</a> ⇒ <code>Object</code></dt>
<dd><p>Calculate two items from a gradient array and a relative position of
the gradient between those two items in an evenly distributed
gradient. The resulting values can be used calculate the final color.</p>
</dd>
<dt><a href="#getGradientColor">getGradientColor(colors, position, [convertToObj], [convertFromObj])</a> ⇒ <code>number</code></dt>
<dd><p>Get color from gradient.</p>
<p>Gradient calculation is done in object format so convertToObj must convert
to object and convertFromObj must convert from object type. In case colors
are preformatted to object no conversion is needed. In this case set null in
place for the conversion function.</p>
</dd>
<dt><a href="#getGradientMatrixColor">getGradientMatrixColor(matrix, x, y, [convertToObj], [convertFromObj])</a> ⇒ <code>number</code></dt>
<dd><p>Get color from gradient matrix. Gradient matrix is like normal gradient
but it is two dimensional.</p>
<p>Gradient calculation is done in object format so convertToObj must convert
to object and convertFromObj must convert from object type. In case colors
are preformatted to object no conversion is needed. In this case set null in
place for the conversion function.</p>
</dd>
</dl>

<a name="ColorUtil"></a>

## ColorUtil
**Kind**: global class  
<a name="new_ColorUtil_new"></a>

### new ColorUtil()
Color conversion functions and some other things

<a name="Obj"></a>

## Obj
**Kind**: global class  

* [Obj](#Obj)
    * [new Obj()](#new_Obj_new)
    * [.toInt(o)](#Obj.toInt) ⇒ <code>number</code>
    * [.toHex(o)](#Obj.toHex) ⇒ <code>string</code>
    * [.toRgba(o)](#Obj.toRgba) ⇒ <code>string</code>
    * [.toUint32(o)](#Obj.toUint32) ⇒ <code>number</code>
    * [.toInt32(o)](#Obj.toInt32) ⇒ <code>number</code>

<a name="new_Obj_new"></a>

### new Obj()
Object conversion functions

<a name="Obj.toInt"></a>

### Obj.toInt(o) ⇒ <code>number</code>
Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to 24-bit number (0xRRGGBB). Alpha is ignored.

**Kind**: static method of [<code>Obj</code>](#Obj)  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | Object |

<a name="Obj.toHex"></a>

### Obj.toHex(o) ⇒ <code>string</code>
Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to 24-bit hex string ('#RRGGBB'). Alpha is ignored.

**Kind**: static method of [<code>Obj</code>](#Obj)  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | Object |

<a name="Obj.toRgba"></a>

### Obj.toRgba(o) ⇒ <code>string</code>
Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to rgba string ('rgba(RRR,GGG,BBB,A)').Alpha is converted from range 0-255 to 0-1. Default alphavalue is 1.

**Kind**: static method of [<code>Obj</code>](#Obj)  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | Object |

<a name="Obj.toUint32"></a>

### Obj.toUint32(o) ⇒ <code>number</code>
Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to uint32 (0xAABBGGRR in little-endian, 0xRRGGBBAA in big-endian).Default alpha value is 255. Resulting value is positivee.g. {r:255,g:0,b:0,a:255} would be 4278190335.

**Kind**: static method of [<code>Obj</code>](#Obj)  

| Param | Type |
| --- | --- |
| o | <code>object</code> | 

<a name="Obj.toInt32"></a>

### Obj.toInt32(o) ⇒ <code>number</code>
Object ({r:RRR, g:GGG, b:BBB, a:AAA}) to int32 (0xAABBGGRR in little-endian, 0xRRGGBBAA in big-endian).Default alpha value is 255. Resulting value can be negativee.g. {r:255,g:0,b:0,a:255} would be -16776961.

**Kind**: static method of [<code>Obj</code>](#Obj)  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | Object |

<a name="Int"></a>

## Int
**Kind**: global class  

* [Int](#Int)
    * [new Int()](#new_Int_new)
    * [.toObj(int, [a])](#Int.toObj) ⇒ <code>object</code>
    * [.toHex(int)](#Int.toHex) ⇒ <code>string</code>
    * [.toRgba(int, [a])](#Int.toRgba) ⇒ <code>string</code>

<a name="new_Int_new"></a>

### new Int()
Integer conversion functions

<a name="Int.toObj"></a>

### Int.toObj(int, [a]) ⇒ <code>object</code>
24-bit integer number (0xRRGGBB) to object ({r:RRR, g:GGG, b:BBB, a:AAA})

**Kind**: static method of [<code>Int</code>](#Int)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| int | <code>number</code> |  | Integer |
| [a] | <code>number</code> | <code>0xFF</code> | Alpha value in range 0-255 |

<a name="Int.toHex"></a>

### Int.toHex(int) ⇒ <code>string</code>
24-bit integer number (0xRRGGBB) to 24-bit hex string ('#RRGGBB').

**Kind**: static method of [<code>Int</code>](#Int)  

| Param | Type | Description |
| --- | --- | --- |
| int | <code>number</code> | Integer |

<a name="Int.toRgba"></a>

### Int.toRgba(int, [a]) ⇒ <code>string</code>
24-bit integer number (0xRRGGBB) to rgba string ('rgba(RRR,GGG,BBB,A)')

**Kind**: static method of [<code>Int</code>](#Int)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| int | <code>number</code> |  | Integer |
| [a] | <code>number</code> | <code>1</code> | Alpha value in range 0-1 |

<a name="Hex"></a>

## Hex
**Kind**: global class  

* [Hex](#Hex)
    * [new Hex()](#new_Hex_new)
    * [.toObj(hex, [a])](#Hex.toObj) ⇒ <code>object</code>
    * [.toInt(hex)](#Hex.toInt) ⇒ <code>number</code>
    * [.toRgba(hex, [a])](#Hex.toRgba) ⇒ <code>string</code>

<a name="new_Hex_new"></a>

### new Hex()
Hexadecimal conversion functions

<a name="Hex.toObj"></a>

### Hex.toObj(hex, [a]) ⇒ <code>object</code>
24-bit hex string ('#RRGGBB') to object ({r:RRR, g:GGG, b:BBB, a:AAA})

**Kind**: static method of [<code>Hex</code>](#Hex)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hex | <code>string</code> |  | Hexadecimal string |
| [a] | <code>number</code> | <code>0xFF</code> | Alpha value in range 0-255 |

<a name="Hex.toInt"></a>

### Hex.toInt(hex) ⇒ <code>number</code>
24-bit hex string ('#RRGGBB') to 24-bit integer (0xRRGGBB)

**Kind**: static method of [<code>Hex</code>](#Hex)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | Hexadecimal string |

<a name="Hex.toRgba"></a>

### Hex.toRgba(hex, [a]) ⇒ <code>string</code>
24-bit hex string ('#RRGGBB') to rgba string ('rgba(RRR,GGG,BBB,A)')

**Kind**: static method of [<code>Hex</code>](#Hex)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hex | <code>string</code> |  | Hexadecimal string |
| [a] | <code>number</code> | <code>1</code> | Alpha value in range 0-1 |

<a name="Rgba"></a>

## Rgba
**Kind**: global class  

* [Rgba](#Rgba)
    * [new Rgba()](#new_Rgba_new)
    * [.toObj(rgba)](#Rgba.toObj) ⇒ <code>object</code>
    * [.toInt(rgba)](#Rgba.toInt) ⇒ <code>number</code>
    * [.toHex(rgba)](#Rgba.toHex) ⇒ <code>string</code>

<a name="new_Rgba_new"></a>

### new Rgba()
Rgba conversion functionsNotice that rgba values should not have spaces.

<a name="Rgba.toObj"></a>

### Rgba.toObj(rgba) ⇒ <code>object</code>
Rgba string ('rgba(RRR,GGG,BBB,A)') to object ({r:RRR, g:GGG, b:BBB, a:AAA})

**Kind**: static method of [<code>Rgba</code>](#Rgba)  

| Param | Type | Description |
| --- | --- | --- |
| rgba | <code>string</code> | Rgba string |

<a name="Rgba.toInt"></a>

### Rgba.toInt(rgba) ⇒ <code>number</code>
Rgba string ('rgba(RRR,GGG,BBB,A)') to 24-bit integer (0xRRGGBB). Alpha is ignored.

**Kind**: static method of [<code>Rgba</code>](#Rgba)  

| Param | Type | Description |
| --- | --- | --- |
| rgba | <code>string</code> | Rgba string |

<a name="Rgba.toHex"></a>

### Rgba.toHex(rgba) ⇒ <code>string</code>
Rgba string ('rgba(RRR,GGG,BBB,A)') to hexadecimal string ('#RRGGBB'). Alpha is ignored.

**Kind**: static method of [<code>Rgba</code>](#Rgba)  

| Param | Type | Description |
| --- | --- | --- |
| rgba | <code>string</code> | Rgba string |

<a name="obj"></a>

## obj ⇒ [<code>Obj</code>](#Obj)
**Kind**: global variable  
**Returns**: [<code>Obj</code>](#Obj) - Object conversion functions  
<a name="int"></a>

## int ⇒ [<code>Int</code>](#Int)
**Kind**: global variable  
**Returns**: [<code>Int</code>](#Int) - Integer conversion functions  
<a name="hex"></a>

## hex ⇒ [<code>Hex</code>](#Hex)
**Kind**: global variable  
**Returns**: [<code>Hex</code>](#Hex) - Hexadecimal conversion functions  
<a name="rgba"></a>

## rgba ⇒ [<code>Rgba</code>](#Rgba)
**Kind**: global variable  
**Returns**: [<code>Rgba</code>](#Rgba) - Rgba conversion functions  
<a name="getSystemEndian"></a>

## getSystemEndian() ⇒ <code>number</code>
Get the endian used by the system.[https://developer.mozilla.org/en-US/docs/Glossary/Endianness](https://developer.mozilla.org/en-US/docs/Glossary/Endianness)

**Kind**: global function  
**Returns**: <code>number</code> - 0=little-endian, 1=big-endian, 2=unknown-endian  
<a name="convert"></a>

## convert(array, ...conversionFunctions) ⇒ <code>array</code>
Run conversion functions for color array or color matrix.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | Array of colors |
| ...conversionFunctions | <code>function</code> | Rest of the parameters are conversion functions                                                  which are executed in the order they are listed. |

**Example**  
```js
ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex);// output: [['#ff0000', '#00ff00'], '#0000ff']ColorUtil.convert([[0xFF0000, 0x00FF00], 0x0000FF], ColorUtil.int.toHex, ColorUtil.hex.toRgba);// output: [['rgba(255,0,0,1)', 'rgba(0,255,0,1)'], 'rgba(0,0,255,1)']
```
<a name="convertTo2StopGradient"></a>

## convertTo2StopGradient(array, value) ⇒ <code>Object</code>
Calculate two items from a gradient array and a relative position ofthe gradient between those two items in an evenly distributedgradient. The resulting values can be used calculate the final color.

**Kind**: global function  
**Returns**: <code>Object</code> - Gradient array items which are the closest to the                          point indicated by position and the relative position                          between those two items  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | Array of colors. Content of the array does not matter. |
| value | <code>number</code> | Position on the whole gradient. |

**Example**  
```js
// The example position 0.25 is in the middle of the first and// second colors so new 2 point gradient array contains only those// first and second colors. The given absolute position 0.25 is relatively// 0.5 between those two values.ColorUtil.convertTo2StopGradient([0xFF0000, 0x00FF00, 0x0000FF], 0.25);// output: {array: [0xFF0000, 0x00FF00], position: 0.5}
```
<a name="getGradientColor"></a>

## getGradientColor(colors, position, [convertToObj], [convertFromObj]) ⇒ <code>number</code>
Get color from gradient.Gradient calculation is done in object format so convertToObj must convertto object and convertFromObj must convert from object type. In case colorsare preformatted to object no conversion is needed. In this case set null inplace for the conversion function.

**Kind**: global function  
**Returns**: <code>number</code> - Return value depend on the what has been set to convertFromObj.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| colors | <code>array</code> |  | Array of colors. Color format can be anything.                                  convertToObj needs to be set depending on the format. |
| position | <code>number</code> |  | Position on the gradient. Value from 0 to 1. |
| [convertToObj] | <code>number</code> | <code></code> | Convert incoming color to object. |
| [convertFromObj] | <code>number</code> | <code></code> | Convert outgoing color from object. |

<a name="getGradientMatrixColor"></a>

## getGradientMatrixColor(matrix, x, y, [convertToObj], [convertFromObj]) ⇒ <code>number</code>
Get color from gradient matrix. Gradient matrix is like normal gradientbut it is two dimensional.Gradient calculation is done in object format so convertToObj must convertto object and convertFromObj must convert from object type. In case colorsare preformatted to object no conversion is needed. In this case set null inplace for the conversion function.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| matrix | <code>array</code> |  | Array of gradient color arrays |
| x | <code>number</code> |  | Horizontal position on the gradient. Value from 0 to 1. |
| y | <code>number</code> |  | Vertical position on the gradient. Value from 0 to 1. |
| [convertToObj] | <code>function</code> | <code></code> | Convert incoming color to object. |
| [convertFromObj] | <code>function</code> | <code></code> | Convert outgoing color from object. |

