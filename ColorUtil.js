'use strict';

module.exports = {
    obj: {
        toDec: objToDec,
        toHex: objToHex,
        toRgba: objToRgba
    },
    dec: {
        toObj: decToObj,
        toHex: decToHex,
        toRgba: decToRgba
    },
    hex: {
        toObj: hexToObj,
        toDec: hexToDec,
        toRgba: hexToRgba
    },
    rgba: {

    },
    // objToDec: objToDec,
    // decToRgbObject: decToRgbObject,
    // decAvgBrightness: decAvgBrightness,
    // getGradientColor: getGradientColor,
    // decBrightness: decBrightness,
    // randomColor: randomColor
}

function objToDec(o) {
    return o.r << 16 | o.g << 8 | o.b;
}

function objToHex(o) {
    // e.g. (10<<8).toString(16) equals A00, but we need write this in format 0A00
    // by adding 1<<16 (10000) to the result and removing the first digit
    // we have produced 0A00 like this: ((1<<16) + (10<<8)).toString(16).slice(1)
    return '#' + ((1 << 24) + (o.r << 16) + (o.g << 8) + o.b).toString(16).slice(1);
}

function objToRgba(o, opacity) {
    opacity = !isNaN(parseFloat(opacity)) ? opacity : 1;
    return 'rgba('+o.r+','+o.g+','+o.b+','+opacity+')';
}

function decToObj(dec) {
    return {
        r: (dec & 0xFF0000) >> 16,
        g: (dec & 0x00FF00) >> 8,
        b: dec & 0x0000FF
    };
}

function decToHex(dec) {
    return '#' + ((1 << 24) + dec).toString(16).slice(1);
}

function decToRgba(dec, opacity) {
    opacity = !isNaN(parseFloat(opacity)) ? opacity : 1;
    return 'rgba('
            + ((dec & 0xFF0000) >> 16) + ','
            + ((dec & 0x00FF00) >> 8) + ','
            + (dec & 0x0000FF) + ','
            + opacity +')';
}

function hexToObj(hex) {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToDec(hex) {
    return parseInt(
        hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
            return r + r + g + g + b + b;
        })
        .replace('#', ''), 16);
}

function hexToRgba(hex, opacity) {
    opacity = !isNaN(parseFloat(opacity)) ? opacity : 1;
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? 'rgba('
        + parseInt(result[1], 16) + ','
        + parseInt(result[2], 16) + ','
        + parseInt(result[3], 16) + ','
        + opacity + ')'
    : null;
}

// /**
//  * Brightness is determined by average of all color components
//  *
//  * @param      {number}  dec
//  * @return     {number}  number from 0 to 1
//  */
// function decAvgBrightness(dec) {
//     return (
//         ((dec & 0xFF0000) >> 16) +
//         ((dec & 0x00FF00) >> 8) +
//         (dec & 0x0000FF)
//     ) / 0x2FD;
// }

// /**
//  * Brightness is determined by the color component having highest value
//  *
//  * @param      {number}  dec
//  * @return     {number}  number from 0 to 1
//  */
// function decBrightness(dec) {
//     var r = (dec & 0xFF0000) >> 16;
//     var g = (dec & 0x00FF00) >> 8;
//     var b = dec & 0x0000FF;

//     return Math.max(r, g, b) / 0xFF;
// }

// function randomColor() {
//     return (Math.random() * 0xFFFFFF) | 0;
// }

//     /**
//      * @param Gradient color1
//      * @param Gradient color2
//      * @param value Number value from 0 to 100
//      * @return Color between two values.
//      */
//     function getGetColorFromGradient(color1, color2, value) {
//         value = value<0?0:value>100?100:value;
//         var rgb1 = decToRgbObject(color1);
//         var rgb2 = decToRgbObject(color2);

//         var scale = {
//             r:(rgb1.r-rgb2.r)/100,
//             g:(rgb1.g-rgb2.g)/100,
//             b:(rgb1.b-rgb2.b)/100
//         };

//         return (
//             (rgb1.r-value*scale.r) << 16 |
//             (rgb1.g-value*scale.g) <<8 |
//             (rgb1.b-value*scale.b)
//         );
//     }

//     /**
//      * @param colors Several color values
//      * @param value Number value
//      * @param min Minimum of the value
//      * @param max Maximum of the value
//      * @return Color from the colors gradient array at the position indicated with value parameter.
//      */
//     function getGradientColor(colors, value)
//     {
//         if (colors.length === 1) {
//             return colors[0];
//         }

//         var min = 0;
//         var max = 1;
//         var v = value < min ? min : value > max ? max : value;
//         var s = max-min;
//         var l = colors.length-1;
//         var i = Math.floor(v/s*l);// index of the color
//         var pl = s/l;// length of one part
//         var nv = (v%pl)/pl*100;// new value. the value between two color values and scale is 0-100
//         return getGetColorFromGradient(colors[i],colors[i+1]?colors[i+1]:colors[i],nv);
//     }

    // /**
    //  * Returns a random color value that is not too dark and not too bright
    //  *
    //  * @param {number} minBrightness
    //  * @param {number} maxBrightness
    //  */
    // function getRandomColorFromBrightnessRange(minBrightness, maxBrightness)
    // {
    //     var color = (Math.random() * 0xFFFFFF) | 0;
    //     var brightness = getBrightness( color );
    //     if( brightness < minBrightness )
    //         color = brightenColor(color,minBrightness);
    //     else if( brightness > maxBrightness )
    //         color = darkenColor(color,maxBrightness);
    //     return color;
    // }

    // public static function brightenColor(hexColor:Number, percent:Number):Number {
    //     if(isNaN(percent))
    //         percent=0;
    //     if(percent>100)
    //         percent=100;
    //     if(percent<0)
    //         percent=0;

    //     var factor:Number=percent/100;
    //     var rgb:Object=hexToRgb(hexColor);

    //     rgb.r+=(255-rgb.r)*factor;
    //     rgb.b+=(255-rgb.b)*factor;
    //     rgb.g+=(255-rgb.g)*factor;

    //     return rgbToHex(Math.round(rgb.r),Math.round(rgb.g),Math.round(rgb.b));
    // }

    // public static function darkenColor(hexColor:Number, percent:Number):Number {
    //     if(isNaN(percent))
    //         percent=0;
    //     if(percent>100)
    //         percent=100;
    //     if(percent<0)
    //         percent=0;

    //     var factor:Number=1-(percent/100);
    //     var rgb:Object=hexToRgb(hexColor);

    //     rgb.r*=factor;
    //     rgb.b*=factor;
    //     rgb.g*=factor;

    //     return rgbToHex(Math.round(rgb.r),Math.round(rgb.g),Math.round(rgb.b));
    // }
