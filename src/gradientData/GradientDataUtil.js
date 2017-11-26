
import _ from '../Utils';

export default class {

    static addDefaultColorsForMatrix(colors, defaultColor) {

        let keys = Object.keys(defaultColor);

        _.forEach(colors, (item) => {

            _.forEach(item.colors, (color) => {

                _.forEach(keys, (key) => {

                    if (!_.has(color, key)) {

                        color[key] = defaultColor[key];
                    }
                });
            });
        });
    }

    static addDefaultColors(colors, defaultColor) {

        let keys = Object.keys(defaultColor);

        _.forEach(colors, (color) => {

            _.forEach(keys, (key) => {

                if (!_.has(color, key)) {

                    color[key] = defaultColor[key];
                }
            });
        });
    }

    static verify(colors, validatorClass) {

        let isValidStructure = this._verifyExpectedDataStructureInAllSamples(colors, validatorClass);

        if (!isValidStructure) {

            throw new Error('Color data structure is not consistent / valid');
        }

        return true;
    }

    static _verifyExpectedDataStructureInAllSamples(colors, validatorClass) {

        for (let i = 0; i < colors.length; i++) {

            let sample = colors[i];

            if (!validatorClass.testStructureSingleSample(sample)) {

                return false;
            }
        }

        return true;
    }

    static addMissingStopsXY(data) {

        data = this.addMissingStops(data, 'y');

        _.forEach(data, (item) => {

            item.colors = this.addMissingStops(item.colors, 'x');
        });

        return data;
    }

    static addMissingStops(array, property) {

        array = _.clone(array);

        // handle case for colors with 1 point

        if (array.length === 1) {

            delete array[0][property];

            array.push(_.clone(array[0]));
        }

        // always set first and last indexes to 0 and 1

        let firstProperty = _.findPropertyIndex(array, property);
        let firstItem = array[0];
        let newItem;

        if (firstProperty > 0 || firstProperty === -1) {

            firstItem[property] = 0;

        } else if (firstItem[property] !== 0) {

            newItem = _.clone(firstItem);
            newItem[property] = 0;

            array.unshift(newItem);
        }

        let lastProperty = _.findLastPropertyIndex(array, property);
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

            start = _.findPropertyIndex(array, property, start);
            end = _.findPropertyIndex(array, property, start + 1);

            if (end > -1) {

                this._addStopsBetweenIndexes(array, property, start, end);
            }

            start = end;
        }

        return array;
    }

    static _addStopsBetweenIndexes(array, property, startIndex, endIndex) {

        let startStop = array[startIndex][property];
        let endStop = array[endIndex][property];

        let steps = endIndex - startIndex;
        let stepSize = (endStop - startStop) / steps;

        for (let i = 1; i < steps; i++) {

            array[startIndex + i][property] = startStop + i * stepSize;
        }
    }
}