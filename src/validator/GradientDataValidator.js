
import _ from '../Utils';

import GradientDataObjectsValidator from './GradientDataObjectsValidator';
import GradientDataObjectsWithColorsValidator from './GradientDataObjectsWithColorsValidator';
import GradientDataArraysWithObjectsValidator from './GradientDataArraysWithObjectsValidator';
import GradientDataObjectsMatrixValidator from './GradientDataObjectsMatrixValidator';

export default new function() {

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
    this.DATA_STRUCTURE_OBJECTS = 'objects';
    this.DATA_STRUCTURE_OBJECTS_MATRIX = 'objectsMatrix';
    this.DATA_STRUCTURE_OBJECTS_WITH_COLORS = 'objectsWithColors';
    this.DATA_STRUCTURE_ARRAYS_WITH_OBJECTS = 'arraysWithObjects';

    const DATA_VALIDATORS = [
       GradientDataObjectsValidator,
       GradientDataObjectsWithColorsValidator,
       GradientDataArraysWithObjectsValidator,
       GradientDataObjectsMatrixValidator
    ];

    this.create = (colors) => {

        if (!Array.isArray(colors) || !colors.length) {

            throw new Error('Argument should be and array with at least one item.');
        }

        let validator = getDataStructureValidatorFromFirstSample(colors);

        if (!validator) {

            throw new Error('One sample was tested and it did not match any supported data structure.');
        }

        return validator;
    };

    function getDataStructureValidatorFromFirstSample(colors) {

        let sample = _.get(colors, "0");

        for (let validator of DATA_VALIDATORS) {

            if (validator.testStructureSingleSample(sample) &&
                validator.testStructureAllSamples(colors)) {

                return validator;
            }
        }

        return null;
    }
}();