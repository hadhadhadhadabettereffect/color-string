/***
hex/rgb string tests
***/
export function isValidHex(hex: string) : boolean {
    if (typeof hex != "string") return false;
    return /^#?(?:(\d|[a-f]){3}){1,2}$/i.test(hex);
}

export function isValidRgb(rgb: string) : boolean {
    if (typeof rgb != "string") return false;
    return /^(rgba?)?\(?(\d{1,3}, ?){2}\d{1,3}(, ?(0|1)(\.\d+)?)?\)?$/.test(rgb);
}

/***
ensuring 0-255, 0.0-1.0
***/
export function castInt8(n) : number {
    n |= 0;
    if (n < 0) n = 0;
    else if (n > 255) n = 255;
    return n;
}

export function castFloat(n) : number {
    n = parseFloat(n);
    if (!isFinite(n) || n < 0) return 0;
    if (n > 1) return 1;
    return n;
}

