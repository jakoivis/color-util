
import _ from '../Utils.js';

const getCanvasGradient = (type, options) => {

    if (_.isObject(options)) {

        return type.gradient(options);

    } else if (typeof options === 'function') {

        return options;
    }

    return null;
}

const getCanvasTarget = (target) => {

    if (target instanceof HTMLCanvasElement) {

        return target;

    } else if (typeof target === 'string') {

        let element = document.querySelector(target);

        return getCanvasTarget(element);
    }

    return null;
}

export { getCanvasGradient, getCanvasTarget };