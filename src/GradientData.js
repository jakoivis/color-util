
import _ from './Utils';

export default new function() {

    this.DATA_STRUCTURE_OBJECTS = 'objects';
    this.DATA_STRUCTURE_OBJECTS_WITH_COLORS = 'objectsWithColors';
    this.DATA_STRUCTURE_ARRAYS_WITH_OBJECTS = 'arraysWithObjects';

    const DATA_VALIDATORS = [
        {
            structureType: this.DATA_STRUCTURE_OBJECTS,

            testStructureSample: (item) => {

                return _.isObject(item) && !_.has(item, 'colors');
            },

            validateStops: (colors) => {

                return addMissingStops(colors, 'x');
            }
        },
        {
            structureType: this.DATA_STRUCTURE_OBJECTS_WITH_COLORS,

            testStructureSample: (sample) => {

                let subSamples = _.get(sample, 'colors');
                let isValid = _.isObject(sample) && Array.isArray(subSamples);

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
        },
        {
            structureType: this.DATA_STRUCTURE_ARRAYS_WITH_OBJECTS,

            testStructureSample: (sample) => {

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
        }
    ];

    this.createValidator = (colors) => {

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

            if (validator.testStructureSample(sample)) {

                return validator;
            }
        }

        return null;
    }

    function verifyExpectedDataStructureInAllSamples(colors, validator) {

        for (let sample of colors) {

            if (!validator.testStructureSample(sample)) {

                return false;
            }
        }

        return true;
    }

    /*
internal: linear data structure
[
    {x:0},
    {x:1}
]
colors is array
colors[n] has x
colors[n] !has y
colors[n] !has colors

user interface: self scaling linear data structure, no x and y
[
    {},
    {}
]
colors is array
colors[n] !is array
colors[n] !has y
colors[n] !has x
colors[n] !has colors

internal: matrix data structure
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
colors is array
colors[n] has y
colors[n] has colors
colors[n].colors[m] has x

user interface: self scaling matrix data structure, no x and y
[
    [
        {},
        {}
    ],
    [
        {},
        {}
    ]
]
colors is array
colors[n] is array


user interface: compact matrix data structure
[
    {x:0, y: 0},
    {x:1, y: 0},
    {x:0, y: 1},
    {x:1, y: 1}
];

*/


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
    //
    //

    function findPropertyIndex(array, property, startIndex) {

        for (let i = startIndex || 0; i < array.length; i++) {

            if (_.has(array[i], property)) {

                return i;
            }
        }

        return -1;
    }

    function findLastPropertyIndex(array, property, startIndex) {

        for(let i = startIndex || array.length - 1; i > -1; i--) {

            if (_.has(array[i], property)) {

                return i;
            }
        }

        return -1;
    }

    function addMissingStops(array, property) {

        array = _.clone(array);

        if (array.length === 1) {
            // delte property and diplicate

            array[0][property] = 0;

            let lastItem = _.clone(array[0]);

            lastItem[property] = 1;

            array.push(lastItem);

            return array;
        }

        let firstProperty = findPropertyIndex(array, property);
        let lastProperty = findLastPropertyIndex(array, property);

        if (firstProperty > 0 || firstProperty === -1) {

            array[0][property] = 0;
        }

        if (lastProperty < array.length - 1) {

            array[array.length-1][property] = 1;
        }

        addMissingStopsBetweenIndexes(array, property, 0, array.length-1);

        return array;
        // let index1 = findPropertyIndex(array, property);
        // // let i = 0, index2;

        // // add property to first and last

        // if (index1 === -1) {

        //     array[0][property] = 0;
        //     array[array.length-1][property] = 1;

        //     addMissingStopsBetweenIndexes(array, property, 0, array.length-1);

        //     return array;
        // }

        // do {
        //     index1 = findPropertyIndex(array, property);


        // } while (index1 !== -1)


        // while (i < colors.length) {

        //     index2 = _findPropertyIndex(colors, 'x', index1+1);

        // }
    }

    function addMissingStopsBetweenIndexes(array, property, startIndex, endIndex) {

        let startStop = array[startIndex][property];
        let endStop = array[endIndex][property];

        let steps = endIndex - startIndex;
        let stepSize = (endStop - startStop) / steps;

        for (let i = startIndex + 1; i < endIndex; i++) {

            array[i][property] = startStop + i * stepSize;
        }
    }

    function areAllColorStopsPresent(array) {

        for (let i = 0; i < array.length; i++) {

            if (!array[i].hasOwnProperty('p') || isNaN(parseFloat(array[i].x))) {
                return false;
            }
        }

        return true;
    }

    // function areColorsInOrder(array) {

    //     let prevValue;

    //     for (let i = 0; i < array.length; i++) {

    //     }
    // }

}();