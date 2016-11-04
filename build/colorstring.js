(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ColorString = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
var validation_1 = require("./validation");
var conversion_1 = require("./conversion");
var defineProp = Object.defineProperty;
function ColorString() { }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColorString;
ColorString.prototype = Object.create(null, {
    // private
    _val: {
        value: -1,
        configurable: true
    },
    // color values
    red: {
        get: function () {
            return (this._val & 16711680 /* red */) >>> 16 /* red */;
        },
        set: function (r) {
            r = validation_1.castInt8(r);
            setValue(this, ((this._val & (~16711680 /* red */)) | (r << 16 /* red */)));
            return r;
        }
    },
    green: {
        get: function () {
            return (this._val & 65280 /* green */) >>> 8 /* green */;
        },
        set: function (g) {
            g = validation_1.castInt8(g);
            setValue(this, ((this._val & (~65280 /* green */)) | (g << 8 /* green */)));
            return g;
        }
    },
    blue: {
        get: function () {
            return (this._val & 255 /* blue */);
        },
        set: function (b) {
            b = validation_1.castInt8(b);
            setValue(this, ((this._val & (~255 /* blue */)) | b));
            return b;
        }
    },
    alpha: {
        get: function () {
            return (this._val >>> 24 /* alpha */) / 255;
        },
        set: function (a) {
            a = validation_1.castFloat(a);
            setValue(this, ((this._val & (~-16777216 /* alpha */)) | ((a * 255) << 24 /* alpha */)));
            return a;
        }
    },
    // strings
    hex: {
        get: function () {
            return conversion_1.intToHex(this._val);
        },
        set: function (hex) {
            setHexVal(this, hex);
        }
    },
    rgb: {
        get: function () {
            return conversion_1.intToRgb(this._val, false);
        },
        set: function (rgb) {
            setRgbVal(this, rgb);
        }
    },
    rgba: {
        get: function () {
            return conversion_1.intToRgb(this._val, true);
        },
        set: function (rgba) {
            setRgbVal(this, rgba);
        }
    }
});
ColorString.prototype.constructor = ColorString;
function setValue(obj, val) {
    defineProp(obj, "_val", {
        value: val,
        configurable: true
    });
}
function setHexVal(obj, hex) {
    if (validation_1.isValidHex(hex)) {
        setValue(obj, (obj._val & -16777216 /* alpha */) | conversion_1.hexToInt(hex));
    }
}
function setRgbVal(obj, rgb) {
    if (validation_1.isValidRgb(rgb)) {
        setValue(obj, conversion_1.rgbToInt(rgb));
    }
}
module.exports = ColorString;

},{"./conversion":1,"./validation":3}],3:[function(require,module,exports){
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

},{}]},{},[2])(2)
});