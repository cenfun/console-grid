# console-grid
console log a grid

# Install
```
npm install console-grid
```


# Usage
```js
var Grid = require("console-grid");

var option = {
    columnBorder: " | ",
    rowBorder: "-",
    hideHeaders: false,
    nullPlaceholder: "-",
    defaultFormatter: (v, row, column) => {
        return v;
    }
};
var grid = new Grid(option);

var data = {
    columns: [{
        id: "name",
        name: "Name",
        maxWidth: 20
    }, {
        id: "value",
        name: "Value",
        color: "green"
    }, {
        id: "null",
        name: "Null"
    }, {
        id: "number",
        name: "Number Format",
        formatter: (v, row, column) => {
            return Number(v).toFixed(2);
        }
    }],
    rows: [{
        name: "Row 1",
        value: "1",
        number: 1
    }, {
        name: "Row 2",
        value: "2",
        number: 2
    }, {
        name: "Row Name",
        value: "3",
        number: 3
    }, {
        name: "Row Long Name Long Name Long Name Long Name",
        value: "4",
        number: 4
    }, {
        name: "Row 5",
        value: "5",
        number: 5
    }, {
        name: "Row 6",
        value: "6",
        number: 6
    }, {
        name: "Row 7",
        value: "7",
        number: 7
    }]
};
grid.render(data);
```
# Preview
```
-------------------- | ----- | ---- | -------------
Name                 | Value | Null | Number Format
-------------------- | ----- | ---- | -------------
Row 1                | 1     | -    | 1.00
Row 2                | 2     | -    | 2.00
Row Name             | 3     | -    | 3.00
Row Long Name Lon... | 4     | -    | 4.00
Row 5                | 5     | -    | 5.00
Row 6                | 6     | -    | 6.00
Row 7                | 7     | -    | 7.00
-------------------- | ----- | ---- | -------------
```

# Test Example
[test.js](test.js)
```
node test.js
```