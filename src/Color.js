
import {TYPES} from './types/types';
import Rgb from './types/Rgb';
import Gradient from './Gradient';
import ConversionUtil from './ConversionUtil';
import _ from './Utils';

/**
 * Immutable class.
 *
 * @class Color
 *
 * @private
 */
class Color {

    constructor(color) {

        if (color instanceof Color) {

            this._primaryColor = _.clone(color._primaryColor);
            this._values = _.clone(color._values);

        } else {

            let type = ConversionUtil.getColorType(color, TYPES);

            if (!type) {

                type = 'Rgb';
                color = {r: 0, g: 0, b: 0, a: 255};
            }

            this._primaryColor = color;
            this._values = {};
            this._values[type.name] = color;
        }
    }

    /**
     * Create clone of this color
     *
     * @return     {Color}
     */
    clone() {

        return new Color(this);
    }

    /**
     * Create clone of this color where hue is shifted
     * to same as with the color in argument.
     *
     * @param      {*}  color   Any color value
     * @return     {Color}
     */
    hueFromColor(color) {

        let hsv = this.hsv;

        hsv.h = new Color(color).hsv.h;

        return new Color(hsv);
    }

    /**
     * Create clone of this color where hue value is shifted
     * to a value.
     *
     * @param      {*}  color   Hue value in range 0 - 1
     * @return     {Color}
     */
    hueFromValue(hueValue) {

        let hsv = this.hsv;

        hsv.h = hueValue > 1 ? 1 : hueValue < 0 ? 0 : hueValue;

        return new Color(hsv);
    }

    /**
     * Create new color which is the hue color of this color.
     *
     * @return     {Color}
     */
    hue() {

        let parts = Gradient.partialGradient(Rgb.hueColors(), this.hsv.h);
        let blend = Rgb.mix(parts.item1, parts.item2, parts.position);

        return new Color(blend);
    }
}

for (let type of TYPES) {

    let typeName = type.name;
    // let property = type.name;

    Object.defineProperty(Color.prototype, typeName, {

        get: function() {

            let hasValue = _.has(this._values, typeName);

            if (!hasValue) {

                this._values[typeName] = ConversionUtil.convertAny(this._primaryColor, type, TYPES);
            }

            return this._values[typeName];
        }
    });
}

export default Color;