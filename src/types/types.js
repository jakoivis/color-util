
import Rgb from './Rgb';
import Int from './Int';
import Hex from './Hex';
import Cssrgb from './Cssrgb';
import Cssrgba from './Cssrgba';
import Hsl from './Hsl';
import Csshsl from './Csshsl';
import Csshsla from './Csshsla';
import Hsv from './Hsv';

import Intabgr from './Intabgr';
import Intrgba from './Intrgba';

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
    Intabgr,
    Intrgba
]);

export { TYPES, TYPES_ALL };