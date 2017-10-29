
import _ from '../Utils';

import GradientDataObjectsValidator from './GradientDataObjectsValidator';
import GradientDataObjectsWithColorsValidator from './GradientDataObjectsWithColorsValidator';
import GradientDataArraysWithObjectsValidator from './GradientDataArraysWithObjectsValidator';
import GradientDataObjectsMatrixValidator from './GradientDataObjectsMatrixValidator';

const DATA_VALIDATORS = [
   GradientDataObjectsValidator,
   GradientDataObjectsWithColorsValidator,
   GradientDataArraysWithObjectsValidator,
   GradientDataObjectsMatrixValidator
];

export default class {

    // var colorsInOrder = ...
    // var allHavePValues = ...
    //
    // if (colorsInOrder && allHavePValues)
    //      return as is
    // else if (colorsInOrder && !allHavePValues)
    //      addMissingPValues
    // else if (!colorsInOrder && allHavePValues)
    //      sortByPValue
    // else
    //      unable to validate
    //

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