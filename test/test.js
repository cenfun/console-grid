var ConsoleGrid = require("../lib/index.js");
var consoleGrid = new ConsoleGrid();
var CGS = ConsoleGrid.Style;

var data = {
    option: {

    },
    columns: [{
        id: "name",
        name: "Name " + CGS.bg.green("bg green"),
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
        name: "Number Format " + CGS.red("red") + " LongWordLongWord",
        maxWidth: 12,
        formatter: (v, row, column) => {
            return Number(v).toFixed(2);
        }
    }, {
        id: "value",
        name: "Multiple Line Header Name",
        align: "right",
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
        name: "Row Long Name " + CGS.red("Red") + " Long Name " + CGS.red("Long") + " " + CGS.green("G") + " Long Name " + CGS.red("Red"),
        value: "4",
        number: 4
    }, {
        name: "Row 5 " + CGS.red("red"),
        value: "5"
    }, {
        name: "Row 6 " + CGS.bg.green("bg green"),
        value: "6",
        number: 6
    }, {
        name: "Row 7 " + CGS.br.blue("bright blue"),
        value: "7",
        number: 7
    }, {
        name: "Row 8 " + CGS.br.bg.blue("bright bg blue"),
        value: "8",
        number: 8,
        subs: [{
            name: "Sub Row 1",
            value: "s1",
            number: 11
        }, {
            name: "Sub Row 2",
            value: "s2s2s2 s",
            number: 12
        }, {
            name: "Sub Row 3",
            value: "s3 s3 s3",
            number: 13
        }]
    }]
};
consoleGrid.render(data);

console.log("\n3 levels:");
data.rows[7].subs[0].subs = [{
    name: "Sub Row 21",
    value: "s21",
    number: 21
}, {
    name: "Sub Row 22",
    value: "s22",
    number: 22
}];
consoleGrid.render(data);

console.log("\nsort by name:");
data.option.sortField = "name";
consoleGrid.render(data);

console.log("\nhide headers, no tree, sort by name:");
data.option.hideHeaders = true;
data.option.sortField = "name";
data.rows[2].subs = null;
consoleGrid.render(data);

console.log("\nsort by number and asc:");
data.option.sortField = "number";
data.option.sortAsc = true;
consoleGrid.render(data);

//console.log(data);