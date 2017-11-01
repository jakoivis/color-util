
import _ from './Utils';
import Repeat from './Repeat';
import GradientDataValidator from './validator/GradientDataValidator';

export default new function() {

    const PI2 = Math.PI * 2;

    // TODO: document
    this.createGradient = (options, typeOptions={}) => {

        options = options || {};

        let type = _.includes(['linear', 'circular'], options.type) ? options.type : 'linear';
        let verifyStructure = _.get(options, 'verifyStructure', false);
        let validateStops = _.get(options, 'validateStops', true);
        let addDefaultColors = _.get(options, 'addDefaultColors', true);
        let onValidationComplete = options.onValidationComplete || _.noop;
        let colors = _.clone(options.colors);
        let fn = null;

        let validator = GradientDataValidator.create(colors);

        if (verifyStructure) {

            validator.verifyStructure(colors);
        }

        if (validateStops) {

            colors = validator.validateStops(colors);
        }

        if (addDefaultColors) {

            let defaultColor = options.defaultColor || typeOptions.defaultColor;

            if (!defaultColor) {

                throw new Error('Default color should be specified');
            }

            validator.addDefaultColors(colors, defaultColor)
        }

        onValidationComplete(colors);

        if (!validator.isMatrix && type === 'linear') {

            fn = this.linearGradient;

        } else if (validator.isMatrix && type === 'linear') {

            fn = this.linearMatrixGradient;

        } else if (!validator.isMatrix && type === 'circular') {

            fn = this.circularGradient;

        } else if (validator.isMatrix && type === 'circular') {

            fn = this.circularMatrixGradient;

        } else {

            return null;
        }

        let gradientFunctionOptions = {
            colors: colors,
            cx: options.cx || 0,
            cy: options.cy || 0,
            rotation: options.rotation || 0,
            xRepeat: options.xRepeat || Repeat.repeat,
            yRepeat: options.yRepeat || Repeat.repeat,
            gradientPointColor: typeOptions.gradientPointColor
        };

        return (x, y) => fn(x, y, gradientFunctionOptions);
    };

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

        let item1 = array[itemIndex];
        let item2 = array[itemIndex+1] !== undefined ? array[itemIndex+1] : item1;

        return {
            item1: item1,
            item2: item2,
            position: positionBetweenItems
        }
    };

    /**
     * Calculate two items from a gradient array and a relative position of
     * the gradient between those two items in a gradient whichs has stop colors
     * The resulting values can be used calculate the final color.
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
     * @param {Array} array      Array of colors. Array should have colors stops on x or y axis.
     * @param {number} position  Position on the whole gradient.
     * @return {Object} Relative position between two items and two items from gradient array
     *                           which are the closest to the point indicated by position argument
     */
    this.partialGradientWithStops = (array, position, axis) => {

        var i = 0;

        while (array[i][axis] < position) {
            i++;
        }

        var item1 = array[i-1] !== undefined ? array[i-1] : array[i];
        var item2 = array[i];
        var partSize = item2[axis] - item1[axis];

        return {
            item1: item1,
            item2: item2,
            position: ((position - item1[axis]) / partSize) || 0
        }
    };

    /**
     * Get color from gradient. Calculation is done in
     * rgb object notation so colors should be converted to object notation.
     *
     * @example
     * let gradient = ColorUtil.convert([0xFF0000, 0x00FF00, 0x0000FF], ColorUtil.int.toRgb);
     * ColorUtil.rgb.gradientColor(gradient, 0.5);
     * // output: {r: 0, g: 255, b: 0, a: 255}
     *
     * @memberof ColorUtil.rgb
     *
     * @param {Array} colors    Array of colors. Colors should be in rgb object notation.
     * @param {number} x        Horizontal position on the gradient. Value in range 0-1.
     * @param {number} y        Vertical position on the gradient. Value in range 0-1.
     * @param {number} cx       Horizontal position of rotation center. Value in range 0-1.
     * @param {number} cy       Vertical position of rotation center. Value in range 0-1.
     * @param {function} [xRepeat=Repeat.stop]  Repeat function
     * @return {Object} rgb object
     */
    this.linearGradient = (x, y, options) => {
        let radian = options.rotation * PI2;
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);
        let dx = x - options.cx;
        let dy = y - options.cy;

        x = options.xRepeat(options.cx + dx * cos - dy * sin);

        let parts = this.partialGradientWithStops(options.colors, x, 'x');

        return options.gradientPointColor(
            parts.item1,
            parts.item2,
            parts.position);
    };

        /**
     * Get color from matrix. Calculation is done in
     * rgb object notation so colors should be converted to object notation.
     *
     * @example
     * let matrix = ColorUtil.convert([[0xFF0000, 0x00FF00], [0x0000FF]], ColorUtil.int.toRgb);
     * ColorUtil.rgb.matrixColor(matrix, 0.5, 0.5);
     * // output: {r: 63.75, g: 63.75, b: 127.5, a: 255}
     *
     * @memberof ColorUtil.rgb
     *
     * @param {Array} matrix    Array of gradient color arrays. Colors should be in rgb object notation.
     * @param {number} x        Horizontal position on the gradient. Value in range 0-1.
     * @param {number} y        Vertical position on the gradient. Value in range 0-1.
     * @param {number} cx       Horizontal position of rotation center. Value in range 0-1.
     * @param {number} cy       Vertical position of rotation center. Value in range 0-1.
     * @param {function} [xRepeat=Repeat.stop]  Repeat function
     * @param {function} [yRepeat=Repeat.stop]  Repeat function
     * @return {Object} rgb object
     */
    this.linearMatrixGradient = (x, y, options) => {

        let radian = options.rotation * PI2;
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);
        let dx = x - options.cx;
        let dy = y - options.cy;

        x = options.xRepeat(options.cx + dx * cos - dy * sin);
        y = options.yRepeat(options.cy + dx * sin + dy * cos);

        // get gradients and y position between them
        let gradients = this.partialGradientWithStops(options.colors, y, 'y');
        let parts1 = this.partialGradientWithStops(gradients.item1.colors, x, 'x');
        let parts2 = this.partialGradientWithStops(gradients.item2.colors, x, 'x');

        let color1 = options.gradientPointColor(parts1.item1, parts1.item2, parts1.position);
        let color2 = options.gradientPointColor(parts2.item1, parts2.item2, parts2.position);

        return options.gradientPointColor(color1, color2, gradients.position);
    };

    /**
     * Get color from circle gradient. Calculation is done in
     * rgb object notation so colors should be converted to object notation.
     *
     * @example
     * let colors = ColorUtil.rgb.hueColors();
     * ColorUtil.rgb.circleGradientColor(colors, 0.1, 0.1);
     * // output: {r: 0, g: 63.74999999999994, b: 255, a: 255}
     *
     * // keep center the same but rotatio 180 degrees
     * ColorUtil.rgb.circleGradientColor(colors, 0.1, 0.1, 0.5, 0.5, 0.5);
     * // output: {r: 255, g: 191.25, b: 0, a: 255}
     *
     * @memberof ColorUtil.rgb
     *
     * @param      {Array}   colors      Array of colors. Colors should be in rgb object notation.
     * @param      {number}  x           Horizontal position on the gradient. Value in range 0-1.
     * @param      {number}  y           Vertical position on the gradient. Value in range 0-1.
     * @param      {number}  cx          Horizontal position of center point. Value in range 0-1.
     * @param      {number}  cy          Vertical position of center point. Value in range 0-1.
     * @param      {number}  rotation    Rotation of the gradient. Value in range 0-1.
     * @param      {function}  [xRepeat=Repeat.repeat]  Repeat function
     * @return     {Object}  rgb object
     */
    this.circularGradient = (x, y, options) => {

        let angle = options.xRepeat((Math.atan2(options.cy - y, options.cx - x) + Math.PI) / PI2 - options.rotation);
        let parts = this.partialGradientWithStops(options.colors, angle, 'x');

        return options.gradientPointColor(parts.item1, parts.item2, parts.position);
    }

    /**
     * Get color from circle matrix. Calculation is done in
     * rgb object notation so colors should be converted to object notation.
     *
     * @example
     * // center is white, outer edge has hue colors
     * let matrix = [[{r:255, g: 255, b: 255, a: 255}], ColorUtil.rgb.hueColors()];
     * ColorUtil.rgb.circleMatrixColor(matrix, 0.1, 0.1);
     * // output: {r: 110.75021663794428, g: 146.81266247845818, b: 255, a: 255}
     *
     * @memberof ColorUtil.rgb
     *
     * @param      {Array}   matrix      Matrix of colors. Colors should be in rgb object notation.
     * @param      {number}  x           Horizontal position on the gradient. Value in range 0-1.
     * @param      {number}  y           Vertical position on the gradient. Value in range 0-1.
     * @param      {number}  cx          Horizontal position of center. Value in range 0-1.
     * @param      {number}  cy          Vertical position of center. Value in range 0-1.
     * @param      {number}  rotation    Rotation of the gradient. Value in range 0-1.
     * @param      {function}  [xRepeat=Repeat.repeat]  Repeat function
     * @param      {function}  [yRepeat=Repeat.repeat]  Repeat function
     * @return     {Object}  rgb object
     */
    this.circularMatrixGradient = (x, y, options) => {
        let cx = options.cx;
        let cy = options.cy;
        let dx = cx - x;
        let dy = cy - y;
        let distance = options.yRepeat(Math.sqrt(dx * dx + dy * dy));
        let angle = options.xRepeat((Math.atan2(cy - y, cx - x) + Math.PI) / PI2 - options.rotation);

        // get gradients and y position between them
        let gradients = this.partialGradientWithStops(options.colors, distance, 'y');
        let parts1 = this.partialGradientWithStops(gradients.item1.colors, angle, 'x');
        let parts2 = this.partialGradientWithStops(gradients.item2.colors, angle, 'x');

        let color1 = options.gradientPointColor(parts1.item1, parts1.item2, parts1.position);
        let color2 = options.gradientPointColor(parts2.item1, parts2.item2, parts2.position);

        return options.gradientPointColor(color1, color2, gradients.position);
    }

}();