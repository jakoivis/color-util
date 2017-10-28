
import _ from '../Utils';
import GradientDataValidatorUtil from './GradientDataValidatorUtil';
/*

two dimensional data structure for matrix gradients
[
    {
        y: 0,
        colors: [
            {x:0},
            {x:1}
        ]
    },
    {
        y: 0,
        colors: [
            {x:0},
            {x:1}
        ]
    }
];
colors is array
colors[n] has y
colors[n] has colors
colors[n].colors[m] has x

x and y properties are optional

used internally

*/
export default class {

    static get isMatrix() {

        return true;
    }

    static isMatchingStructure(colors) {

        let sample = _.get(colors, '0');

        return this.testStructureSingleSample(sample);
    }

    static verifyStructure(colors) {

        return GradientDataValidatorUtil.verifyStructure(colors, this);
    }

    static testStructureSingleSample(sample) {

        let subSamples = _.get(sample, 'colors');
        let isValid = _.isObject(sample) && Array.isArray(subSamples);

        if (!isValid) {

            return false;
        }

        if (subSamples.length < 1) {

            return false;
        }

        for (let subSample of subSamples) {

            isValid = _.isObject(subSample);

            if (!isValid) {

                return false;
            }
        }

        return true;
    }

    static validateStops(colors) {

        return GradientDataValidatorUtil.addMissingStopsXY(colors);
    }
}