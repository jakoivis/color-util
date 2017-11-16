
import {TYPES, TYPES_BY_NAME} from './types/types';
import Rgb from './types/Rgb';
import Gradient from './Gradient';
import ConversionUtil from './ConversionUtil';
import _ from './Utils';

/**
 * @class Color
 *
 * @private
 */
class Color {

    constructor(color) {

        this.set(color);
    }

    set(color) {

        let type = ConversionUtil.getColorType(color, TYPES);

        if (!type) {

            type = 'Rgb';
            color = {r: 0, g: 0, b: 0, a: 255};
        }

        this._primaryColor = color;
        this._values = {};
        this._values[type.name] = color;

        return this;
    }

    clone() {

        return new Color(this._primaryColor);
    }

    hueFromColor(color) {

        let hsv = this.hsv;

        hsv.h = new Color(color).hsv.h;

        this.set(hsv);

        return this;
    }

    get hue() {

        let parts = Gradient.partialGradient(Rgb.hueColors(), this.hsv.h);
        let blend = Rgb.mix(parts.item1, parts.item2, parts.position);

        return new Color(blend);
    }
}

for (let type of TYPES) {

    let typeName = type.name;
    let property = _.lowerFirst(type.name);

    Object.defineProperty(Color.prototype, property, {

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