
import {TYPES} from './types/types';
import Rgb from './types/Rgb';
import Gradient from './Gradient';
import ConversionUtil from './ConversionUtil';
import _ from './Utils';

/**
 * Immutable class.
 *
 * - Functions always return new instance of Color
 * - Getters always return a color value
 *
 * @class Color
 *
 * @private
 */
class Color {

    constructor(color) {

        if (color instanceof Color) {

            this._primaryColor = _.clone(color._primaryColor);
            this._cache = this._cloneCache(color);

        } else {

            let type = ConversionUtil.getColorType(color, TYPES);

            if (!type) {

                type = 'Rgb';
                color = {r: 0, g: 0, b: 0, a: 255};
            }

            this._primaryColor = color;
            this._cache = {};
            this._cache[type.name] = color;
        }
    }

    /**
     * Create clone of this color.
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
     * Cached
     *
     * @return     {Color}
     */
    hue() {

        this._cacheValue('hue', () => {

            let parts = Gradient.partialGradient(Rgb.hueColors(), this.hsv.h);
            let blend = Rgb.mix(parts.item1, parts.item2, parts.position);

            return new Color(blend);
        });

        return this._cache.hue;
    }
}

Color.prototype._cacheValue = function(id, getCachedValue) {

    if (!_.has(this._cache, id)) {

        let value = getCachedValue();

        this._cache[id] = value;
    }
};

Color.prototype._cloneCache = function(color) {

    let hue = color._cache.hue;
    let cache = _.clone(color._cache);

    if (hue) {

        cache.hue = hue.clone();
    }

    return cache;
};

for (let type of TYPES) {

    let typeName = type.name;

    Object.defineProperty(Color.prototype, typeName, {

        get: function() {

            this._cacheValue(typeName, () => {

                return ConversionUtil.convertAny(this._primaryColor, type, TYPES);
            });

            return this._cache[typeName];
        }
    });
}



export default Color;