
import Continuity from './Continuity';

export default new function() {

/*
internal: linear data structure
[
    {x:0, r: 255, g: 0, b: 0, a: 255},
    {x:1, r: 255, g: 255, b: 0, a: 255}
]
colors is array
colors[n] has x

internal: self scaling linear data structure, no x and y
[
    {r: 255, g: 0, b: 0, a: 255},
    {r: 255, g: 255, b: 0, a: 255}
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
            {x:0, r: 255, g: 0, b: 0, a: 255},
            {x:1, r: 255, g: 255, b: 0, a: 255}
        ]
    },
    {
        y: 0,
        colors: [
            {x:0, r: 0, g: 0, b: 255, a: 255},
            {x:0, r: 0, g: 255, b: 255, a: 255}
        ]
    }
];
colors is array
colors[n] has y
colors[n] has colors
colors[n].colors[m] has x

internal: self scaling matrix data structure, no x and y
[
    [
        {r: 255, g: 0, b: 0, a: 255},
        {r: 255, g: 255, b: 0, a: 255}
        {r: 0, g: 0, b: 255, a: 255},
        {r: 0, g: 255, b: 255, a: 255}
    ],
    [
        {r: 255, g: 0, b: 0, a: 255},
        {r: 255, g: 255, b: 0, a: 255}
        {r: 0, g: 0, b: 255, a: 255},
        {r: 0, g: 255, b: 255, a: 255}
    ]
]
colors is array
colors[n] is array


user interface: compact matrix data structure
[
    {x:0, y: 0 r: 255, g: 0, b: 0, a: 255},
    {x:0.25, y: ..., r: 255, g: 255, b: 0, a: 255}
    {x:0.5, r: 0, g: 0, b: 255, a: 255},
    {x:1, y: 1 r: 0, g: 255, b: 255, a: 255}
];

*/

    this.createGradientFunction = (options, gradientFunctions) => {
        let type = options.type !== "linear" && options.type !== "circular" ? "linear" : options.type;
        let colors = clone(options.colors) || [];

        let isMatrix = Array.isArray(colors[0]);

        let fn;

        if (type === "linear" && !isMatrix) {
            fn = gradientFunctions.linear;

        } else if (type === "linear" && isMatrix) {
            fn = gradientFunctions.linearMatrix;

        } else if (type === "circular" && !isMatrix) {
            fn = gradientFunctions.circular;

        } else if (type === "circular" && isMatrix) {
            fn = gradientFunctions.circularMatrix;
        }

        let partialGradient = this.partialGradient;

        if (!isMatrix && colors[0].hasOwnProperty('x')) {

            partialGradient = this.partialGradientWithStops;

            colors.sort((a, b) => a.x - b.x);

        } else if (isMatrix && colors[0].colors[0].hasOwnProperty('x')) {
            partialGradient = this.partialGradientWithStops;

        }

        // let allColorStopsPresent = areAllColorStopsPresent();
        // let colorsInOrder =

        let gradientFunctionOptions = {
            colors: colors,
            cx: options.cx || 0,
            cy: options.cy || 0,
            rotation: options.rotation || 0,
            xContinuity: options.xContinuity || Continuity.stop,
            yContinuity: options.yContinuity || Continuity.stop,
            partialGradient: partialGradient
        };

        if (typeof options.debugCallback === "function") {

            options.debugCallback(gradientFunctionOptions);
        }

        return (x, y) => fn(x, y, gradientFunctionOptions);
    };

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
    this.validate  = (array) => {

        let colorsInOrder = true;
        let prevP = 0;

        for (let i = 0; i < array.length; i++) {

            if (!array[i].hasOwnProperty('p') || isNaN(parseFloat(p))) {
                continue;
            }

            let p = array[i].x;

            if (p < prevP) {
                colorsInOrder = false;
                break;

            } else {
                prevP = p;
            }
        }
    };

    function areAllColorStopsPresent(array) {

        for (let i = 0; i < array.length; i++) {

            if (!array[i].hasOwnProperty('p') || isNaN(parseFloat(array[i].x))) {
                return false;
            }
        }

        return true;
    }

    function areColorsInOrder(array) {

        let prevValue;

        for (let i = 0; i < array.length; i++) {

        }
    }

    /**
     * Calculate two items from a gradient array and a relative position of
     * the gradient between those two items in an evenly distributed
     * gradient. The resulting values can be used calculate the final color.
     *
     * @example
     * // The example position 0.25 is in the middle of the first and
     * // second colors so new 2 point gradient array contains only those
     * // first and second colors. The given absolute position 0.25 is relatively
     * // 0.5 between those two values.
     * ColorUtil.convertTo2StopGradient([0xFF0000, 0x00FF00, 0x0000FF], 0.25);
     * // output: {array: [0xFF0000, 0x00FF00], position: 0.5}
     *
     * @private
     *
     * @param {Array} array     Array of colors. Content of the array does not matter.
     * @param {number} position Position on the whole gradient.
     * @return {Object} Relative position between two items and two items from gradient array
     *                           which are the closest to the point indicated by position argument
     */
    this.partialGradient = (array, position) => {
        let lastIndex = array.length - 1;
        let itemIndex = (position * lastIndex) | 0;
        let partSize = 1 / lastIndex * 1000;
        let positionBetweenItems = ((position*1000) % partSize) / partSize;

        // partSize and position are scaled in the above calculation to fix
        // a javascrip decimal rounding problem. The issue was seen in a gradient
        // in which there were exactly 6 colors. positionBetweenItems for the first
        // color of the 4th gradient stop was rounded to 0.9999... where the correct
        // value was 0 (0.6 % 0.2 = 0.1999.... should be 0)
        // That resulted to a weird vertical line in a gradient

        return {
            array: [
                array[itemIndex],
                array[itemIndex+1] !== undefined ? array[itemIndex+1] : array[itemIndex]
            ],
            position: positionBetweenItems
        }
    };

    // this version is relying that gradient array
    // - has p values
    // - p values are in order
    // - first p value is 0 and last is 1
    // - gradient needs to be validated before calculation
    this.partialGradientWithStops = (array, position, axis) => {
        var i = 0;

        while (array[i][axis] < position) {
            i++;
        }

        var color1 = array[i-1] !== undefined ? array[i-1] : array[i];
        var color2 = array[i];

        var partSize = color2[axis] - color1[axis];

        return {
            array: [
                color1,
                color2
            ],
            position: ((position - color1[axis]) / partSize) || 0
        }
    };

    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}();