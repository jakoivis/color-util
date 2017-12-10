
import _ from '../Utils';
import GradientDataUtil from './GradientDataUtil';

/*
one dimensional data structure for normal gradients
[
    {x:0},
    {x:1}
]
*/
export default class {

    static get name () {

        return 'flat1d';
    }

    static get matrix() {

        return false;
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

        return _.findPropertyIndex(colors, 'y') === -1;
    }

    static toFlat1d(colors, defaultColor) {

        let data = GradientDataUtil.addMissingStops(colors, 'x');

        GradientDataUtil.addDefaultColors(data, defaultColor);

        return data;
    }

    static toObject2d(colors, defaultColor) {

        let data = this.toFlat1d(colors, defaultColor);

        return [
            {
                y: 0,
                colors: data
            },
            {
                y: 1,
                colors: data
            }
        ];
    }
}