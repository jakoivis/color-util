
module.exports = new function() {

    this.noop = () => {};

    this.get = (obj, path, defaultValue) => {

        let parts = Array.isArray(path) ? path : path.split('.');

        if (!parts.length) {

            return obj;
        }

        let first = parts.shift();

        if (obj && obj.hasOwnProperty(first)) {

            return this.get(obj[first], parts, defaultValue);
        }

        return defaultValue;
    };

    this.has = (obj, path) => {

        let parts = Array.isArray(path) ? path : path.split('.');

        if (!parts.length) {

            return true;
        }

        let first = parts.shift();

        if (obj && obj.hasOwnProperty(first)) {

            return this.has(obj[first], parts);
        }

        return false;
    };

    this.set = (obj, path, value) => {

        let parts = Array.isArray(path) ? path : path.split('.');
        let first = parts.shift();

        if (!parts.length) {

            obj[first] = value;

            return;
        }

        if (!obj.hasOwnProperty(first)) {

            let next = parts[0];

            obj[first] = this.isNumeric(next) ? [] : {};
        }

        this.set(obj[first], parts, value);
    };

    this.clone = (obj) => {

        return JSON.parse(JSON.stringify(obj));
    };

    this.includes = (obj, value) => {

        if (Array.isArray(obj)) {

            return obj.indexOf(value) > -1;
        }

        for (const [key, val] of Object.entries(obj)) {

            if (value === val) {

                return true;
            }
        }

        return false;
    };

    this.isObject = (value) => {

        return value !== null && typeof value === 'object' && !Array.isArray(value);
    };

    this.isNumber = (value) => {

        return typeof value === 'number' && !isNaN(value);
    };

    this.isNumeric = (value) => {

        return !isNaN(parseInt(value));
    };

    const getFindMatcher = (matcher) => {

        let newMatcher = matcher;
        let isPropertyMatcher = (Array.isArray(matcher) && matcher.length === 1) ||
                typeof matcher === 'string';
        let isPropertyValueMatcher = (Array.isArray(matcher) && matcher.length > 1);

        if (isPropertyMatcher) {

            let m = Array.isArray(matcher) ? matcher[0] : matcher;

            newMatcher = (value, index) => {

                return this.has(value, m);
            }

        } else if (isPropertyValueMatcher) {

            newMatcher = (value, index) => {

                return this.get(value, matcher[0]) === matcher[1];
            }
        }

        return newMatcher;
    };

    this.findIndex = (array, matcher, startIndex) => {

        startIndex = startIndex || 0;

        let newMatcher = getFindMatcher(matcher);

        if (startIndex < 0) {

            startIndex = array.length + startIndex;
        }

        for (let i = startIndex; i < array.length; i++) {

            if (newMatcher(array[i], i)) {

                return i;
            }
        }

        return -1;
    };

    this.findLastIndex = (array, matcher, startIndex) => {

        startIndex = this.isNumber(startIndex) ? startIndex : array.length - 1;

        let newMatcher = getFindMatcher(matcher);

        if (startIndex < 0) {

            startIndex = array.length + startIndex;
        }

        for(let i = startIndex; i > -1; i--) {

            if (newMatcher(array[i], i)) {

                return i;
            }
        }

        return -1;
    };

    this.find = (array, matcher, startIndex) => array[this.findIndex(array, matcher, startIndex)];
    this.findLast = (array, matcher, startIndex) => array[this.findLastIndex(array, matcher, startIndex)];

    this.findPropertyIndex = (data, property, startIndex=0) => {

        return this.findIndex(data, (item) => {

            return this.has(item, property);

        }, startIndex);
    };

    this.findLastPropertyIndex = (data, property, startIndex) => {

        startIndex = startIndex || data.length-1;

        return this.findLastIndex(data, (item) => {

            return this.has(item, property);

        }, startIndex);
    };

    this.pull = (array, value) => {

        let index;

        if (!array) {

            return;
        }

        while (array.indexOf(value) > -1) {

            index = array.indexOf(value);

            if (index > -1) {

                array.splice(index, 1);
            }
        }
    };

    this.lowerFirst = (string) => {

        if (!string) {

            return string;
        }

        let char = string.charAt(0).toLowerCase();

        return char + string.substring(1);
    };

    this.forEach = (data, callback) => {

        for (let i = 0; i < data.length; i++) {

            let item = data[i];

            callback(item, i);
        }
    };
};