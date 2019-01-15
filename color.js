const color = {
    bg: {},
    bright: {
        bg: {}
    }
};

//0 - 7
const list = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

list.forEach((name, i) => {
    color[name] = (str) => {
        return `\x1b[3${i}m${str}\x1b[0m`;
    };
    color.bg[name] = (str) => {
        return `\x1b[4${i}m${str}\x1b[0m`;
    };
    color.bright[name] = (str) => {
        return `\x1b[9${i}m${str}\x1b[0m`;
    };
    color.bright.bg[name] = (str) => {
        return `\x1b[10${i}m${str}\x1b[0m`;
    };
});

//console.log(color);

module.exports = color;