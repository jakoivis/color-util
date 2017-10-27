
import _ from './Utils';
import GradientDataObjectsValidator from './validator/GradientDataObjectsValidator';
import GradientDataObjectsWithColorsValidator from './validator/GradientDataObjectsWithColorsValidator';
import GradientDataArraysWithObjectsValidator from './validator/GradientDataArraysWithObjectsValidator';
import GradientDataObjectsMatrixValidator from './validator/GradientDataObjectsMatrixValidator';

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

    this.verifyStructure = (colors, validator) => {

        let isValidStructure = verifyExpectedDataStructureInAllSamples(colors, validator);

        if (!isValidStructure) {

            throw new Error('Color data structure is not consistent / valid');
        }

        return true;
    };

    this.validateStops = (colors, validator) => {

        return validator.validateStops(colors);
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

    function verifyExpectedDataStructureInAllSamples(colors, validator) {

        for (let sample of colors) {

            if (!validator.testStructureSingleSample(sample)) {

                return false;
            }
        }

        return true;
    }

    // function areAllColorStopsPresent(array) {

    //     for (let i = 0; i < array.length; i++) {

    //         if (!array[i].hasOwnProperty('p') || isNaN(parseFloat(array[i].x))) {
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    // function areColorsInOrder(array) {

    //     let prevValue;

    //     for (let i = 0; i < array.length; i++) {

    //     }
    // }

}();