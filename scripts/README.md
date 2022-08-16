# console-grid

![](https://img.shields.io/npm/v/console-grid.svg)
![](https://img.shields.io/npm/dt/console-grid.svg)

## Features
* Console log a grid 
* Support Tree style rows
* Custom cell formatter
* Column align/sorting
* Multiple lines header
* Support colorful cells
* Zero Dependencies and Pure Vanilla Javascript
* Simple & Easy to use, Extremely Lightweight

## Install
```
npm i console-grid
```

## Usage

{placeholder_list} 

## Data Format Definition: [CGDF](https://github.com/cenfun/cgdf)
```js
{
    options: Object, //define grid level options
    columns: Array, //define column list and header
    rows: Array //define row list
}
```

## Default Options
```js
{
    silent: false,
    headerVisible: false,

    padding: 1,
    defaultMinWidth: 1,
    defaultMaxWidth: 50,

    sortField: '',
    sortAsc: false,

    treeId: 'name',
    treeIcon: '├ ',
    treeLink: '│ ',
    treeLast: '└ ',
    treeIndent: '  ',

    nullPlaceholder: '-',

    //border definition:
    //H: horizontal, V: vertical
    //T: top, B: bottom, L: left, R: right, C: center
    borderH: '─',
    borderV: '│',
    borderTL: '┌',
    borderTC: '┬',
    borderTR: '┐',
    borderCL: '├',
    borderCC: '┼',
    borderCR: '┤',
    borderBL: '└',
    borderBC: '┴',
    borderBR: '┘'
}
```

## Column Properties
```js
{
    id: String,
    name: String,
    type: String, //string, number
    align : String, //left(default), center, right
    minWidth: Number,
    maxWidth: Number,
    formatter: Function //custom cell formatter
}
```

## Row Properties
```js
{
    //column id key: cell value
    innerBorder: Boolean,
    subs: Array //sub rows
}
```

## CHANGELOG
[CHANGELOG.md](CHANGELOG.md)


## Markdown Grid
[markdown-grid](https://github.com/cenfun/markdown-grid) - Markdown Grid Generator