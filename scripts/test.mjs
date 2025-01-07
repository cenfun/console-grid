import EC from 'eight-colors';
import chalk from 'chalk';
import CG from 'console-grid';

console.log(CG);

CG({
    columns: [],
    rows: [{

        name: EC.red('red string')
    }]
});


console.log(EC.magenta('test truncated color'));

const cg = new CG.ConsoleGrid({});

const str = '12345 no color no color end';
console.log(cg.getCharByWidth(str, 30));
console.log(cg.getCharByWidth(str, 20));
console.log(cg.getCharByWidth(str, 10));
console.log(cg.getCharByWidth(str, 2));

const colorStr = `12345${EC.bg.cyan('67890')} ${EC.red('red string')} ${EC.green('green string')} end`;
console.log(cg.getCharByWidth(colorStr, 40));
console.log(cg.getCharByWidth(colorStr, 30));
console.log(cg.getCharByWidth(colorStr, 20));
console.log(cg.getCharByWidth(colorStr, 10));

const bgStr = EC.br.bg.white(`1234567890 ${EC.green('green string')} ${EC.red('red string')} end`);
console.log(cg.getCharByWidth(bgStr, 40));
console.log(cg.getCharByWidth(bgStr, 30));
console.log(cg.getCharByWidth(bgStr, 20));
console.log(cg.getCharByWidth(bgStr, 10));

const hexColor = chalk.hex('#ff0000');

CG({
    columns: [{
        id: 'name'
    }],
    rows: [{
        name: `long string ${EC.green('inner green string')} ${EC.red('long red string long red string')}`,
        maxWidth: 50
    }, {
        name: EC.bg.yellow(`long string ${EC.green('inner green string')} ${EC.red('long red string long red string')}`),
        maxWidth: 50
    }, {
        name: hexColor('Hex Colored Text')
    }]
});
