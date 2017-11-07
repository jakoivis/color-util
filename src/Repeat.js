
/**
 * @class Repeat
 * @private
 */
export default {

    none: (position) => {
        return position;
    },

    /**
     * Stop gradient at the edge color
     *
     * @memberof ColorUtil.repeat
     */
    stop: (position) => {
        return position < 0 ? 0 : position > 1 ? 1 : position;
    },

    /**
     * Repeat gradient with the same pattern
     *
     * @memberof ColorUtil.repeat
     */
    repeat: (position) => {
        return position < 0 ? 1 + position % 1 : position > 1 ? position % 1 : position;
    }
};