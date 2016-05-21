(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.returnExports = factory();  }
}(this, function () {
var ColorString = (function () {
    var defaultColor = 0xffffff;
    var zeros = "000000";
    var regHex = /^(\d|[a-f])*$/;
    var regRGBA = /^(\d|\,|\d\.\d)*$/;
    var regRGBAStrip = /(^rgb(a|)|\(|\)$| )/g;
    var _rgb = [];
    var _alphas = [];
    var _i = 0;
    //
    //  Validation
    //
    function isInt(n) {
        return (typeof n === "number" && n === (n | 0));
    }
    function isUint8(n) {
        return (isInt(n) && n >= 0 && n <= 255);
    }
    function warnProp(prop, val) {
        console.warn("invalid value " + val + " for RGBA." + prop);
    }
    //
    //  Value Lookup
    //
    function getColor(id, color) {
        return _rgb[id] >> (color << 3) & 0xff;
    }
    function hexString(id) {
        var str = _rgb[id].toString(16);
        return "#" + zeros.substring(str.length) + str;
    }
    function rgbaString(id) {
        return "rgba(" + getColor(id, 2 /* red */) + ',' +
            getColor(id, 1 /* green */) + ',' +
            getColor(id, 0 /* blue */) + ',' +
            _alphas[id].toPrecision(2) + ")";
    }
    //
    //  Value update
    //
    function setColor(id, color, value) {
        if (!isInt(value))
            return false;
        if (value < 0)
            value = 0;
        else if (value > 255)
            value = 255;
        _rgb[id] &= ~(0xff << (color << 3));
        _rgb[id] |= value << (color << 3);
        return true;
    }
    //
    //  ColorString
    //
    function colorstring() {
        var i = _i++;
        Object.defineProperty(this, "id", {
            value: i,
            writable: false,
            configurable: false,
            enumerable: false
        });
        _rgb[i] = defaultColor;
        _alphas[i] = 1.0;
    }
    colorstring.prototype = Object.create(null);
    Object.defineProperty(colorstring.prototype, "red", {
        get: function () {
            return getColor(this.id, 2 /* red */);
        },
        set: function (val) {
            if (!setColor(this.id, 2 /* red */, val)) {
                warnProp("red", val);
            }
            return getColor(this.id, 2 /* red */);
        }
    });
    Object.defineProperty(colorstring.prototype, "green", {
        get: function () {
            return getColor(this.id, 1 /* green */);
        },
        set: function (val) {
            if (!setColor(this.id, 1 /* green */, val)) {
                warnProp("green", val);
            }
            return getColor(this.id, 1 /* green */);
        }
    });
    Object.defineProperty(colorstring.prototype, "blue", {
        get: function () {
            return getColor(this.id, 0 /* blue */);
        },
        set: function (val) {
            if (!setColor(this.id, 0 /* blue */, val)) {
                warnProp("blue", val);
            }
            return getColor(this.id, 0 /* blue */);
        }
    });
    Object.defineProperty(colorstring.prototype, "alpha", {
        get: function () {
            return _alphas[this.id];
        },
        set: function (val) {
            if (typeof val === "number") {
                if (val < 0)
                    val = 0.0;
                else if (val > 1)
                    val = 1.0;
                _alphas[this.id] = val;
            }
            else {
                warnProp("alpha", val);
            }
            return _alphas[this.id];
        }
    });
    Object.defineProperty(colorstring.prototype, "rgba", {
        get: function () {
            return rgbaString(this.id);
        },
        set: function (str) {
            var isValid = typeof str === "string";
            if (isValid) {
                str = str.replace(regRGBAStrip, '');
                isValid = regRGBA.test(str);
                if (isValid) {
                    var arr = str.split(',');
                    isValid = arr.length === 3 || arr.length === 4;
                    if (isValid) {
                        var tmpR = parseInt(arr[0]);
                        var tmpG = parseInt(arr[1]);
                        var tmpB = parseInt(arr[2]);
                        isValid = isUint8(tmpR) && isUint8(tmpG) && isUint8(tmpB);
                        if (isValid) {
                            var id = this.id;
                            setColor(id, 2 /* red */, tmpR);
                            setColor(id, 1 /* green */, tmpG);
                            setColor(id, 0 /* blue */, tmpB);
                            if (arr.length === 4) {
                                this.alpha = parseFloat(arr[3]);
                            }
                        }
                    }
                }
            }
            if (!isValid)
                warnProp("rgba", str);
            return rgbaString(this.id);
        }
    });
    Object.defineProperty(colorstring.prototype, "hex", {
        get: function () {
            return hexString(this.id);
        },
        set: function (str) {
            var isValid = typeof str === "string";
            if (isValid) {
                if (str.charAt(0) === '#')
                    str = str.substring(1);
                if (str.length === 3)
                    str += str;
                isValid = str.length === 6 && regHex.test(str.toLowerCase());
                if (isValid) {
                    _rgb[this.id] = parseInt(str, 16);
                }
            }
            if (!isValid)
                warnProp("hex", str);
            return hexString(this.id);
        }
    });
    return colorstring;
})();

return ColorString;
}));