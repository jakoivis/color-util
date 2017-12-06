
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

        return 'Objects';
    }

    static get isMatrix() {

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

    static validate(colors) {

        return GradientDataUtil.addMissingStops(colors, 'x');
    }

    static addDefaultColors(colors, defaultColor) {

        GradientDataUtil.addDefaultColors(colors, defaultColor);
    }
}