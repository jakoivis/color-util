
import _ from '../Utils';
import GradientDataValidatorUtil from './GradientDataValidatorUtil';

/*
Two dimensional flat matrix data structure

Must have at least one y-value specified.

[
    {x:0, y: 0},
    {x:1, y: 0},
    {x:0, y: 1},
    {x:1, y: 1}
];
*/
export default class {

    static get isMatrix() {

        return true;
    }

    static isMatchingStructure(colors) {

        let sample = _.get(colors, '0');

        return this.testStructureSingleSample(sample) &&
            this._testStructureAllSamples(colors);
    }

    static verifyStructure(colors) {

        return GradientDataValidatorUtil.verifyStructure(colors, this);
    }

    static testStructureSingleSample(item) {

        return _.isObject(item) && !_.has(item, 'colors');
    }

    static _testStructureAllSamples(colors) {

        return _.findIndex(colors, 'y') > -1;
    }

    static validateStops(colors) {

        colors = _.clone(colors);

        let data = [];
        let prevY = 0;
        let y;

        for (let item of colors) {

            y = _.isNumber(item.y) ? item.y : prevY;

            let existing = _.find(data, ['y', y]);

            if (existing) {

                existing.colors.push(item);

            } else {

                data.push({
                    y: y,
                    colors: [item]
                });
            }

            prevY = y;

            delete item.y;
        };

        return GradientDataValidatorUtil.addMissingStopsXY(data);
    }
}