
import _ from '../Utils';

import GradientDataFlat1D from './GradientDataFlat1D';
import GradientDataObject2D from './GradientDataObject2D';
import GradientDataArray2D from './GradientDataArray2D';
import GradientDataFlat2D from './GradientDataFlat2D';

const GRADIENT_DATA_TYPES = [
    GradientDataFlat1D,
    GradientDataObject2D,
    GradientDataArray2D,
    GradientDataFlat2D
];

export default class GradientData {

    static get types() {

        return GRADIENT_DATA_TYPES;
    }

    get typeName() {

        return this.dataType.name;
    }

    get matrix() {

        return this.dataType.matrix;
    }

    get flat1d() {

        return this.dataType.toFlat1d(this.data, this.defaultColor);
    }

    get flat2d() {

        let data = this.dataType.toFlat2d(this.data, this.defaultColor);

        return data;
    }

    get array2d() {

        if (!_.has(this.dataType, 'toArray2d')) {

            let data = this.dataType.toObject2d(this.data, this.defaultColor);
            let gradientData = new GradientData(data, this.defaultColor);

            return gradientData.array2d;
        }

        return this.dataType.toArray2d(this.data, this.defaultColor);
    }

    get object2d() {

        return this.dataType.toObject2d(this.data, this.defaultColor);
    }

    constructor(data, defaultColor) {

        if (!Array.isArray(data) || !data.length) {

            throw new Error('Argument should be and array with at least one item.');
        }

        this.dataType = this._getDataTypeFromFirstSample(data);

        if (!this.dataType) {

            throw new Error('One sample was tested and it did not match any supported data structures.');
        }

        this.data = data;
        this.defaultColor = defaultColor;
    }

    verify() {

        return this.dataType.verify(this.data);
    }

    _getDataTypeFromFirstSample(data) {

        return _.find(GRADIENT_DATA_TYPES, (dataType) => {

            return dataType.testStructure(data);
        });
    }
};