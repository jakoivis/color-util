
import Rgb from './Rgb';
import Int from './Int';
import Hex from './Hex';
import Cssrgb from './Cssrgb';
import Cssrgba from './Cssrgba';
import Hsl from './Hsl';
import Csshsl from './Csshsl';
import Csshsla from './Csshsla';
import Hsv from './Hsv';

import Int32ABGR from './Int32ABGR';
import Int32RGBA from './Int32RGBA';

const TYPES = [
    Rgb,
    Int,
    Hex,
    Hsl,
    Hsv,
    Cssrgba,
    Cssrgb,
    Csshsla,
    Csshsl
];

const TYPES_ALL = TYPES.concat([
    Int32ABGR,
    Int32RGBA
]);

export { TYPES, TYPES_ALL };