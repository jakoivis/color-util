
import {TYPES} from './types/types';
import Rgb from './types/Rgb';
import Gradient from './Gradient';
import ConversionUtil from './ConversionUtil';
import _ from './Utils';

/**
 * Immutable class which holds and caches all the color values
 *
 * @class color
 * @memberof colorutil
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
     * @memberof colorutil.color
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
     * @memberof colorutil.color
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
     * @private
     * @memberof colorutil.color
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
     * @memberof colorutil.color
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

_.forEach(TYPES, (type) => {

    let typeName = type.name;

    Object.defineProperty(Color.prototype, typeName, {

        get: function() {

            this._cacheValue(typeName, () => {

                return ConversionUtil.convertAny(this._primaryColor, type, TYPES);
            });

            return this._cache[typeName];
        }
    });
});

/*
 * @name int
 * @memberof colorutil.color
 * @type {number}
 */

/*
 * @name hex
 * @memberof colorutil.color
 * @type {string}
 */

export default Color;