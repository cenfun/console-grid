const Style = require("./style.js");
const comparers = require("./comparers.js");
const treeIconNames = ['treeIcon', 'treeLink', 'treeLast'];

class ConsoleGrid {
    constructor() {
        this.Style = Style;
        this.option = this.defaultOption();
        this.columns = [];
        this.rows = [];
    }

    defaultOption() {
        var defaultOption = {

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
            defaultMaxWidth: 30,

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
        };

        return defaultOption;
    }

    setData(data) {
        if (!data) {
            return this;
        }
        this.setOption(data.option);
        this.setColumns(data.columns);
        this.setRows(data.rows);
        this.data = data;
        return this;
    }

    setOption(option) {
        if (option) {
            var defaultOption = this.defaultOption();
            this.option = Object.assign(defaultOption, option);
        }

        // create a reg for tree icons
        var o = this.option;
        var str = '';
        Object.keys(o).forEach(key => {
            if (treeIconNames.indexOf(key) === -1) return;
            str += o[key].replace(/ /g, '');
        });

        this.option.treeIconsReg = new RegExp('[' + str + ']', 'g');

        return this;
    }

    setColumns(columns) {
        if (Array.isArray(columns)) {
            this.columns = columns;
        }
        return this;
    }

    setRows(rows) {
        if (Array.isArray(rows)) {
            this.rows = rows;
        }
        return this;
    }

    //=====================================================================================================

    defaultTreeFormatter(v, row, column) {

        if (!this.isTreeRow) {
            return v;
        }

        var o = this.option;

        var indent = "";
        var parent = row.cg_parent;
        while (parent) {
            if (parent.cg_list_last) {
                indent = o.treeIndent + indent;
            } else {
                indent = o.treeLink + indent;
            }
            parent = parent.cg_parent;
        }

        var icon = o.treeIcon;
        if (row.cg_list_last) {
            icon = o.treeLast;
        }

        var str = indent + icon + v;
        return str;
    }

    defaultFormatter(v, row, column) {
        return v;
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
        this.initOption();
        this.initGridColumns();
        this.initGridRows();
        this.initGridHeaders();
    }

    initOption() {
        this.isTreeRow = false;
        for (var i = 0, l = this.rows.length; i < l; i++) {
            var row = this.rows[i];
            if (row && Array.isArray(row.subs)) {
                this.isTreeRow = true;
                break;
            }
        }
    }

    initGridColumns() {
        this.columns.forEach((column, i) => {
            column.cg_index = i;

            var name = column.name + "";
            name = name.replace(/\s/g, " ");
            column.name = name;

            //align
            column.cg_align = this.getColumnAlign(column);

            if (typeof (column.formatter) === "function") {
                column.cg_formatter = column.formatter;
            } else {
                if (column.id === this.option.treeId) {
                    column.cg_formatter = this.option.defaultTreeFormatter;
                } else {
                    column.cg_formatter = this.option.defaultFormatter;
                }
            }
        });
    }

    getColumnAlign(column) {
        if (column.align === "left" || column.align === "right") {
            return column.align;
        }
        if (column.type === "number") {
            return "right";
        }
        return "left";
    }

    //=====================================================================================================

    initGridRows() {

        this.sortRows();

        this.gridRows = [];
        var index = 0;
        this.forEachTree(this.rows, (row, i, parent) => {
            row.cg_parent = parent;
            row.cg_index = index++;
            row.cg_list_index = i;

            var level = 0;
            if (parent) {
                level = parent.cg_level + 1;
            }
            row.cg_level = level;

            var last = false;
            if (i === this.getParentSubsLength(row) - 1) {
                last = true;
            }
            row.cg_list_last = last;

            this.initRowProperties(row);

            this.gridRows.push(row);
        });

        //console.log(this.gridRows);
    }

