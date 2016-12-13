/***
hex
***/
export function intToHex(rgba: number) : string {
    rgba &= (~RgbMask.alpha);
    if (rgba > HexString.fiveChars) return "#" + (rgba & (~RgbMask.alpha)).toString(16);
    if (rgba > HexString.fourChars) return "#0" + (rgba & (~RgbMask.alpha)).toString(16);
    return "#00" + (rgba & (~RgbMask.alpha)).toString(16);
}

export function hexToInt(hex: string) : number {
    if (hex.charAt(0) == '#') hex = hex.substring(1);
    if (hex.length === 3) hex = hex[0] + hex[0] +
                                hex[1] + hex[1] +
                                hex[2] + hex[2];
    return parseInt(hex, 16);
}

/***
rgb
***/
function rgbString(val: number) : string {
    return [((val & RgbMask.red) >>> RgbOffset.red),
            ((val & RgbMask.green) >>> RgbOffset.green),
            (val & RgbMask.blue)].join(", ");
}

export function rgbToInt(rgb: string) : number {
    let arr = (rgb.replace(/[^\d,\.]/g, '')).split(',');
    let val = 0 | ((parseInt(arr[0]) << RgbOffset.red) |
                    (parseInt(arr[1]) << RgbOffset.green) |
                    (parseInt(arr[2])));
    if (arr.length === 4) {
        val |= ((255 * parseFloat(arr[3])) << RgbOffset.alpha);
    }
    return val;
}

export function intToRgb(val: number, alpha: boolean) : string {
    if (alpha) {
        return "rgba(" + rgbString(val) + ", " +
            ((val >>> RgbOffset.alpha) / 255).toFixed(2) + ")";
    }
    return "rgb(" + rgbString(val) + ")";
}