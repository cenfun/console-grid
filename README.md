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

```js  
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
```js  
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
```js  
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
```js  
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
```js  
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
            }, {
                "name": "Sub Group 1 Sub Row 2",
                "value": "7",
                "number": 7
            }]
        }, {
            "name": "Sub Row 1",
            "value": "8",
            "number": 8
        }, {
            "name": "Sub Row 2",
            "value": "9",
            "number": 9
        }]
    }]
});  

┌────────────────────────────────┬───────┬──────┬────────┐
│ Name                           │ Value │ Null │ Number │
├────────────────────────────────┼───────┼──────┼────────┤
│ Row 1                          │ 1     │ -    │   1.00 │
│ Row Name                       │ 2     │ -    │   2.00 │
│ Row Long Name Long Name Lon... │ 3     │ -    │   3.00 │
│ Group                          │ 4     │ -    │   4.00 │
│ ├ Sub Group 1                  │ 5     │ -    │   5.00 │
│ │ ├ Sub Group 1 Sub Row 1      │ 6     │ -    │   6.00 │
│ │ └ Sub Group 1 Sub Row 2      │ 7     │ -    │   7.00 │
│ ├ Sub Row 1                    │ 8     │ -    │   8.00 │
│ └ Sub Row 2                    │ 9     │ -    │   9.00 │
└────────────────────────────────┴───────┴──────┴────────┘  
```  
## With inner border:  
```js  
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
        "value": 50,
        "subs": [{
            "name": "Sub 21"
        }, {
            "name": ""
        }, {
            "name": "Sub 22"
        }]
    }]
});  

┌──────────┬───────┐
│ Name     │ Value │
├──────────┼───────┤
│ Total    │ 80    │
├──────────┼───────┤
│ Item 1   │ 30    │
│ Item 2   │ 50    │
│ ├ Sub 21 │ -     │
│ │        │ -     │
│ └ Sub 22 │ -     │
└──────────┴───────┘  
```  
## With column sorting:  
```js  
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
## With color (using [eight-colors](https://github.com/cenfun/eight-colors)):  
```js  
const CG = require("console-grid");
const EC = require("eight-colors");
const data = {
    columns: ['Name', EC.cyan('Color Text'), EC.bg.cyan('Color Background')],
    rows: [
        ['Red', EC.red('red text'), EC.bg.red('red bg')],
        ['Green', EC.green('green text'), EC.bg.green('green text')]
    ]
};
CG(data);  
```  
![](/scripts/screenshots.png)  
```js  
// silent output and remove color
data.options = {
    silent: true
};
const lines = CG(data);
const withoutColor = EC.remove(lines.join(os.EOL));
console.log(withoutColor);  

┌───────┬────────────┬──────────────────┐
│ Name  │ Color Text │ Color Background │
├───────┼────────────┼──────────────────┤
│ Red   │ red text   │ red bg           │
│ Green │ green text │ green text       │
└───────┴────────────┴──────────────────┘  
```  
## With CSV (using [papaparse](https://github.com/mholt/PapaParse)):  
```js  
const CG = require("console-grid");
const Papa = require("papaparse");
const csvString = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`;
const json = Papa.parse(csvString);
const data = {
    columns: json.data.shift(),
    rows: json.data
};
CG(data);  

┌──────────┬──────────┬──────────┬──────────┐
│ Column 1 │ Column 2 │ Column 3 │ Column 4 │
├──────────┼──────────┼──────────┼──────────┤
│ 1-1      │ 1-2      │ 1-3      │ 1-4      │
│ 2-1      │ 2-2      │ 2-3      │ 2-4      │
│ 3-1      │ 3-2      │ 3-3      │ 3-4      │
│ 4        │ 5        │ 6        │ 7        │
└──────────┴──────────┴──────────┴──────────┘  
```  
## With special character:  
- Unresolved: some special characters has unexpected width, especially on different output terminals (depends on fonts)  
```js  
const CG = require("console-grid");
CG({
    "columns": ["Special", "Character"],
    "rows": [
        ["Chinese,中文", "12【标，点。】"],
        ["あいアイサてつろ", "☆√✔×✘❤♬"],
        ["㈀ㅏ㉡ㅎㅉㅃㅈㅂ", "①⑵⒊Ⅳ❺ʊəts"],
        ["汉字繁體", "АБВДшщыф"],
        ["Emoji👋👩⌚✅", "↑↓▲▼○●♡♥"]
    ]
});  

┌───────────────────┬──────────────────┐
│ Special           │ Character        │
├───────────────────┼──────────────────┤
│ Chinese,中文      │ 12【标，点。】   │
│ あいアイサてつろ  │ ☆√✔×✘❤♬   │
│ ㈀ㅏ㉡ㅎㅉㅃㅈㅂ  │ ①⑵⒊Ⅳ❺ʊəts │
│ 汉字繁體          │ АБВДшщыф │
│ Emoji👋👩⌚✅ │ ↑↓▲▼○●♡♥ │
└───────────────────┴──────────────────┘  
```  
## With custom getCharLength (using [eastasianwidth](https://github.com/komagata/eastasianwidth)):  
- Unresolved: still not perfect in special character width  
```js  
const CG = require("console-grid");
const eaw = require("eastasianwidth");
CG({
    options: {
        getCharLength: (char) => {
            return eaw.length(char);
        }
    },
    columns: ["Special", "Character"],
    rows: [
        ["Chinese,中文", "12【标，点。】"],
        ["あいアイサてつろ", "☆√✔×✘❤♬"],
        ["㈀ㅏ㉡ㅎㅉㅃㅈㅂ", "①⑵⒊Ⅳ❺ʊəts"],
        ["汉字繁體", "АБВДшщыф"],
        ["Emoji👋👩⌚✅", "↑↓▲▼○●♡♥"]
    ]
});  

┌──────────────────┬──────────────────┐
│ Special          │ Character        │
├──────────────────┼──────────────────┤
│ Chinese,中文     │ 12【标，点。】   │
│ あいアイサてつろ │ ☆√✔×✘❤♬      │
│ ㈀ㅏ㉡ㅎㅉㅃㅈㅂ │ ①⑵⒊Ⅳ❺ʊəts   │
│ 汉字繁體         │ АБВДшщыф │
│ Emoji👋👩⌚✅        │ ↑↓▲▼○●♡♥ │
└──────────────────┴──────────────────┘  
``` 

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
    sortIcon: '*',

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
    borderBR: '┘',

    getCharLength: defaultGetCharLength
    
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