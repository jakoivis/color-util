
import {TYPES} from './types/types';
import Any from './types/Any';
import { getColorType } from './conversionUtils';
import _ from './Utils';

/**
 * @class Color
 *
 * @private
 */
function Color(color) {

    const init = () => {

        this._values = {};
        this._invalid = [];
        this._primaryColor = color;

        let type = getColorType(color, TYPES);

        this._values[type.name] = color;
    }

    // this.setHue = hue => {
    // }

    init(color);
}

for (let type of TYPES) {

    let typeName = type.name;
    let property = _.lowerFirst(type.name);

    Object.defineProperty(Color.prototype, property, {

        get: function() {

            let isInvalid = this._invalid.indexOf(typeName) > -1;
            let hasValue = _.has(this._values, typeName);

            if (isInvalid || !hasValue) {

                _.pull(this._invalid, typeName);

                this._values[typeName] = Any['to'+typeName](this._primaryColor);
            }

            return this._values[typeName];
        },

        // set: function(color) {

        //     let type = getColorType(color, TYPES);

        //     this._values[type.name] = color;

        //     for ()
        // }
    });
}

export default Color;