
import _ from '../Utils';

import GradientDataObjects from './GradientDataObjects';
import GradientDataObjectsWithColors from './GradientDataObjectsWithColors';
import GradientDataArraysWithObjects from './GradientDataArraysWithObjects';
import GradientDataObjectsMatrix from './GradientDataObjectsMatrix';

const GRADIENT_DATA_TYPES = [
   GradientDataObjects,
   GradientDataObjectsWithColors,
   GradientDataArraysWithObjects,
   GradientDataObjectsMatrix
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

            throw new Error('One sample was tested and it did not match any supported data structure.');
        }

        return dataType;
    }

    static _getDataTypeFromFirstSample(colors) {

        for (let dataType of GRADIENT_DATA_TYPES) {

            if (dataType.testStructure(colors)) {

                return dataType;
            }
        }

        return null;
    }
};