declare const enum RgbOffset {
    alpha = 24,
    red = 16,
    green = 8,
    blue = 0
}

declare const enum RgbMask {
    alpha = -1 << 24,
    red = alpha >>> 8,
    green = red >>> 8,
    blue = green >>> 8
}

declare const enum HexString {
    fourChars = 0xffff,
    fiveChars = 0xfffff
}