
import _ from '../Utils';

import GradientData1DFlat from './GradientData1DFlat';
import GradientData2DObject from './GradientData2DObject';
import GradientData2DArray from './GradientData2DArray';
import GradientData2DFlat from './GradientData2DFlat';

const GRADIENT_DATA_TYPES = [
    GradientData1DFlat,
    GradientData2DObject,
    GradientData2DArray,
    GradientData2DFlat
];

export default class {

    static get types() {

        return GRADIENT_DATA_TYPES;
    }

    static create(colors) {

        if (!Array.isArray(colors) || !colors.length) {

            throw new Error('Argument should be and array with at least one item.');
        }

        let dataType = this._getDataTypeFromFirstSample(colors);

        if (!dataType) {

            throw new Error('One sample was tested and it did not match any supported data structures.');
        }

        return dataType;
    }

    static _getDataTypeFromFirstSample(colors) {

        return _.find(GRADIENT_DATA_TYPES, (dataType) => {

            return dataType.testStructure(colors);
        });
    }
};