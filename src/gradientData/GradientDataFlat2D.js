
import _ from '../Utils';
import GradientDataUtil from './GradientDataUtil';

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

    static get name () {

        return 'flat2d';
    }

    static get matrix() {

        return true;
    }

    static testStructure(colors) {

        let sample = _.get(colors, '0');

        return this.testStructureSingleSample(sample) &&
            this._testStructureAllSamples(colors);
    }

    static verify(colors) {

        return GradientDataUtil.verify(colors, this);
    }

    static testStructureSingleSample(item) {

        return _.isObject(item) && !_.has(item, 'colors');
    }

    static _testStructureAllSamples(colors) {

        return _.findPropertyIndex(colors, 'y') > -1;
    }

    static toObject2d(colors) {

        colors = _.clone(colors);

        let data = [];
        let prevY = 0;
        let y;

        _.forEach(colors, (item) => {

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
        });

        return GradientDataUtil.addMissingStopsXY(data);
    }

    static addDefaultColors(colors, defaultColor) {

        GradientDataUtil.addDefaultColorsForMatrix(colors, defaultColor);
    }
}