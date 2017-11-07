
import _ from '../Utils';
import GradientDataValidatorUtil from './GradientDataValidatorUtil';

/*
one dimensional data structure for normal gradients
[
    {x:0},
    {x:1}
]
*/
export default class {

    static get isMatrix() {

        return false;
    }

    static isMatchingStructure(colors) {

        let sample = _.get(colors, '0');

        return this.testStructureSingleSample(sample) &&
            this._testStructureAllSamples(colors);
    }

    static verify(colors) {

        return GradientDataValidatorUtil.verify(colors, this);
    }

    static testStructureSingleSample(item) {

        return _.isObject(item) && !_.has(item, 'colors');
    }

    static _testStructureAllSamples(colors) {

        return _.findIndex(colors, 'y') === -1;
    }

    static validate(colors) {

        return GradientDataValidatorUtil.addMissingStops(colors, 'x');
    }

    static addDefaultColors(colors, defaultColor) {

        GradientDataValidatorUtil.addDefaultColors(colors, defaultColor, this);
    }
}