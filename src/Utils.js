
module.exports = new function() {

    this.get = (obj, path, defaultValue) => {

        let parts = Array.isArray(path) ? path : path.split('.');

        if (!parts.length) {

            return obj;
        }

        let first = parts.shift();

        if (obj.hasOwnProperty(first)) {

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

        if (obj.hasOwnProperty(first)) {

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
    }

    this.isNumber = (value) => {

        return typeof value === 'number' && !isNaN(value);
    }

    this.isNumeric = (value) => {

        return !isNaN(parseInt(value));
    }
};