const Style = {
    bg: {},
    br: {
        bg: {}
    }
};

var add = (start, str, end) => {
    return `\x1b[${start}m${str}\x1b[${end}m`;
};

//https://en.wikipedia.org/wiki/ANSI_escape_code

//color
//0 - 7
const list = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

list.forEach((name, i) => {
    Style[name] = (str) => {
        return add("3" + i, str, "39");
    };
    Style.bg[name] = (str) => {
        return add("4" + i, str, "49");
    };
    Style.br[name] = (str) => {
        return add("9" + i, str, "39");
    };
    Style.br.bg[name] = (str) => {
        return add("10" + i, str, "49");
    };
});

Style.reset = (str) => {
    return add("0", str, "0");
};

Style.bold = (str) => {
    return add("1", str, "21");
};

Style.faint = (str) => {
    return add("2", str, "22");
};

Style.italic = (str) => {
    return add("3", str, "23");
};

Style.underline = (str) => {
    return add("4", str, "24");
};

Style.inverse = (str) => {
    return add("7", str, "27");
};

Style.hidden = (str) => {
    return add("8", str, "28");
};

Style.strike = (str) => {
    return add("9", str, "29");
};

//console.log(Style);

module.exports = Style;