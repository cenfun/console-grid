var Grid = require("../lib/index.js");
var grid = new Grid();

var data = {
    option: {

    },
    columns: [{
        id: "name",
        name: "Name " + Grid.style.bg.green("bg green"),
        type: "string",
        maxWidth: 38
    }, {
        id: "value",
        name: "Value",
        type: "string",
        maxWidth: 7
    }, {
        id: "null",
        name: "Null"
    }, {
        id: "number",
        type: "number",
        name: "Number Format " + Grid.style.red("red") + " LongWordLongWord",
        maxWidth: 12,
        formatter: (v, row, column) => {
            return Number(v).toFixed(2);
        }
    }, {
        id: "value",
        name: "Multiple Line Header Name",
        maxWidth: 12
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
        name: "Row Long Name " + Grid.style.red("Red") + " Long Name " + Grid.style.red("Long") + " " + Grid.style.green("G") + " Long Name " + Grid.style.red("Red"),
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
            value: "s3 s3 s3",
            number: 13,
        }]
    }]
};
grid.render(data);

console.log("\nhide headers and sort by name:");
data.option.hideHeaders = true;
data.option.sortField = "name";
grid.render(data);

//console.log(data);