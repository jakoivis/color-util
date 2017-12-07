
import _ from '../Utils';
import GradientDataUtil from './GradientDataUtil';

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

    static get name () {

        return 'array2d';
    }

    static get matrix() {

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

        let subSamples = sample;
        let isValid = Array.isArray(sample) && subSamples.length > 0;

        if (!isValid) {

            return false;
        }

        for (let i = 0; i < subSamples.length; i++) {

            let subSample = subSamples[i];

            isValid = _.isObject(subSample);

            if (!isValid) {

                return false;
            }
        }

        return true;
    }

    static toObject2d(colors) {

        let data = colors.map((item) => {

            let newItem = {}

            if (_.isNumber(item.y)) {

                newItem.y = item.y;
            }

            newItem.colors = item;

            return newItem;
        });

        return GradientDataUtil.addMissingStopsXY(data);
    }

    static addDefaultColors(colors, defaultColor) {

        GradientDataUtil.addDefaultColorsForMatrix(colors, defaultColor);
    }
}