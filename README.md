# console-grid

![](https://img.shields.io/npm/v/console-grid.svg)
![](https://img.shields.io/npm/dt/console-grid.svg)

## Features
* Console log a grid 
* Support tree style rows
* Custom cell formatter
* Column align/sorting
* Multiple lines header
* Support colorful cells

## Install
```
npm i console-grid
```

## Usage

```sh  
const CG = require("console-grid");
CG({
    "columns": ["", "Name", "Value"],
    "rows": [
        [1, "Tom", "Value 1"],
        [2, "Jerry", "Value 2"]
    ]
});  

┌───┬───────┬─────────┐
│   │ Name  │ Value   │
├───┼───────┼─────────┤
│ 1 │ Tom   │ Value 1 │
│ 2 │ Jerry │ Value 2 │
└───┴───────┴─────────┘  
```  
## Without header:  
```sh  
const CG = require("console-grid");
CG({
    "options": {
        "headerVisible": false
    },
    "columns": ["", "Name", "Value"],
    "rows": [
        [1, "Tom", "Value 1"],
        [2, "Jerry", "Value 2"]
    ]
});  

┌───┬───────┬─────────┐
│ 1 │ Tom   │ Value 1 │
│ 2 │ Jerry │ Value 2 │
└───┴───────┴─────────┘  
```  
## With column minWidth and maxWidth (Multiple Line Header):  
```sh  
const CG = require("console-grid");
CG({
    "columns": ["", {
        "name": "Name",
        "minWidth": 15
    }, {
        "name": "Value",
        "maxWidth": 20
    }, {
        "name": "Multiple Line Header",
        "maxWidth": 15
    }],
    "rows": [
        [1, "Hello", "Long Text Value", "Long Text Value"],
        [2, "Hello There", "Long Text Value Long Text Value", "Long Text Value Long Text Value"]
    ]
});  

┌───┬─────────────────┬──────────────────────┬─────────────────┐
│   │                 │                      │ Multiple Line   │
│   │ Name            │ Value                │ Header          │
├───┼─────────────────┼──────────────────────┼─────────────────┤
│ 1 │ Hello           │ Long Text Value      │ Long Text Value │
│ 2 │ Hello There     │ Long Text Value L... │ Long Text Va... │
└───┴─────────────────┴──────────────────────┴─────────────────┘  
```  
## With column align and padding:  
```sh  
const CG = require("console-grid");
CG({
    "options": {
        "padding": 2
    },
    "columns": [{
        "id": "default",
        "name": "Default"
    }, {
        "id": "left",
        "name": "Left",
        "align": "left"
    }, {
        "id": "center",
        "name": "Center",
        "align": "center"
    }, {
        "id": "right",
        "name": "Right",
        "align": "right"
    }, {
        "id": "right",
        "name": "Multiple Line Right",
        "maxWidth": 12,
        "align": "right"
    }],
    "rows": [{
        "default": "Cell",
        "left": "Markdown",
        "center": "Start",
        "right": "123.0"
    }, {
        "default": "Content",
        "left": "Grid",
        "center": "Complete",
        "right": "8.1"
    }]
});  

┌───────────┬────────────┬────────────┬─────────┬────────────────┐
│           │            │            │         │      Multiple  │
│  Default  │  Left      │   Center   │  Right  │    Line Right  │
├───────────┼────────────┼────────────┼─────────┼────────────────┤
│  Cell     │  Markdown  │    Start   │  123.0  │         123.0  │
│  Content  │  Grid      │  Complete  │    8.1  │           8.1  │
└───────────┴────────────┴────────────┴─────────┴────────────────┘  
```  
## With tree rows (nullPlaceholder/number align and formatter):  
```sh  
const CG = require("console-grid");
CG({
    "columns": [{
        "id": "name",
        "name": "Name",
        "type": "string",
        "maxWidth": 30
    }, {
        "id": "value",
        "name": "Value",
        "type": "string",
        "maxWidth": 7
    }, {
        "id": "null",
        "name": "Null"
    }, {
        "id": "number",
        "type": "number",
        "name": "Number",
        "maxWidth": 12
    }],
    "rows": [{
        "name": "Row 1",
        "value": "1",
        "number": 1
    }, {
        "name": "Row Name",
        "value": "2",
        "number": 2
    }, {
        "name": "Row Long Name Long Name Long Name",
        "value": "3",
        "number": 3
    }, {
        "name": "Group",
        "value": "4",
        "number": 4,
        "subs": [{
            "name": "Sub Group 1",
            "value": "5",
            "number": 5,
            "subs": [{
                "name": "Sub Group 1 Sub Row 1",
                "value": "6",
                "number": 6
            }]
        }, {
            "name": "Sub Row 1",
            "value": "7",
            "number": 7
        }, {
            "name": "Sub Row 2",
            "value": "8",
            "number": 8
        }]
    }]
});  

┌────────────────────────────────┬───────┬──────┬────────┐
│ Name                           │ Value │ Null │ Number │
├────────────────────────────────┼───────┼──────┼────────┤
│ ├ Row 1                        │ 1     │ -    │   1.00 │
│ ├ Row Name                     │ 2     │ -    │   2.00 │
│ ├ Row Long Name Long Name L... │ 3     │ -    │   3.00 │
│ └ Group                        │ 4     │ -    │   4.00 │
│   ├ Sub Group 1                │ 5     │ -    │   5.00 │
│   │ └ Sub Group 1 Sub Row 1    │ 6     │ -    │   6.00 │
│   ├ Sub Row 1                  │ 7     │ -    │   7.00 │
│   └ Sub Row 2                  │ 8     │ -    │   8.00 │
└────────────────────────────────┴───────┴──────┴────────┘  
```  
## With inner border:  
```sh  
const CG = require("console-grid");
CG({
    "columns": [{
        "id": "name",
        "name": "Name"
    }, {
        "id": "value",
        "name": "Value"
    }],
    "rows": [{
        "name": "Total",
        "value": 80
    }, {
        "innerBorder": true
    }, {
        "name": "Item 1",
        "value": 30
    }, {
        "name": "Item 2",
        "value": 50
    }]
});  

┌────────┬───────┐
│ Name   │ Value │
├────────┼───────┤
│ Total  │ 80    │
├────────┼───────┤
│ Item 1 │ 30    │
│ Item 2 │ 50    │
└────────┴───────┘  
```  
## With column sorting:  
```sh  
const CG = require("console-grid");
CG({
    "options": {
        "sortField": "value",
        "sortAsc": false
    },
    "columns": [{
        "id": "name",
        "name": "Name"
    }, {
        "id": "value",
        "name": "Value",
        "type": "number"
    }],
    "rows": [{
        "name": "Item 1",
        "value": 80
    }, {
        "name": "Item 2",
        "value": 30
    }, {
        "name": "Item 3",
        "value": 50
    }]
});  

┌────────┬────────┐
│ Name   │ Value* │
├────────┼────────┤
│ Item 1 │     80 │
│ Item 3 │     50 │
│ Item 2 │     30 │
└────────┴────────┘  
```  
## With special character:  
```sh  
const CG = require("console-grid");
CG({
    "columns": ["Special", "Character"],
    "rows": [
        ["Chinese,中文", "12【标，点。】"],
        ["あいアイサてつろ", "☆√✔×✘❤♬"],
        ["㈀ㅏ㉡ㅎㅉㅃㅈㅂ", "①⑵⒊Ⅳ❺ʊəts"],
        ["汉字繁體", "АБВДшщыф"]
    ]
});  

┌──────────────────┬──────────────────┐
│ Special          │ Character        │
├──────────────────┼──────────────────┤
│ Chinese,中文     │ 12【标，点。】   │
│ あいアイサてつろ │ ☆√✔×✘❤♬   │
│ ㈀ㅏ㉡ㅎㅉㅃㅈㅂ │ ①⑵⒊Ⅳ❺ʊəts │
│ 汉字繁體         │ АБВДшщыф │
└──────────────────┴──────────────────┘  
```  
- Unresolved: some special characters has unexpected width, especially on different output terminals (depends on fonts)  
## With colorful cells (using [eight-colors](https://github.com/cenfun/eight-colors)):  
```sh  
const EC = require("eight-colors");
const CG = require("console-grid");
const data = {
    columns: ['Name', EC.cyan('Color Text'), EC.bg.cyan('Color Background')],
    rows: [
        ['Red', EC.red('red text'), EC.bg.red('red bg')],
        ['Green', EC.green('green text'), EC.bg.green('green text')]
    ]
};
CG(data);


// silent output and remove color
data.options = {
    silent: true
};
const lines = CG(data);
console.log(EC.remove(lines.join('\n')));  
```  
![](/scripts/screenshots.png) 

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