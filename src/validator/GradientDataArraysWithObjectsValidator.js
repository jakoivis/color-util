
import _ from '../Utils';
import GradientDataValidatorUtil from './GradientDataValidatorUtil';

/*
Two dimensional self scaling matrix data structure
[
    [
        {},
        {}
    ],
    [
        {},
        {x: ...}
    ].y = ...
];
*/
export default class {

    static get isMatrix() {

        return true;
    }

    static isMatchingStructure(colors) {

        let sample = _.get(colors, '0');

        return this.testStructureSingleSample(sample);
    }

    static verify(colors) {

        return GradientDataValidatorUtil.verify(colors, this);
    }

    static testStructureSingleSample(sample) {

        let subSamples = sample;
        let isValid = Array.isArray(sample) && subSamples.length > 0;

        if (!isValid) {

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

        let data = colors.map((item) => {

            let newItem = {}

            if (_.isNumber(item.y)) {

                newItem.y = item.y;
            }

            newItem.colors = item;

            return newItem;
        });

        return GradientDataValidatorUtil.addMissingStopsXY(data);
    }

    static addDefaultColors(colors, defaultColor) {

        GradientDataValidatorUtil.addDefaultColorsForMatrix(colors, defaultColor, this);
    }
}