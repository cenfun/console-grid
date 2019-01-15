const style = {
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
    style[name] = (str) => {
        return add("3" + i, str, "39");
    };
    style.bg[name] = (str) => {
        return add("4" + i, str, "49");
    };
    style.br[name] = (str) => {
        return add("9" + i, str, "39");
    };
    style.br.bg[name] = (str) => {
        return add("10" + i, str, "49");
    };
});

style.reset = (str) => {
    return add("0", str, "0");
};

style.bold = (str) => {
    return add("1", str, "21");
};

style.faint = (str) => {
    return add("2", str, "22");
};

style.italic = (str) => {
    return add("3", str, "23");
};

style.underline = (str) => {
    return add("4", str, "24");
};

style.inverse = (str) => {
    return add("7", str, "27");
};

style.hidden = (str) => {
    return add("8", str, "28");
};

style.strike = (str) => {
    return add("9", str, "29");
};

//console.log(style);

module.exports = style;