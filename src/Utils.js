
import forEach from 'lodash/forEach';
import noop from 'lodash/noop';
import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import includes from 'lodash/includes';
import pull from 'lodash/pull';
import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import find from 'lodash/find';
import findLast from 'lodash/findLast';

module.exports = new function() {

    this.noop = noop;
    this.forEach = forEach;
    this.get = get;
    this.has = has;
    this.set = set;
    this.includes = includes;
    this.pull = pull;
    this.find = find;
    this.findLast = findLast;
    this.findIndex = findIndex;
    this.findLastIndex = findLastIndex;

    this.findPropertyIndex = (data, property, startIndex=0) => {

        return findIndex(data, (item) => {

            return this.has(item, property);

        }, startIndex);
    }

    this.findLastPropertyIndex = (data, property, startIndex) => {

        startIndex = startIndex || data.length-1;

        return findLastIndex(data, (item) => {

            return this.has(item, property);

        }, startIndex);
    }

    this.lowerFirst = (string) => {

        if (!string) {

            return string;
        }

        let char = string.charAt(0).toLowerCase();

        return char + string.substring(1);
    };

    this.clone = (obj) => {

        return JSON.parse(JSON.stringify(obj));
    };

    this.isNumber = (value) => {

        return typeof value === 'number' && !isNaN(value);
    };

    this.isNumeric = (value) => {

        return !isNaN(parseInt(value));
    };

    this.isObject = (value) => {

        return value !== null && typeof value === 'object' && !Array.isArray(value);
    };
};