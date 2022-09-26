//https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms_(Unicode_block)
//http://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt
/*eslint-disable complexity */
const isNarrowCharacter = (character) => {
    const cp = character.codePointAt(0);
    const border = [
        0x2500,
        0x2502,
        0x250c,
        0x252c,
        0x2510,
        0x251c,
        0x253c,
        0x2524,
        0x2514,
        0x2534,
        0x2518
    ];
    if (border.indexOf(cp) !== -1) {
        return true;
    }
    return (
        (cp >= 0x20 && cp <= 0x7E)
            || cp === 0xA2
            || cp === 0xA3
            || cp === 0xA5
            || cp === 0xA6
            || cp === 0xAC
            || cp === 0xAF
            || cp === 0x20A9
            || (cp >= 0x27E6 && cp <= 0x27ED)
            || cp === 0x2985
            || cp === 0x2986
            || (cp >= 0xFF61 && cp <= 0xFFBE)
            || (cp >= 0xFFC2 && cp <= 0xFFC7)
            || (cp >= 0xFFCA && cp <= 0xFFCF)
            || (cp >= 0xFFD2 && cp <= 0xFFD7)
            || (cp >= 0xFFDA && cp <= 0xFFDC)
            || (cp >= 0xFFE8 && cp <= 0xFFEE)
    );
};
/*eslint-enable */

const getCharLength = (str) => {
    let len = 0;
    const max = str.length;
    let i = 0;
    while (i < max) {
        const c = str.charAt(i);
        if (isNarrowCharacter(c)) {
            len += 1;
        } else {
            len += 2;
        }
        i++;
    }
    return len;
};

module.exports = getCharLength;
