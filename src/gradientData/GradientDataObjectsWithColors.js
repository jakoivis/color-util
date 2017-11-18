
import _ from '../Utils';
import GradientDataUtil from './GradientDataUtil';
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
*/
export default class {

    static get isMatrix() {

        return true;
    }

    static testStructure(colors) {

        let sample = _.get(colors, '0');

        return this.testStructureSingleSample(sample);
    }

    static verify(colors) {

        return GradientDataUtil.verify(colors, this);
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

    static validate(colors) {

        return GradientDataUtil.addMissingStopsXY(colors);
    }

    static addDefaultColors(colors, defaultColor) {

        GradientDataUtil.addDefaultColorsForMatrix(colors, defaultColor);
    }
}