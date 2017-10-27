
import _ from '../Utils';
import GradientDataValidator from './GradientDataValidator';
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
export default class extends GradientDataValidator {

    static get structureType() {

        return 'objectsMatrix';
    }

    static testStructureAllSamples(colors) {

        return _.findIndex(colors, 'y') > -1;
    }

    static testStructureSingleSample(item) {

        return _.isObject(item) && !_.has(item, 'colors');
    }

    static validateStops(colors) {

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

        return this.addMissingStopsXY(data);
    }
}