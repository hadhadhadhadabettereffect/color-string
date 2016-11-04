import { isValidHex,
        isValidRgb,
        castInt8,
        castFloat } from "./validation";
import { intToHex,
        hexToInt,
        intToRgb,
        rgbToInt } from "./conversion";

const defineProp = Object.defineProperty;


export default function ColorString() {}

ColorString.prototype = Object.create(null, {
    // private
    _val: {
        value: -1,
        configurable: true
    },

    // color values
    red: {
        get: function() : number {
            return (this._val & RgbMask.red) >>> RgbOffset.red;
        },
        set: function(r) : number {
            r = castInt8(r);
            setValue(this, ((this._val & (~RgbMask.red)) | (r << RgbOffset.red)));
            return r;
        }
    },
    green: {
        get: function() : number {
            return (this._val & RgbMask.green) >>> RgbOffset.green;
        },
        set: function(g) : number {
            g = castInt8(g);
            setValue(this, ((this._val & (~RgbMask.green)) | (g << RgbOffset.green)));
            return g;
        }
    },
    blue: {
        get: function() : number {
            return (this._val & RgbMask.blue);
        },
        set: function(b) : number {
            b = castInt8(b);
            setValue(this, ((this._val & (~RgbMask.blue)) | b));
            return b;
        }
    },
    alpha: {
        get: function() : number {
            return (this._val >>> RgbOffset.alpha) / 255;
        },
        set: function(a) : number {
            a = castFloat(a);
            setValue(this, ((this._val & (~RgbMask.alpha)) | ((a * 255) << RgbOffset.alpha)));
            return a;
        }
    },

    // strings
    hex: {
        get: function() : string {
            return intToHex(this._val);
        },
        set: function(hex: string) {
            setHexVal(this, hex);
        }
    },
    rgb: {
        get: function() : string {
            return intToRgb(this._val, false);
        },
        set: function(rgb: string) {
            setRgbVal(this, rgb);
        }
    },
    rgba: {
        get: function() : string {
            return intToRgb(this._val, true);
        },
        set: function(rgba: string) {
            setRgbVal(this, rgba);
        }
    }
});

ColorString.prototype.constructor = ColorString;


function setValue(obj, val: number) {
    defineProp(obj, "_val", {
        value: val,
        configurable: true
    });
}

function setHexVal(obj, hex: string) {
    if (isValidHex(hex)) {
        setValue(obj, (obj._val & RgbMask.alpha) | hexToInt(hex));
    }
}

function setRgbVal(obj, rgb: string) {
    if (isValidRgb(rgb)) {
        setValue(obj, rgbToInt(rgb));
    }
}

declare var module;
module.exports = ColorString;