
import _ from '../Utils';

import GradientDataObjects from './GradientDataObjects';
import GradientDataObjectsWithColors from './GradientDataObjectsWithColors';
import GradientDataArraysWithObjects from './GradientDataArraysWithObjects';
import GradientDataObjectsMatrix from './GradientDataObjectsMatrix';

const DATA_VALIDATORS = [
   GradientDataObjects,
   GradientDataObjectsWithColors,
   GradientDataArraysWithObjects,
   GradientDataObjectsMatrix
];

export default class {

    static get validators() {

        return DATA_VALIDATORS;
    }

    static create(colors) {

        if (!Array.isArray(colors) || !colors.length) {

            throw new Error('Argument should be and array with at least one item.');
        }

        let validator = this._getValidatorFromFirstSample(colors);

        if (!validator) {

            throw new Error('One sample was tested and it did not match any supported data structure.');
        }

        return validator;
    }

    static _getValidatorFromFirstSample(colors) {

        for (let validator of DATA_VALIDATORS) {

            if (validator.isMatchingStructure(colors)) {

                return validator;
            }
        }

        return null;
    }
};