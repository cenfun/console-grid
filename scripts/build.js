const fs = require('fs');
const path = require('path');
const os = require('os');
const EC = require('eight-colors');
const beautify = require('js-beautify');

const CG = require('../lib');

const hasOwn = function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};

const replace = function(str, obj, defaultValue) {
    str = `${str}`;
    if (!obj) {
        return str;
    }
    str = str.replace(/\{([^}{]+)\}/g, function(match, key) {
        if (!hasOwn(obj, key)) {
            if (typeof defaultValue !== 'undefined') {
                return defaultValue;
            }
            return match;
        }
        let val = obj[key];
        if (typeof val === 'function') {
            val = val(obj, key);
        }
        if (typeof val === 'undefined') {
            val = '';
        }
        return val;
    });
    return str;
};

const readFileContentSync = function(filePath) {
    let content = null;
    const isExists = fs.existsSync(filePath);
    if (isExists) {
        content = fs.readFileSync(filePath);
        if (Buffer.isBuffer(content)) {
            content = content.toString('utf8');
        }
    }
    return content;
};

const writeFileContentSync = function(filePath, content, force = true) {
    const isExists = fs.existsSync(filePath);
    if (force || isExists) {
        const p = path.dirname(filePath);
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p, {
                recursive: true
            });
        }
        fs.writeFileSync(filePath, content);
        return true;
    }
    return false;
};


const replaceFile = function(templatePath, savePath, callback) {
    const content = readFileContentSync(templatePath);
    const editedContent = callback(content);
    if (editedContent === content) {
        return content;
    }
    writeFileContentSync(savePath, editedContent);
    return editedContent;
};

