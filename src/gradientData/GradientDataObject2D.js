
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

    static get name () {

        return 'object2d';
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

        let subSamples = _.get(sample, 'colors');
        let isValid = _.isObject(sample) && Array.isArray(subSamples);

        if (!isValid) {

            return false;
        }

        if (subSamples.length < 1) {

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

    static toObject2d(colors, defaultColor) {

        let data = GradientDataUtil.addMissingStopsXY(colors);

        GradientDataUtil.addDefaultColorsForMatrix(data, defaultColor);

        return data;
    }

    static toFlat1d(colors, defaultColor) {

        let data = this.toObject2d(colors, defaultColor);
        let result = [];

        _.forEach(data, (row) => {

            _.forEach(row.colors, (color) => {

                delete color.x;

                result.push(color);
            }); 
        });

        return result;
    }

    static toArray2d(colors, defaultColor) {

        let data = this.toObject2d(colors, defaultColor);

        return _.map(data, 'colors');
    }

    static toFlat2d(colors, defaultColor) {

        let data = this.toObject2d(colors, defaultColor);
        let result = [];

        _.forEach(data, (row) => {

            let y = row.y;

            _.forEach(row.colors, (color) => {

                color.y = y;

                result.push(color);
            });
        });

        return result;
    }
}