    getParentSubsLength(row) {
        if (row.cg_parent) {
            return row.cg_parent.subs.length;
        }
        return this.rows.length;
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
            //init row value
            var v = row[column.id];
            if (typeof (v) === "undefined" || v === null) {
                v = this.option.nullPlaceholder;
            } else {
                v = column.cg_formatter.call(this, v, row, column);
                v = v + "";
                v = v.replace(/\s/g, " ");
            }
            row[this.getColumnKey(column)] = v;
        });
    }

    //=====================================================================================================

    initGridHeaders() {
        this.maxHeaderLines = 1;
        this.columns.forEach(column => {
            //width depends columns and rows
            column.cg_width = this.getColumnWidth(column);

            //lines depends column width
            var lines = this.getHeaderLines(column);
            this.maxHeaderLines = Math.max(this.maxHeaderLines, lines.length);
            column.cg_lines = lines;

        });
        //console.log(this.maxHeaderLines);

        //init lines length
        this.columns.forEach(column => {
            var lines = column.cg_lines;
            while (lines.length < this.maxHeaderLines) {
                lines.unshift("");
            }
        });

        //console.log(this.columns);

    }

    getColumnWidth(column) {
        var w = 0;
        if (!this.option.hideHeaders) {
            w = this.getCharLength(column.name);
        }
        this.gridRows.forEach(row => {
            var str = row[this.getColumnKey(column)];
            var len = this.getCharLength(str);
            w = Math.max(w, len);
        });
        var maxWidth = column.maxWidth;
        if (typeof (maxWidth) !== "number") {
            maxWidth = this.option.defaultMaxWidth;
        }
        var minWidth = column.minWidth;
        if (typeof (minWidth) !== "number") {
            minWidth = this.option.defaultMinWidth;
        }
        w = Math.min(w, maxWidth);
        w = Math.max(w, minWidth);
        return w;
    }

    getHeaderLines(column) {

        var columnWidth = column.cg_width;
        var str = column.name;
        var lenNoColor = this.getCharLength(str);
        if (lenNoColor < columnWidth) {
            return [str];
        }
        var lines = [];
        var list = str.split(" ");
        while (list.length) {
            var item = list.shift();
            while (list.length && this.getCharLength(item + list[0]) < columnWidth) {
                item += " " + list.shift();
            }
            lines.push(item);
        }

        //console.log(lines);

        return lines;
    }

    //=====================================================================================================

    getCharByWidth(str, w) {
        var strNoColor = this.removeColor(str);
        if (strNoColor.length <= w) {
            return str;
        }

        var list = str.split(" ");
        var item = list.shift();
        //first one overflow
        var lenNoColor = this.getCharLength(item);
        if (lenNoColor > w) {
            item = this.removeColor(item);
            item = item.substr(0, w - 3) + "...";
            return item;
        }

        //next one append, 4 is place for space + ...
        while (list.length && this.getCharLength(item + list[0]) < w - 4) {
            item += " " + list.shift();
        }

        //+1 space
        var lenCurrent = this.getCharLength(item);
        var lenLast = w - lenCurrent;
        if (lenLast <= 1) {
            return item;
        }

        //last str overflow
        var last = list.join(" ");
        last = " " + this.removeColor(last);

        if (lenLast > 3) {
            last = last.substr(0, lenLast - 3) + "...";
        } else {
            last = this.getChar(lenLast, ".");
        }
        item += last;

        //console.log(item);

        return item;
    }

    removeColor(char) {
        return char.replace(/\033\[(\d+)m/g, '');
    }

    getByteLen(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            len ++;
            c.match(/[^\x00-\xff]/ig) && len ++;
        }
        return len;
    }

    getCharLength(char) {
        //console.log(char, char.length);
        char = this.removeColor(char);
        //console.log(char, char.length);
        return this.getByteLen(char);

            // count the tree icons
            var test = char.match(this.option.treeIconsReg);

            // subtract the count value from len
            len -= test ? test.length : 0;
    }

    getChar(len, str = " ") {
        if (len < 1) {
            return "";
        }
        var arr = new Array(len + 1);
        return arr.join(str);
    }

    getPaddingChar(char) {
        return this.getChar(this.option.padding, char);
    }

    getColumnKey(column) {
        return ["cg", column.cg_index, column.id].join("_");
    }

    getCell(column, str) {
        var columnAlign = column.cg_align;
        var columnWidth = column.cg_width;
        var lenNoColor = this.getCharLength(str);
        if (lenNoColor > columnWidth) {
            str = this.getCharByWidth(str, columnWidth);
            lenNoColor = this.getCharLength(str);
        }
        var spaceLen = column.cg_width - lenNoColor;
        var space = this.getChar(spaceLen);
        var cell = str + space;
        if (columnAlign === "right") {
            cell = space + str;
        }
        return cell;
    }


    //=====================================================================================================

    renderRowBorder(position) {
        var B = this.option.border;
        var list = [];
        this.columns.forEach(column => {
            list.push(this.getChar(column.cg_width, B.h));
        });
        var borderPadding = this.getPaddingChar(B.h);
        var char = borderPadding + B[position + "_mid"] + borderPadding;
        var line = list.join(char);
        line = B[position + "_left"] + borderPadding + line + borderPadding + B[position + "_right"];
        this.consoleLog(line);
        return this;
    }

    renderHeader(i) {
        var B = this.option.border;
        var list = [];
        this.columns.forEach(column => {
            var str = column.cg_lines[i] || "";
            var cell = this.getCell(column, str);
            list.push(cell);
        });
        var borderPadding = this.getPaddingChar(" ");
        var char = borderPadding + B.v + borderPadding;
        var line = list.join(char);
        line = B.v + borderPadding + line + borderPadding + B.v;
        this.consoleLog(line);
    }

    renderHeaders() {
        var i = 0;
        while (i < this.maxHeaderLines) {
            this.renderHeader(i);
            i += 1;
        }
        return this;
    }

    renderRow(row) {
        //console.log(row);
        var B = this.option.border;
        var list = [];
        this.columns.forEach(column => {
            var str = row[this.getColumnKey(column)];
            var cell = this.getCell(column, str);
            list.push(cell);
        });
        var borderPadding = this.getPaddingChar(" ");
        var char = borderPadding + B.v + borderPadding;
        var line = list.join(char);
        line = B.v + borderPadding + line + borderPadding + B.v;
        this.consoleLog(line);
        return this;
    }

    renderRows() {
        this.gridRows.forEach(row => {
            this.renderRow(row);
        });
        return this;
    }

    render(data) {
        this.setData(data);
        this.initData();

        this.renderLines = [];
        this.renderRowBorder("top");
        if (!this.option.hideHeaders) {
            this.renderHeaders();
            this.renderRowBorder("mid");
        }
        this.renderRows();
        this.renderRowBorder("bottom");
        return this.renderLines;
    }

    consoleLog(line) {
        this.renderLines.push(line);
        if (this.option.silent) {
            return;
        }
        console.log(line);
    }

}

ConsoleGrid.Style = Style;

module.exports = ConsoleGrid;
