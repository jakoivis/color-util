
import _ from '../Utils';
import GradientDataValidator from './GradientDataValidator';

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
export default class extends GradientDataValidator {

    static get structureType() {

        return 'objects'
    }

    static testStructureAllSamples(colors) {

        return _.findIndex(colors, 'y') === -1;
    }

    static testStructureSingleSample(item) {

        return _.isObject(item) && !_.has(item, 'colors');
    }

    static validateStops(colors) {

        return this.addMissingStops(colors, 'x');
    }
}