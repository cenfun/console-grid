var Grid = require("./console-grid.js");

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
        name: "Row 5 \x1b[32mColor\x1b[0m",
        value: "5",
        number: 5
    }, {
        name: "Row 6 \x1b[31mColor\x1b[0m",
        value: "6",
        number: 6
    }, {
        name: "Row 7",
        value: "7",
        number: 7
    }]
};
grid.render(data);