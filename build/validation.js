"use strict";
/***
hex/rgb string tests
***/
function isValidHex(hex) {
    if (typeof hex != "string")
        return false;
    return /^#?(?:(\d|[a-f]){3}){1,2}$/i.test(hex);
}
exports.isValidHex = isValidHex;
function isValidRgb(rgb) {
    if (typeof rgb != "string")
        return false;
    return /^(rgba?)?\(?(\d{1,3}, ?){2}\d{1,3}(, ?(0|1)(\.\d+)?)?\)?$/.test(rgb);
}
exports.isValidRgb = isValidRgb;
/***
ensuring 0-255, 0.0-1.0
***/
function castInt8(n) {
    n |= 0;
    if (n < 0)
        n = 0;
    else if (n > 255)
        n = 255;
    return n;
}
exports.castInt8 = castInt8;
function castFloat(n) {
    n = parseFloat(n);
    if (!isFinite(n) || n < 0)
        return 0;
    if (n > 1)
        return 1;
    return n;
}
exports.castFloat = castFloat;
