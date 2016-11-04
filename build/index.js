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
