const style = require("./style.js");
const comparers = require("./comparers.js");
class ConsoleGrid {
    constructor(option) {
        this.style = style;
        this.columns = [];
        this.rows = [];

        var defaultOption = {
            columnBorder: " | ",
            rowBorder: "-",
            hideHeaders: false,
            nullPlaceholder: "-",
            defaultMaxWidth: 30,

            sortField: "",
            sortAsc: false,

            treeId: "name",
            treeIcon: "|- ",
            treeIndent: "   ",
            defaultTreeFormatter: this.defaultTreeFormatter,
            defaultFormatter: this.defaultFormatter
        };

        this.option = Object.assign(defaultOption, option);

    }

    defaultTreeFormatter(v, row, column) {
        let indent = "";
        let level = row.cg_level;
        while (level > 0) {
            indent += this.option.treeIndent;
            level -= 1;
        }
        let str = indent + this.option.treeIcon + v;
        return str;
    }

    defaultFormatter(v, row, column) {
        return v;
    }

    //=====================================================================================================

    setData(data) {
        this.data = data || {};
        this.setColumns(this.data.columns);
        this.setRows(this.data.rows);
    }

    setColumns(columns) {
        if (!Array.isArray(columns)) {
            columns = [];
        }
        this.columns = columns;
        return this;
    }

    setRows(rows) {
        if (!Array.isArray(rows)) {
            rows = [];
        }
        this.rows = rows;
        return this;
    }

    forEachTree(tree, callback) {
        if (typeof (callback) !== "function") {
            return this;
        }
        var forEachAll = function (tree, parent) {
            if (!Array.isArray(tree)) {
                return;
            }
            for (var i = 0, l = tree.length; i < l; i++) {
                var item = tree[i];
                var result = callback.call(this, item, i, parent);
                if (result === false) {
                    return false;
                }
                var subResult = forEachAll(item.subs, item);
                if (subResult === false) {
                    return false;
                }
            }
        };
        forEachAll(tree);
        return this;
    }

    //=====================================================================================================

    initData() {
        this.initGridColumns();
        this.initGridRows();
        this.initColumnsWidth();
        this.initRowBorderLine();
    }

    initGridColumns() {
        this.columns.forEach(column => {
            if (typeof (column.formatter) !== "function") {
                if (column.id === this.option.treeId) {
                    column.formatter = this.option.defaultTreeFormatter;
                } else {
                    column.formatter = this.option.defaultFormatter;
                }
            }
            if (typeof (column.maxWidth) !== "number") {
                column.maxWidth = this.option.defaultMaxWidth;
            }
            column.name = column.name + "";
        });
    }

    initGridRows() {

        this.sortRows();

        this.gridRows = [];
        let index = 0;
        this.forEachTree(this.rows, (row, i, parent) => {
            let level = 0;
            if (parent) {
                level = parent.cg_level + 1;
            }
            row.cg_level = level;
            row.cg_index = index++;
            this.initRowProperties(row);
            this.gridRows.push(row);
        });

        //console.log(this.gridRows);
    }

    getSortColumn() {
        var sortField = this.option.sortField;
        if (!sortField) {
            return null;
        }
        for (var i = 0, l = this.columns.length; i < l; i++) {
            var column = this.columns[i];
            if (column.id === sortField) {
                return column;
            }
        }
        return null;
    }

    getSortComparer() {
        var type = this.sortColumn.type;
        var comparer = comparers[type] || comparers.string;
        return comparer;
    }

    sortRows() {
        this.sortColumn = this.getSortColumn();
        if (!this.sortColumn) {
            return;
        }

        var sortAll = (list) => {
            if (!Array.isArray(list)) {
                return;
            }
            if (list.length > 1) {
                this.sortList(list);
            }
            list.forEach((item) => {
                if (item && item.subs) {
                    sortAll(item.subs);
                }
            });
        };

        sortAll(this.rows);

    }

    sortList(list) {

        var sortField = this.sortColumn.id;
        var sortAsc = this.option.sortAsc;
        var sortFactor = sortAsc ? -1 : 1;
        var sortBlankFactor = 1;
        var comparer = this.getSortComparer();

        list.sort((a, b) => {
            var option = {
                sortField: sortField,
                sortFactor: sortFactor,
                sortBlankFactor: sortBlankFactor
            };
            return comparer.call(this, a, b, option);
        });

    }

    initRowProperties(row) {
        this.columns.forEach(column => {
            let id = column.id;
            let str = column.formatter.call(this, row[id], row, column);
            if (typeof (str) === "undefined" || str === null) {
                str = this.option.nullPlaceholder;
            } else {
                str = str + "";
            }
            let maxWidth = column.maxWidth;
            //let lenWithColor = str.length;
            let lenWithoutColor = this.getCharLength(str);
            if (lenWithoutColor <= maxWidth) {
                row["cg_width_" + id] = lenWithoutColor;
                row["cg_" + id] = str;
            } else {
                row["cg_width_" + id] = maxWidth;
                row["cg_" + id] = this.getCharByMaxWidth(str, maxWidth);
            }
        });
    }

    initColumnsWidth() {
        this.columns.forEach(column => {
            column.width = this.getColumnMaxWidth(column);
        });
    }

    initRowBorderLine() {
        var list = [];
        this.columns.forEach(column => {
            list.push(this.getChar(column.width, this.option.rowBorder));
        });
        this.rowBorderLine = list.join(this.option.columnBorder);
    }

    //=====================================================================================================

    getColumnMaxWidth(column) {
        var w = column.name.length;
        var id = column.id;
        this.gridRows.forEach(row => {
            w = Math.max(w, row["cg_width_" + id]);
        });
        return w;
    }

    getCharByMaxWidth(str, maxWidth) {
        str = this.getCharWithoutColor(str);
        str = str.substr(0, maxWidth - 3) + "...";
        return str;
    }

    getCharWithoutColor(char) {
        return char.replace(/\033\[(\d+)m/g, '');
    }

    getCharLength(char) {
        //console.log(char, char.length);
        char = this.getCharWithoutColor(char);
        //console.log(char, char.length);
        return char.length;
    }

    getChar(len, str = " ") {
        if (len < 1) {
            return "";
        }
        var arr = new Array(len + 1);
        return arr.join(str);
    }

    consoleLog(msg) {
        console.log(msg);
    }

    //=====================================================================================================

    renderRowBorder() {
        if (!this.option.rowBorder) {
            return this;
        }
        if (this.rowBorderLine) {
            this.consoleLog(this.rowBorderLine);
        }
        return this;
    }

    renderHeaders() {
        if (this.option.hideHeaders) {
            return this;
        }
        var list = [];
        this.columns.forEach(column => {
            var spaceLen = column.width - column.name.length;
            list.push(column.name + this.getChar(spaceLen));
        });
        var line = list.join(this.option.columnBorder);
        this.consoleLog(line);
    }

    renderRows() {
        this.gridRows.forEach(row => {
            this.renderRow(row);
        });
    }

    renderRow(row) {
        var list = [];
        this.columns.forEach(column => {
            var id = column.id;
            var str = row["cg_" + id];
            var spaceLen = column.width - row["cg_width_" + id];
            list.push(str + this.getChar(spaceLen));
        });
        var line = list.join(this.option.columnBorder);
        this.consoleLog(line);
    }

    render(data) {
        this.setData(data);
        this.initData();
        this.renderRowBorder();
        this.renderHeaders();
        this.renderRowBorder();
        this.renderRows();
        this.renderRowBorder();
    }

}

ConsoleGrid.style = style;

module.exports = ConsoleGrid;