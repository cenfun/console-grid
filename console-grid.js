class ConsoleGrid {

    constructor(option) {
        this.columns = [];
        this.rows = [];

        var defaultOption = {
            columnBorder: " | ",
            rowBorder: "-",
            hideHeaders: false,
            nullPlaceholder: "-",
            defaultMaxWidth: 30,
            defaultFormatter: (v, row, column) => {
                return v;
            }
        };

        this.option = Object.assign(defaultOption, option);

    }

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
                column.formatter = this.option.defaultFormatter;
            }
            column.name = column.name + "";
        });
    }

    initGridRows() {
        this.gridRows = [];
        this.rows.forEach((row, rowIndex) => {
            var item = {
                index: rowIndex
            };
            this.columns.forEach(column => {
                var id = column.id;
                var str = column.formatter.call(this, row[id], row, column);
                if (typeof (str) === "undefined" || str === null) {
                    str = this.option.nullPlaceholder;
                } else {
                    str = str + "";
                }
                item[id] = this.getCharByMaxWidth(str, column.maxWidth);
            });
            this.gridRows.push(item);
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
            var str = row[id];
            w = Math.max(w, this.getCharLength(str));
        });
        return w;
    }

    getCharByMaxWidth(str, maxWidth) {
        if (typeof (maxWidth) !== "number") {
            maxWidth = this.option.defaultMaxWidth;
        }
        var len = this.getCharLength(str);
        if (len <= maxWidth) {
            return str;
        }

        str = str.substr(0, maxWidth - 3) + "...";

        return str;
    }

    getCharLength(char) {
        char = char.replace(/\033\[39m/g, '');
        char = char.replace(/\033\[(3[0-7])m/g, '');
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
            var str = row[column.id];
            var spaceLen = column.width - str.length;
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

module.exports = ConsoleGrid;