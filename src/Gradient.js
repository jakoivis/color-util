
export default new function() {

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
    this.twoStopGradient = (array, position) => {
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
    this.validate = (array) => {

        let colorsInOrder = true;
        let prevP = 0;

        for (let i = 0; i < array.length; i++) {

            if (!array[i].hasOwnProperty('p') || isNaN(parseFloat(p))) {
                continue;
            }

            let p = array[i].p;

            if (p < prevP) {
                colorsInOrder = false;
                break;

            } else {
                prevP = p;
            }
        }

    //     var allHasP = true;
    //     var noneHasP = true;
    //     var color;

    //     for (var i = 0; i < array.length; i++) {

    //         color = array[i];

    //         if (!color.hasOwnProperty('p')) {
    //             allHasP = false;
    //         }

    //         if (color.hasOwnProperty('p')) {
    //             noneHasP = false;
    //         }
    //     }

    //     array.sort(function(a, b) {
    //         return a.p - b.p;
    //     });
    };

    // this version is relying that gradient array
    // - has p values
    // - p values are in order
    // - first p value is 0 and last is 1
    // - gradient needs to be validated before calculation
    this.twoPointGradientWithStops = (array, position) => {
        var i = 0;

        while (array[i].p < position) {
            i++;
        }

        var color1 = array[i-1] !== undefined ? array[i-1] : array[i];
        var color2 = array[i];

        var partSize = color2.p - color1.p;

        return {
            array: [
                color1,
                color2
            ],
            position: ((position - color1.p) / partSize) || 0
        }
    };
}();