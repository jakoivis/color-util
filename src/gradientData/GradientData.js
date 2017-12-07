
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

export default class {

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

        let data = this.dataType.toFlat1d(this.data);

        this._addDefaultColors(data);

        return data;
    }

    get flat2d() {

        return null;
    }

    get array2d() {

        return null;
    }

    get object2d() {

        let data = this.dataType.toObject2d(this.data);

        this._addDefaultColors(data);

        return data;
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

    _addDefaultColors(data) {

        if (this.defaultColor) {

            this.dataType.addDefaultColors(data, this.defaultColor);
        }
    }

    _getDataTypeFromFirstSample(data) {

        return _.find(GRADIENT_DATA_TYPES, (dataType) => {

            return dataType.testStructure(data);
        });
    }
};