const EC = require('eight-colors');
const CG = require('console-grid');

console.log(CG);

CG({
    columns: [],
    rows: [{

        name: EC.red('red string')
    }]
});
