# console-grid
console log a grid with tree

![npm](https://img.shields.io/npm/v/console-grid.svg)
![npm](https://img.shields.io/npm/dt/console-grid.svg)
![David](https://img.shields.io/david/cenfun/console-grid.svg)

# Install
```
npm install console-grid
```
# Preview
```
┌ ────────────────────────────────────── ┬ ─────── ┬ ──── ┬ ──────────── ┬ ──────────── ┐
│                                        │         │      │       Number │     Multiple │
│                                        │         │      │   Format red │  Line Header │
│ Name bg green                          │ Value   │ Null │ LongWordL... │         Name │
├ ────────────────────────────────────── ┼ ─────── ┼ ──── ┼ ──────────── ┼ ──────────── ┤
│ |- Row 1                               │ 1       │ -    │         1.00 │            1 │
│ |- Row 2                               │ 2       │ -    │         2.00 │            2 │
│ |- Row Name                            │ 3       │ -    │         3.00 │            3 │
│ |- Row Long Name Red Long Name Long... │ 4       │ -    │         4.00 │            4 │
│ |- Row 5 red                           │ 5       │ -    │         5.00 │            5 │
│ |- Row 6 bg green                      │ 6       │ -    │         6.00 │            6 │
│ |- Row 7 bright blue                   │ 7       │ -    │         7.00 │            7 │
│ |- Row 8 bright bg blue                │ 8       │ -    │         8.00 │            8 │
│    |- Sub Row 1                        │ s1      │ -    │        11.00 │           s1 │
│    |- Sub Row 2                        │ s2      │ -    │        12.00 │           s2 │
│    |- Sub Row 3                        │ s3 s... │ -    │        13.00 │     s3 s3 s3 │
└ ────────────────────────────────────── ┴ ─────── ┴ ──── ┴ ──────────── ┴ ──────────── ┘
```

# Usage
```js
var Grid = require("console-grid");
var grid = new Grid();
var data = {
    option: {
        sortField: "name"
    },
    columns: [{
        id: "name",
        name: "Name",
        type: "string",
        maxWidth: 38
    }, {
        id: "value",
        name: "Value",
        type: "string",
        maxWidth: 7
    }],
    rows: [{
        name: "Row 1",
        value: "1"
    }, {
        name: "Row 2",
        value: "2"
        subs: [{
            name: "Sub Row 1",
            value: "s1"
        }, {
            name: "Sub Row 2",
            value: "s2"
        }]
    }]
};
grid.render(data);
```

# Default Option
```js
option = {
    border: {
        h: '─',
        v: '│',
        top_left: '┌',
        top_mid: '┬',
        top_right: '┐',
        mid_left: '├',
        mid_mid: '┼',
        mid_right: '┤',
        bottom_left: '└',
        bottom_mid: '┴',
        bottom_right: '┘'
    },

    hideHeaders: false,

    padding: 1,
    defaultMaxWidth: 30,

    sortField: "",
    sortAsc: false,

    treeId: "name",
    treeIcon: "|- ",
    treeIndent: "   ",
    defaultTreeFormatter: this.defaultTreeFormatter,
    defaultFormatter: this.defaultFormatter,
    nullPlaceholder: "-"
}
console.log(grid.defaultOption());
```

# Column properties
```js
column = {
    id: String,
    name: String,
    type: String, //string, number
    align : String, //left, right
    maxWidth: Number,
    formatter: Function
}
```

# Row properties
```js
row = {
    //column id key: cell value
    subs: Array //sub rows
}
```

# Example test
[test.js](test/test.js)
```
npm run test
```