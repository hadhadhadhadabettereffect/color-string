// ColorString from colorstring.js
// setText defined in index.html

var backgroundColor = new ColorString();

var channels = document.getElementById("channels");
var alpha = document.getElementById("alpha");
var hex = document.getElementById("hex");
var rgba = document.getElementById("rgba");
var swatchStyle = document.getElementById("swatch").style;

channels.addEventListener("change", updateChannel, false);
alpha.addEventListener("change", updateAlpha, false)

function updateOutputValues() {
    setText(hex, backgroundColor.hex);
    setText(rgba, backgroundColor.rgba);
    swatchStyle.background = backgroundColor.rgba;
}

function updateAlpha(event) {
    backgroundColor.alpha = parseFloat(alpha.value);
    requestAnimationFrame(updateOutputValues);
}

function updateChannel(event) {
    backgroundColor[event.target.id] = parseInt(event.target.value);
    requestAnimationFrame(updateOutputValues);
}