const start = () => {

    const newLine = `  ${os.EOL}`;

    const list = [{
        data: {
            columns: ['', 'Name', 'Value'],
            rows: [
                [1, 'Tom', 'Value 1'],
                [2, 'Jerry', 'Value 2']
            ]
        }
    }, {
        title: 'Without header:',
        data: {
            options: {
                headerVisible: false
            },
            columns: ['', 'Name', 'Value'],
            rows: [
                [1, 'Tom', 'Value 1'],
                [2, 'Jerry', 'Value 2']
            ]
        }
    }, {
        title: 'With column minWidth and maxWidth (Multiple Line Header):',
        data: {
            columns: ['', {
                name: 'Name',
                minWidth: 15
            }, {
                name: 'Value',
                maxWidth: 20
            }, {
                name: 'Multiple Line Header',
                maxWidth: 15
            }],
            rows: [
                [1, 'Hello', 'Long Text Value', 'Long Text Value'],
                [2, 'Hello There', 'Long Text Value Long Text Value', 'Long Text Value Long Text Value']
            ]
        }
    }, {
        title: 'With column align and padding:',
        data: {
            options: {
                padding: 2
            },
            columns: [{
                id: 'default',
                name: 'Default'
            }, {
                id: 'left',
                name: 'Left',
                align: 'left'
            }, {
                id: 'center',
                name: 'Center',
                align: 'center'
            }, {
                id: 'right',
                name: 'Right',
                align: 'right'
            }, {
                id: 'right',
                name: 'Multiple Line Right',
                maxWidth: 12,
                align: 'right'
            }],
            rows: [{
                default: 'Cell',
                left: 'Markdown',
                center: 'Start',
                right: '123.0'
            }, {
                default: 'Content',
                left: 'Grid',
                center: 'Complete',
                right: '8.1'
            }]
        }
    }, {
        title: 'With tree rows (nullPlaceholder/number align and formatter):',
        data: {
            columns: [{
                id: 'name',
                name: 'Name',
                type: 'string',
                maxWidth: 30
            }, {
                id: 'value',
                name: 'Value',
                type: 'string',
                maxWidth: 7
            }, {
                id: 'null',
                name: 'Null'
            }, {
                id: 'number',
                type: 'number',
                name: 'Number',
                maxWidth: 12,
                formatter: (v, row, column) => {
                    return Number(v).toFixed(2);
                }
            }],
            rows: [{
                name: 'Row 1',
                value: '1',
                number: 1
            }, {
                name: 'Row Name',
                value: '2',
                number: 2
            }, {
                name: 'Row Long Name Long Name Long Name',
                value: '3',
                number: 3
            }, {
                name: 'Group',
                value: '4',
                number: 4,
                subs: [{
                    name: 'Sub Group 1',
                    value: '5',
                    number: 5,
                    subs: [{
                        name: 'Sub Group 1 Sub Row 1',
                        value: '6',
                        number: 6
                    }]
                }, {
                    name: 'Sub Row 1',
                    value: '7',
                    number: 7
                }, {
                    name: 'Sub Row 2',
                    value: '8',
                    number: 8
                }]
            }]
        }
    }, {
        title: 'With inner border:',
        data: {
            columns: [{
                id: 'name',
                name: 'Name'
            }, {
                id: 'value',
                name: 'Value'
            }],
            rows: [{
                name: 'Total',
                value: 80
            }, {
                innerBorder: true
            }, {
                name: 'Item 1',
                value: 30
            }, {
                name: 'Item 2',
                value: 50
            }]
        }
    }, {
        title: 'With column sorting:',
        data: {
            options: {
                sortField: 'value',
                sortAsc: false
            },
            columns: [{
                id: 'name',
                name: 'Name'
            }, {
                id: 'value',
                name: 'Value',
                type: 'number'
            }],
            rows: [{
                name: 'Item 1',
                value: 80
            }, {
                name: 'Item 2',
                value: 30
            }, {
                name: 'Item 3',
                value: 50
            }]
        }
    }, {
        title: 'With special character:',
        data: {
            columns: ['Special', 'Character'],
            rows: [
                ['Chinese,中文', '12【标，点。】'],
                ['あいアイサてつろ', '☆√✔×✘❤♬'],
                ['㈀ㅏ㉡ㅎㅉㅃㅈㅂ', '①⑵⒊Ⅳ❺ʊəts'],
                ['汉字繁體', 'АБВДшщыф']
            ]
        },
        comments: '- Unresolved: Unexpected width of some special characters, especially on different output terminals'
    }].map((item) => {

        const codes = ['const CG = require("console-grid");'];
        codes.push(`CG(${JSON.stringify(item.data)});`);
        codes.push('');

        const code = codes.join(os.EOL);

        const cg = CG(item.data).join(os.EOL);

        const str = beautify.js(code, {}) + newLine + os.EOL + cg;

        //console.log(str);

        const ls = [
            '```sh',
            str,
            '```'
        ];

        if (item.title) {
            ls.unshift(`## ${item.title}`);
        }

        if (item.comments) {
            ls.push(item.comments);
        }

        return ls.join(newLine);
    });

    //colorful cells
    const data = {
        columns: ['Name', EC.cyan('Color Text'), EC.bg.cyan('Color Background')],
        rows: [
            ['Red', EC.red('red text'), EC.bg.red('red bg')],
            ['Green', EC.green('green text'), EC.bg.green('green text')]
        ]
    };
    const codes = [
        'const EC = require("eight-colors");',
        'const CG = require("console-grid");'
    ];
    codes.push(`CG({
        columns: ['Name', EC.cyan('Color Text'), EC.bg.cyan('Color Background')],
        rows: [
            ['Red', EC.red('red text'), EC.bg.red('red bg')],
            ['Green', EC.green('green text'), EC.bg.green('green text')]
        ]
    });`);
    codes.push('');

    const code = codes.join(os.EOL);

    CG(data).join(os.EOL);

    const str = beautify.js(code, {});
    const ls = [
        '## With colorful cells (using [eight-colors](https://github.com/cenfun/eight-colors)):',
        '```sh',
        str,
        '```'
    ];
    list.push(ls.join(newLine));


    const templatePath = path.resolve(__dirname, 'README.md');
    const savePath = path.resolve(__dirname, '../README.md');

    replaceFile(templatePath, savePath, (content) => {
        return replace(content, {
            placeholder_list: list.join(newLine)
        });
    });

    console.log('generated README.md');


};

start();
