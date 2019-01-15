var Grid = require("./console-grid.js");

var option = {
    columnBorder: " | ",
    rowBorder: "-",
    hideHeaders: false,
    nullPlaceholder: "-",
    defaultMaxWidth: 30,

    sortField: "",
    sortAsc: false,

    treeId: "name",
    treeIcon: "|- ",
    treeIndent: "   "
};
var grid = new Grid(option);

var data = {
    columns: [{
        id: "name",
        name: "Name",
        type: "string",
        maxWidth: 30
    }, {
        id: "value",
        name: "Value",
        type: "string"
    }, {
        id: "null",
        name: "Null"
    }, {
        id: "number",
        type: "number",
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
        name: "Row Long Name Long Name Long Name Long Name" + Grid.style.red("red"),
        value: "4",
        number: 4
    }, {
        name: "Row 5 " + Grid.style.red("red"),
        value: "5",
        number: 5
    }, {
        name: "Row 6 " + Grid.style.bg.green("bg green"),
        value: "6",
        number: 6
    }, {
        name: "Row 7 " + Grid.style.br.blue("bright blue"),
        value: "7",
        number: 7
    }, {
        name: "Row 8 " + Grid.style.br.bg.blue("bright bg blue"),
        value: "8",
        number: 8,
        subs: [{
            name: "Sub Row 1",
            value: "s1",
            number: 11,
        }, {
            name: "Sub Row 2",
            value: "s2",
            number: 12,
        }, {
            name: "Sub Row 3",
            value: "s3",
            number: 13,
        }]
    }]
};
grid.render(data);