var test = require("tape");
var ColorString = require("./build");

/***
helpers
***/
function rand(from, to) {
    return from + Math.round((Math.random() * (to - from)));
}
// get hex value of an int btw 0-255
// pads leading zero if needed for length == 2
function channelHex(n) {
    if (n < 16) return '0' + n.toString(16);
    return n.toString(16);
}


/***
tests
***/
test("colorstring", function(t) {
    t.plan(4);

    // default rgb values == 255
    // random values btw 0-254 for testing
    var r = rand(0, 254),
        g = rand(0, 254),
        b = rand(0, 254);
    var color = new ColorString();

    t.test("defaults", function(tt) {
        tt.plan(4);

        tt.equal(color.alpha, 1, "default alpha is 1");
        tt.equal(color.hex, "#ffffff", "default color is white");
        tt.ok(color.red === 255 &&
                color.blue === 255 &&
                color.green === 255,
            "defaults rgb values are 255");

        var v = rand(0, 10000);
        color._val = v;
        tt.notEqual(color._val, v, "_val property is not directly editable");
    });

    t.test("setting rgb values", function(tt) {
        tt.plan(10);

        color.red = r;
        color.green = g;
        color.blue = b;

        tt.equal(color.red, r, "red property can be set with valid value");
        tt.equal(color.green, g, "green property can be set with valid value");
        tt.equal(color.blue, b, "blue property can be set with valid value");

        ++color.red;
        tt.equal(color.red, r + 1, "color values can be set with shorthand assigment operators");

        color.red -= (r * 3);
        tt.equal(color.red, 0, "setting a value < 0 will set it to zero");

        color.green *= 300;
        tt.equal(color.green, 255, "color values capped at 255");

        color.blue = b + 1.2;
        tt.equal(color.blue, b + 1, "color values set with floats will be cast as ints");

        color.red = '' + r;
        tt.equal(color.red, r, "colors can be set with number strings");

        color.green = null;
        tt.equal(color.green, 0, "setting a color to null will set it to 0");

        color.blue = Infinity;
        tt.equal(color.blue, 0, "setting a color to a non-finite number will set it to zero");
    });

    t.test("hex string", function(tt) {
        tt.plan(7);

        tt.notEqual(color.rgb, "rgb(255, 255, 255)",
            "confirming rgb to check for change");

        color.hex = "#ffffff";

        tt.ok(color.red === 255 && color.blue === 255 && color.green === 255,
            "setting hex value updates rgb props");
        tt.equal(color.rgb, "rgb(255, 255, 255)",
            "setting hex updates rgb string");

        color.red = r;
        tt.equal(color.hex.substring(1, 3), channelHex(r),
            "setting red prop updates red portion of hex string");
        tt.equal(color.hex.substring(3), "ffff",
            "setting red prop doesn't affect green/blue values");

        color.green = g;
        tt.equal(color.hex.substring(3, 5), channelHex(g),
            "setting green prop updates green portion of hex string");

        color.blue = b;
        tt.equal(color.hex.substring(5), channelHex(b),
            "setting blue prop updates blue portion of hex string");
    });


    t.test("rgb string", function(tt) {
        tt.plan(8);

        tt.notEqual(color.rgb, "rgb(255, 255, 255)",
            "confirming rgb to check for change");

        color.red = color.green = color.blue = 255;
        tt.equal(color.rgb, "rgb(255, 255, 255)",
            "rgb string string updated when color values change");
        tt.equal(color.hex, "#ffffff",
            "confirming hex to check for change");

        let str = "rgb(" + [r, g, b].join(", ") + ")";
        color.rgb = str;
        tt.equal(color.rgb, str, "rgb value can be set with a valid string");
        tt.equal(color.red, r, "setting rgb string updates red value");
        tt.equal(color.green, g, "setting rgb string updates green value");
        tt.equal(color.blue, b, "setting rgb string updates blue value");

        tt.equal(color.hex, "#" + channelHex(r) + channelHex(g) + channelHex(b),
            "setting rgb value updates hex string");
    });
});