const EC = require('eight-colors');

const CG = require('../lib');

const data = {
    options: {},
    columns: [{
        id: 'name',
        name: `Name ${EC.bg.green('bg green')}`,
        type: 'string',
        maxWidth: 38
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
        name: `Number Format ${EC.red('red')} LongWordLongWord`,
        maxWidth: 12,
        formatter: (v, row, column) => {
            return Number(v).toFixed(2);
        }
    }, {
        id: 'value',
        name: 'Multiple Line Header Name',
        align: 'right',
        maxWidth: 12
    }, {
        id: 'unicode',
        name: 'Unicode',
        align: 'left',
        maxWidth: 15
    }],
    rows: [{
        name: 'Row 1',
        value: '1',
        number: 1,
        unicode: 'Chinese,中文'
    }, {
        name: 'Row 2',
        value: '2',
        number: 2,
        unicode: '12【标，点。】'
    }, {
        name: 'Row Name',
        value: '3',
        number: 3,
        unicode: '☆√✔×✘❤♬'
    }, {
        name: `Row Long Name ${EC.red('Red')} Long Name ${EC.red('Long')} ${EC.green('G')} Long Name ${EC.red('Red')}`,
        value: '4',
        number: 4,
        unicode: '①⑵⒊Ⅳ❺ʊəts'
    }, {
        name: `Row 5 ${EC.red('red')}`,
        value: '5',
        unicode: 'あいアイサてつろ'
    }, {
        name: `Row 6 ${EC.bg.green('bg green')}`,
        value: '6',
        number: 6,
        unicode: '㈀ㅏ㉡ㅎㅉㅃㅈㅂ'
    }, {
        name: `Row 7 ${EC.br.blue('bright blue')}`,
        value: '7',
        number: 7,
        unicode: 'АБВДшщыф'
    }, {
        name: `Row 8 ${EC.br.bg.blue('bright bg blue')}`,
        value: '8',
        number: 8,
        subs: [{
            name: 'Sub Row 1',
            value: 's1',
            number: 11,
            unicode: '汉字繁體'
        }, {
            name: 'Sub Row 2',
            value: 's2s2s2 s',
            number: 12
        }, {
            name: 'Sub Row 3',
            value: 's3 s3 s3',
            number: 13
        }]
    }]
};

CG(data);

console.log('\n3 levels:');
data.rows[7].subs[0].subs = [{
    name: 'Sub Row 21',
    value: 's21',
    number: 21
}, {
    name: 'Sub Row 22',
    value: 's22',
    number: 22
}];

CG(data);

console.log('\nrow innerBorder:');
data.rows.splice(2, 0, {
    innerBorder: true
});
CG(data);
//data.rows.splice(2, 1);

console.log('\nsort by name:');
data.options.sortField = 'name';
CG(data);

console.log('\nhide headers, no tree, sort by name:');
data.options.hideHeaders = true;
data.options.sortField = 'name';
data.rows[2].subs = null;
CG(data);

console.log('\nsort by number and asc:');
data.options.sortField = 'number';
data.options.sortAsc = true;
CG(data);

data.options.silent = true;
const lines = CG(data);
console.log(lines);
console.log(lines.join('\n'));

console.log('\nremove color:');
console.log(EC.remove(lines.join('\n')));


const gridData = {
    columns: [{
        id: 'name',
        name: 'Name',
        type: 'string'
    }, {
        id: 'value',
        name: 'Value',
        type: 'string'
    }],
    rows: [{
        name: 'Row 1 (below has border)',
        value: '1'
    }, {
        innerBorder: true
    }, {
        name: 'Row 2',
        value: '2'
    }, {
        name: 'Row 3',
        value: '3'
    }]
};
CG(gridData);
