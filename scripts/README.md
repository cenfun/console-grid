# console-grid

* Console log a grid with tree style rows
* Color cells
* Customize cell formatter
* Column sorting
* Multiple lines header
* Zero Dependencies and Pure Vanilla Javascript
* Simple & Easy to use, Extremely Lightweight

![](https://img.shields.io/npm/v/console-grid.svg)
![](https://img.shields.io/npm/dt/console-grid.svg)

# Install
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

    silent: false,
    hideHeaders: false,

    padding: 1,
    defaultMinWidth: 1,
    defaultMaxWidth: 50,

    sortField: "",
    sortAsc: false,

    treeId: "name",
    treeIcon: "├ ",
    treeLink: "│ ",
    treeLast: "└ ",
    treeIndent: "  ",
    defaultTreeFormatter: this.defaultTreeFormatter,
    defaultFormatter: this.defaultFormatter,
    nullPlaceholder: "-"
}
```

## Column Properties
```js
{
    id: String,
    name: String,
    type: String, //string, number
    align : String, //left, right
    minWidth: Number,
    maxWidth: Number,
    formatter: Function //cell formatter
}
```

## Row Properties
```js
{
    //column id key: cell value
    subs: Array //sub rows
}
```


## Unresolved
* Special character(Unicode) support is not perfect

## CHANGELOG
[CHANGELOG.md](CHANGELOG.md)


## Markdown Grid
[markdown-grid](https://github.com/cenfun/markdown-grid) - Markdown Grid Generator