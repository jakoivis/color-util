
module.exports = new function() {

    this.get = (obj, path, defaultValue) => {

        let parts = Array.isArray(path) ? path : path.split('.');

        if (!parts.length) {

            return obj;
        }

        let first = parts.shift();

        if (obj.hasOwnProperty(first)) {

            return this.get(obj[first], parts);
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
};