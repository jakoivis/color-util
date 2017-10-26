
import _ from './Utils';

export default new function() {

    this.DATA_STRUCTURE_OBJECTS = 'objects';
    this.DATA_STRUCTURE_OBJECTS_MATRIX = 'objectsMatrix';
    this.DATA_STRUCTURE_OBJECTS_WITH_COLORS = 'objectsWithColors';
    this.DATA_STRUCTURE_ARRAYS_WITH_OBJECTS = 'arraysWithObjects';

    const DATA_VALIDATORS = [
        /*

        one dimensional data structure for normal gradients
        [
            {x:0},
            {x:1}
        ]
        colors is array
        colors[n] has x
        colors[n] !has y
        colors[n] !has colors

        x properties are optional

        used internally

        */
        {
            structureType: this.DATA_STRUCTURE_OBJECTS,

            testStructureAllSamples: (colors) => {

                return _.findIndex(colors, 'y') === -1;
            },

            testStructureSingleSample: (item) => {

                return _.isObject(item) && !_.has(item, 'colors');
            },

            validateStops: (colors) => {

                return addMissingStops(colors, 'x');
            }
        },

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
        colors is array
        colors[n] has y
        colors[n] has colors
        colors[n].colors[m] has x

        x and y properties are optional

        used internally

        */
        {
            structureType: this.DATA_STRUCTURE_OBJECTS_WITH_COLORS,

            testStructureAllSamples: (colors) => {

                return true;
            },

            testStructureSingleSample: (sample) => {

                let subSamples = _.get(sample, 'colors');
                let isValid = _.isObject(sample) && Array.isArray(subSamples);

                if (!isValid) {

                    return false;
                }

                if (subSamples.length < 1) {

                    return false;
                }

                for (let subSample of subSamples) {

                    isValid = _.isObject(subSample);

                    if (!isValid) {

                        return false;
                    }
                }

                return true;
            },

            validateStops: (colors) => {

                let data = addMissingStops(colors, 'y');

                for (var i = 0; i < data.length; i++) {

                    data[i].colors = addMissingStops(data[i].colors, 'x');
                }

                return data;
            }
        },

        /*
        two dimensional self scaling data structure for matrix gradients
        [
            [
                {},
                {}
            ],
            [
                {},
                {x: ...}
            ].y = ...
        ]
        colors is array
        colors[n] is array

        x & y are optional
        */
        {
            structureType: this.DATA_STRUCTURE_ARRAYS_WITH_OBJECTS,

            testStructureAllSamples: (colors) => {

                return true;
            },

            testStructureSingleSample: (sample) => {

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
            },

            validateStops: (colors) => {

                let data = colors.map((item) => {

                    let newItem = {}

                    if (_.isNumber(item.y)) {

                        newItem.y = item.y;
                    }

                    newItem.colors = item;

                    return newItem;
                });

                data = addMissingStops(data, 'y');

                for (var i = 0; i < data.length; i++) {

                    data[i].colors = addMissingStops(data[i].colors, 'x');
                }

                return data;
            }
        },

        /*
        TODO: user interface: compact matrix data structure
        [
            {x:0, y: 0},
            {x:1, y: 0},
            {x:0, y: 1},
            {x:1, y: 1}
        ];

            {y: 0}
            {}
            {y: 0.5}
            {y: 1}
        */
       {
            structureType: this.DATA_STRUCTURE_OBJECTS_MATRIX,

            testStructureAllSamples: (colors) => {

                return _.findIndex(colors, 'y') > -1;
            },

            testStructureSingleSample: (item) => {

                return _.isObject(item) && !_.has(item, 'colors');
            },

            validateStops: (colors) => {

                colors = _.clone(colors);

                let data = [];

                for (let item of colors) {

                    if (_.isNumber(item.y)) {

                        let existing = _.find(data, ['y', item.y]);

                        if (existing) {

                            existing.colors.push(item);

                            continue;

                        } else {

                            let y = item.y;

                            delete item.y;

                            data.push({
                                y: y,
                                colors: [item]
                            });
                        }

                    } else {

                        data.push(item)
                    }
                };


                data = addMissingStops(data, 'y');

                return data;
            }
        },
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

    function addMissingStops(array, property) {

        array = _.clone(array);

        // handle case for colors with 1 point

        if (array.length === 1) {

            delete array[0][property];

            array.push(_.clone(array[0]));
        }

        // always set first and last indexes to 0 and 1

        let firstProperty = _.findIndex(array, property);
        let firstItem = array[0];
        let newItem;

        if (firstProperty > 0 || firstProperty === -1) {

            firstItem[property] = 0;

        } else if (firstItem[property] !== 0) {

            newItem = _.clone(firstItem);
            newItem[property] = 0;

            array.unshift(newItem);
        }

        let lastProperty = _.findLastIndex(array, property);
        let lastItem = array[array.length-1];

        if (lastProperty < array.length - 1) {

            lastItem[property] = 1;

        } else if (lastItem[property] !== 1) {

            newItem = _.clone(lastItem);
            newItem[property] = 1;

            array.push(newItem);
        }

        // set the rest in between

        let start = 0, end = 0;

        while (end > -1) {

            start = _.findIndex(array, property, start);
            end = _.findIndex(array, property, start + 1);

            if (end > -1) {

                addMissingStopsBetweenIndexes(array, property, start, end);
            }

            start = end;
        }

        return array;
    }

    function addMissingStopsBetweenIndexes(array, property, startIndex, endIndex) {

        let startStop = array[startIndex][property];
        let endStop = array[endIndex][property];

        let steps = endIndex - startIndex;
        let stepSize = (endStop - startStop) / steps;

        for (let i = 1; i < steps; i++) {

            array[startIndex + i][property] = startStop + i * stepSize;
        }
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