"use strict";
/***
hex
***/
function intToHex(rgba) {
    rgba &= (~-16777216 /* alpha */);
    if (rgba > 1048575 /* fiveChars */)
        return "#" + (rgba & (~-16777216 /* alpha */)).toString(16);
    if (rgba > 65535 /* fourChars */)
        return "#0" + (rgba & (~-16777216 /* alpha */)).toString(16);
    return "#00" + (rgba & (~-16777216 /* alpha */)).toString(16);
}
exports.intToHex = intToHex;
function hexToInt(hex) {
    if (hex.charAt(0) == '#')
        hex = hex.substring(1);
    if (hex.length === 3)
        hex += hex;
    return parseInt(hex, 16);
}
exports.hexToInt = hexToInt;
/***
rgb
***/
function rgbString(val) {
    return [((val & 16711680 /* red */) >>> 16 /* red */),
        ((val & 65280 /* green */) >>> 8 /* green */),
        (val & 255 /* blue */)].join(", ");
}
function rgbToInt(rgb) {
    var arr = (rgb.replace(/[^\d,\.]/g, '')).split(',');
    var val = 0 | ((parseInt(arr[0]) << 16 /* red */) |
        (parseInt(arr[1]) << 8 /* green */) |
        (parseInt(arr[2])));
    if (arr.length === 4) {
        val |= ((255 * parseFloat(arr[3])) << 24 /* alpha */);
    }
    return val;
}
exports.rgbToInt = rgbToInt;
function intToRgb(val, alpha) {
    if (alpha) {
        return "rgba(" + rgbString(val) + ", " +
            ((val >>> 24 /* alpha */) / 255).toFixed(2) + ")";
    }
    return "rgb(" + rgbString(val) + ")";
}
exports.intToRgb = intToRgb;
