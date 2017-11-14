
import {TYPES} from './types/types';
import Any from './types/Any';
import Rgb from './types/Rgb';
import Gradient from './Gradient';
import { getColorType } from './conversionUtils';
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

        let type = getColorType(color, TYPES);

        if (!type) {

            type = 'Rgb';
            color = {r: 0, g: 0, b: 0, a: 255};
        }

        this._primaryType = type;
        this._primaryColor = color;
        this._values = {};
        this._values[type.name] = color;

        return this;
    }

    clone() {

        return new Color(this._primaryColor);
    }

    set hueValue(value) {

        // let type = getColorType(color, TYPES);
        // let isHueValue = type.name === 'Int' && color <= 1 && color >= 0;

        // if (isHueValue) {

        // }
    }

    set hue(color) {

        let hsv = this.hsv;

        hsv.h = new Color(color).hsv.h

        this.set(hsv);
    }

    get hue() {

        let parts = Gradient.partialGradient(Rgb.hueColors(), this.hsl.h);
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

                this._values[typeName] = Any['to'+typeName](this._primaryColor);
            }

            return this._values[typeName];
        }
    });
}

export default Color;