
module.exports = {
    rgbToDec: rgbToDec,
    decToRgbObject: decToRgbObject,
    decAvgBrightness: decAvgBrightness,
    getGradientColor: getGradientColor
}

function rgbToDec(r, g, b) {
    return (r<<16 | g<<8 | b);
}

function decToRgbObject(dec) {
    return {
        r: (dec & 0xff0000) >> 16,
        g: (dec & 0x00ff00) >> 8,
        b: dec & 0x0000ff
    };
}

function decAvgBrightness(dec) {
    return (
        ((dec & 0xff0000) >> 16) +
        ((dec & 0x00ff00) >> 8) +
        (dec & 0x0000ff)
    ) / 0x2fd;
}

function randomColor() {
    return Math.round(Math.random() * 0xFFFFFF);
}

    /**
     * @param Gradient color1
     * @param Gradient color2
     * @param value Number value from 0 to 100
     * @return Color between two values.
     */
    function getGetColorFromGradient(color1, color2, value) {
        value = value<0?0:value>100?100:value;
        var rgb1 = decToRgbObject(color1);
        var rgb2 = decToRgbObject(color2);

        var scale = {
            r:(rgb1.r-rgb2.r)/100,
            g:(rgb1.g-rgb2.g)/100,
            b:(rgb1.b-rgb2.b)/100
        };

        return (
            (rgb1.r-value*scale.r) << 16 |
            (rgb1.g-value*scale.g) <<8 |
            (rgb1.b-value*scale.b)
        );
    }

    /**
     * @param colors Several color values
     * @param value Number value
     * @param min Minimum of the value
     * @param max Maximum of the value
     * @return Color from the colors gradient array at the position indicated with value parameter.
     */
    function getGradientColor(colors, value)
    {
        if(colors.length === 1) {
            return colors[0];
        }

        var min = 0;
        var max = 1;
        var v = value < min ? min : value > max ? max : value;
        var s = max-min;
        var l = colors.length-1;
        var i = Math.floor(v/s*l);// index of the color
        var pl = s/l;// length of one part
        var nv = (v%pl)/pl*100;// new value. the value between two color values and scale is 0-100
        return getGetColorFromGradient(colors[i],colors[i+1]?colors[i+1]:colors[i],nv);
    }

    // /**
    //  * @param Gradient color1
    //  * @param Gradient color2
    //  * @param value Number value from 0 to 100
    //  * @return Color between two values.
    //  */
    // public static function getGetColorFromGradient(color1:uint, color2:uint, value:Number):uint
    // {
    //     value = value<0?0:value>100?100:value;
    //     var rgb1:Object = hexToRgb(color1);
    //     var rgb2:Object = hexToRgb(color2);
    //     var scale:Object = {r:(rgb1.r-rgb2.r)/100, g:(rgb1.g-rgb2.g)/100, b:(rgb1.b-rgb2.b)/100};
    //     return ((rgb1.r-value*scale.r)<<16|(rgb1.g-value*scale.g)<<8|(rgb1.b-value*scale.b));
    // }

    // /**
    //  * @param colors Several color values
    //  * @param value Number value
    //  * @param min Minimum of the value
    //  * @param max Maximum of the value
    //  * @return Color from the colors gradient array at the position indicated with value parameter.
    //  */
    // public static function getColorAtValue(colors:Array, value:Number, min:int=0, max:int=100):uint
    // {
    //     if(colors.length==1) return colors[0];
    //     var v:int = (value<min?min:value>max?max:value)-min;
    //     var s:int = max-min;
    //     var l:int = colors.length-1;
    //     var i:int = Math.floor(v/s*l);// index of the color
    //     var pl:Number = s/l;// length of one part
    //     var nv:Number = (v%pl)/pl*100;// new value. the value between two color values and scale is 0-100
    //     return getGetColorFromGradient(colors[i],colors[i+1]?colors[i+1]:colors[i],nv);
    // }

    // /**
    //  * Returns a random color value that is not too dark and not too bright
    //  */
    // public static function getRandomColorFromBrightnessRange(minBrightness:uint=40, maxBrightness:uint=70):uint
    // {
    //     var color:uint = getRandomColor();
    //     var brightness:int = getBrightness( color );
    //     if( brightness < minBrightness )
    //         color = brightenColor(color,minBrightness);
    //     else if( brightness > maxBrightness )
    //         color = darkenColor(color,maxBrightness);
    //     return color;
    // }

    // public static function brightness(hex:Number):Number{
    //     var max:Number=0;
    //     var rgb:Object=hexToRgb(hex);
    //     if(rgb.r>max)
    //         max=rgb.r;
    //     if(rgb.g>max)
    //         max=rgb.g;
    //     if(rgb.b>max)
    //         max=rgb.b;
    //     max/=255;
    //     return max;
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
