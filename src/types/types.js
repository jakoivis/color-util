
import Rgb from './Rgb';
import Int from './Int';
import Hex from './Hex';
import RgbString from './RgbString';
import RgbaString from './RgbaString';
import Hsl from './Hsl';
import HslString from './HslString';
import HslaString from './HslaString';
import Hsv from './Hsv';

import Int32ABGR from './Int32ABGR';
import Int32RGBA from './Int32RGBA';

const TYPES = [
    Rgb,
    Int,
    Hex,
    Hsl,
    Hsv,
    RgbaString,
    RgbString,
    HslaString,
    HslString
];

const TYPES_ALL = TYPES.concat([
    Int32ABGR,
    Int32RGBA
]);

const TYPES_BY_NAME = createNameList(TYPES);

function createNameList(types) {

    let list = {};

    for (let type of types) {

        list[type.name] = type;
    }

    return list;
}

export { TYPES, TYPES_BY_NAME, TYPES_ALL };