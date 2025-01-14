const comparers = require('./comparers.js');
const defaultGetCharLength = require('./get-char-length.js');
class ConsoleGrid {
    constructor(data = {}) {

        this.options = this.initOptions(data.options);
        this.columns = this.initColumns(data.columns);
        this.rows = this.initRows(data.rows);

        this.init();

    }

    initOptions(_options) {
        const options = {

            silent: false,
            headerVisible: true,

            padding: 1,
            defaultMinWidth: 1,
            defaultMaxWidth: 50,

            sortField: '',
            sortAsc: false,
            sortIcon: '*',

            treeId: 'name',
            treeIcon: '├ ',
            treeLink: '│ ',
            treeLast: '└ ',
            treeIndent: '  ',

            nullPlaceholder: '-',

            // border definition:
            // H: horizontal, V: vertical
            // T: top, B: bottom, L: left, R: right, C: center
            borderH: '─',
            borderV: '│',
            borderTL: '┌',
            borderTC: '┬',
            borderTR: '┐',
            borderCL: '├',
            borderCC: '┼',
            borderCR: '┤',
            borderBL: '└',
            borderBC: '┴',
            borderBR: '┘',

            getCharLength: defaultGetCharLength,

            defaultTreeFormatter: this.defaultTreeFormatter,
            defaultFormatter: this.defaultFormatter

        };

        if (_options) {
            return Object.assign(options, _options);
        }

        return options;
    }

    initColumns(columns) {
        if (Array.isArray(columns)) {
            return columns;
        }
        return [];
    }

    initRows(rows) {
        if (Array.isArray(rows)) {
            return rows;
        }
        return [];
    }

    // =====================================================================================================

    defaultTreeFormatter(v, row, column) {

        if (!this.isTreeRow) {
            return v;
        }

        const o = this.options;

        let indent = '';
        let parent = row.cg_parent;

        while (parent) {
            if (parent.cg_level) {
                if (parent.cg_list_last) {
                    indent = o.treeIndent + indent;
                } else {
                    indent = o.treeLink + indent;
                }
            }
            parent = parent.cg_parent;
        }

        let icon = '';
        if (row.cg_level) {
            icon = o.treeIcon;
            if (row.cg_list_last) {
                icon = o.treeLast;
            }
            // if empty name = ""
            if (!v) {
                icon = o.borderV;
            }
        }

        const str = indent + icon + v;
        return str;
    }

    defaultFormatter(v, row, column) {
        return v;
    }

    // =====================================================================================================

    forEachTree(root, callback) {
        const forEachAll = (tree, parent) => {
            if (!Array.isArray(tree)) {
                return;
            }
            for (let i = 0, l = tree.length; i < l; i++) {
                const item = tree[i];
                const result = callback.call(this, item, i, parent);
                if (result === false) {
                    return false;
                }
                const subResult = forEachAll(item.subs, item);
                if (subResult === false) {
                    return false;
                }
            }
        };
        forEachAll(root);
        return this;
    }

    // =====================================================================================================

    init() {
        this.initTree();
        this.initGridColumns();
        this.initGridRows();
        this.initGridHeaders();
    }

    initTree() {
        this.isTreeRow = false;
        for (let i = 0, l = this.rows.length; i < l; i++) {
            const row = this.rows[i];
            if (row && Array.isArray(row.subs)) {
                this.isTreeRow = true;
                break;
            }
        }
    }

    initGridColumns() {
        this.gridColumns = this.columns.map((column, i) => {

            if (typeof column === 'string') {
                column = {
                    name: column
                };
            }

            if (!column.id) {
                column.id = `${i}`;
            }

            let name = column.id;
            if (typeof column.name === 'string') {
                name = column.name;
            }
            name = name.replace(/\s/g, ' ');
            column.name = name;

            column.cg_index = i;
            // align
            column.cg_align = this.getColumnAlign(column);

            if (typeof column.formatter === 'function') {
                column.cg_formatter = column.formatter;
            } else {
                if (column.id === this.options.treeId) {
                    column.cg_formatter = this.options.defaultTreeFormatter;
                } else {
                    column.cg_formatter = this.options.defaultFormatter;
                }
            }

            return column;
        });
    }

    getColumnAlign(column) {
        if (column.align === 'left' || column.align === 'center' || column.align === 'right') {
            return column.align;
        }
        if (column.type === 'number') {
            return 'right';
        }
        return 'left';
    }

    // =====================================================================================================

    initGridRows() {

        this.sortRows();

        this.gridRows = [];
        let index = 0;
        this.forEachTree(this.rows, (row, i, parent) => {

            if (Array.isArray(row)) {
                row = this.getRowObjectFromArray(row);
            }

            row.cg_parent = parent;
            row.cg_index = index++;
            row.cg_list_index = i;

            let level = 0;
            if (parent) {
                level = parent.cg_level + 1;
            }
            row.cg_level = level;

            let last = false;
            if (i === this.getParentSubsLength(row) - 1) {
                last = true;
            }
            row.cg_list_last = last;

            this.initRowProperties(row);

            this.gridRows.push(row);
        });

        // console.log(this.gridRows);
    }

    getRowObjectFromArray(arr) {
        const row = {};
        arr.forEach((item, i) => {
            row[i] = item;
        });
        return row;
    }

    getParentSubsLength(row) {
        if (row.cg_parent) {
            return row.cg_parent.subs.length;
        }
        return this.rows.length;
    }

    // =====================================================================================================

    getSortColumn() {
        const sortField = this.options.sortField;
        if (!sortField) {
            return;
        }
        return this.gridColumns.find((item) => item.id === sortField);
    }

    getSortComparer() {
        const type = this.sortColumn.type;
        const comparer = comparers[type] || comparers.string;
        return comparer;
    }

    sortRows() {
        this.sortColumn = this.getSortColumn();
        if (!this.sortColumn) {
            return;
        }

        const sortAll = (list) => {
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

        const sortField = this.sortColumn.id;
        const sortAsc = this.options.sortAsc;
        const sortFactor = sortAsc ? -1 : 1;
        const sortBlankFactor = 1;
        const comparer = this.getSortComparer();

        let prevItem;
        list.forEach((item) => {
            if (!prevItem) {
                prevItem = item;
            }
            if (item.innerBorder) {
                item.innerProxy = prevItem;
            }
            prevItem = item;
        });


        list.sort((a, b) => {
            const option = {
                sortField: sortField,
                sortFactor: sortFactor,
                sortBlankFactor: sortBlankFactor
            };
            if (a.innerBorder) {
                a = a.innerProxy;
            }
            if (b.innerBorder) {
                b = b.innerProxy;
            }
            return comparer.call(this, a, b, option);
        });

    }

    // =====================================================================================================

    initRowProperties(row) {
        this.gridColumns.forEach((column) => {
            // init row value
            let v = row[column.id];
            if (typeof v === 'undefined' || v === null) {
                v = this.options.nullPlaceholder;
            } else {
                v = column.cg_formatter.call(this, v, row, column);
                v = `${v}`;
                v = v.replace(/\s/g, ' ');
            }
            row[this.getColumnKey(column)] = v;
        });
    }

    // =====================================================================================================

    initGridHeaders() {
        this.maxHeaderLines = 1;
        this.gridColumns.forEach((column) => {
            // width depends columns and rows
            column.cg_width = this.getColumnWidth(column);

            // lines depends column width
            const lines = this.getHeaderLines(column);
            this.maxHeaderLines = Math.max(this.maxHeaderLines, lines.length);
            column.cg_lines = lines;

        });
        // console.log(this.maxHeaderLines);

        // init lines length
        this.gridColumns.forEach((column) => {
            const lines = column.cg_lines;
            while (lines.length < this.maxHeaderLines) {
                lines.unshift('');
            }
        });

        // console.log(this.gridColumns);

    }

    getColumnName(column) {
        const name = column.name;
        if (column === this.sortColumn) {
            return name + this.options.sortIcon;
        }
        return name;
    }

    getColumnWidth(column) {
        let w = 0;
        if (this.options.headerVisible) {
            w = this.getCharLength(this.getColumnName(column));
        }
        this.gridRows.forEach((row) => {
            const str = row[this.getColumnKey(column)];
            const len = this.getCharLength(str);
            w = Math.max(w, len);
        });
        let maxWidth = column.maxWidth;
        if (typeof maxWidth !== 'number') {
            maxWidth = this.options.defaultMaxWidth;
        }
        let minWidth = column.minWidth;
        if (typeof minWidth !== 'number') {
            minWidth = this.options.defaultMinWidth;
        }
        w = Math.min(w, maxWidth);
        w = Math.max(w, minWidth);
        return w;
    }

    getHeaderLines(column) {

        const columnWidth = column.cg_width;
        const str = this.getColumnName(column);
        const lenNoColor = this.getCharLength(str);
        if (lenNoColor < columnWidth) {
            return [str];
        }
        const lines = [];
        const list = str.split(' ');
        while (list.length) {
            let item = list.shift();
            while (list.length && this.getCharLength(item + list[0]) < columnWidth) {
                item += ` ${list.shift()}`;
            }
            lines.push(item);
        }

        // console.log(lines);

        return lines;
    }

    // =====================================================================================================
    getTruncatedList(str) {
        const list = [];
        const len = str.length;
        let pos = 0;
        const matches = `${str}`.matchAll(/\033\[(\d+)m/g);
        for (const item of matches) {
            const c = item[0];
            const i = item.index;
            if (i > pos) {
                list.push({
                    type: 'string',
                    value: str.slice(pos, i)
                });
            }
            list.push({
                type: 'color',
                value: c
            });
            pos = i + c.length;
        }
        if (pos < len) {
            list.push({
                type: 'string',
                value: str.slice(pos)
            });
        }
        return list;
    }

    getTruncatedCharByWidth(str, w) {
        const list = this.getTruncatedList(str);
        // console.log(list);

        const ellipsis = '...';
        const max = w - ellipsis.length;
        const ls = [];
        let len = 0;
        let overflow = false;
        list.forEach((item) => {
            const { type, value } = item;

            // keep all color
            if (type === 'color') {
                ls.push(value);
                return;
            }

            if (overflow) {
                return;
            }

            if (len + value.length < max) {
                ls.push(value);
                len += value.length;
                return;
            }

            ls.push(value.slice(0, max - len));
            overflow = true;

        });

        ls.push(ellipsis);

        // console.log(ls);
        const newStr = ls.join('');

        return newStr;
    }

    getCharByWidth(str, w) {

        const lenNoColor = this.getCharLength(str);
        if (lenNoColor <= w) {
            return str;
        }

        if (w <= 3) {
            return this.getChar(w, '.');
        }

        return this.getTruncatedCharByWidth(str, w);
    }

    getCharLength(char) {
        char = this.removeColor(char);
        return this.options.getCharLength(char);
    }

    getChar(len, str = ' ') {
        if (len < 1) {
            return '';
        }
        const arr = new Array(len + 1);
        return arr.join(str);
    }

    getPaddingChar(char) {
        return this.getChar(this.options.padding, char);
    }

    getColumnKey(column) {
        return ['cg', column.cg_index, column.id].join('_');
    }

    getCell(column, str) {

        const columnWidth = column.cg_width;

        str = this.getCharByWidth(str, columnWidth);
        const lenNoColor = this.getCharLength(str);

        const spaceLen = column.cg_width - lenNoColor;

        const columnAlign = column.cg_align;

        if (columnAlign === 'right') {
            return this.getChar(spaceLen) + str;
        }

        if (columnAlign === 'center') {
            const spaceLenL = Math.round(spaceLen * 0.5);
            const spaceLenR = spaceLen - spaceLenL;
            return this.getChar(spaceLenL) + str + this.getChar(spaceLenR);
        }

        return str + this.getChar(spaceLen);
    }


    // =====================================================================================================

    renderRowBorder(position) {
        const o = this.options;
        const list = [];
        this.gridColumns.forEach((column) => {
            list.push(this.getChar(column.cg_width, o.borderH));
        });
        const borderPadding = this.getPaddingChar(o.borderH);
        const char = borderPadding + o[`border${position}C`] + borderPadding;
        let line = list.join(char);
        line = o[`border${position}L`] + borderPadding + line + borderPadding + o[`border${position}R`];
        this.addLine(line);
        return this;
    }

    renderHeader(i) {
        const o = this.options;
        const list = [];
        this.gridColumns.forEach((column) => {
            const str = column.cg_lines[i] || '';
            const cell = this.getCell(column, str);
            list.push(cell);
        });
        const borderPadding = this.getPaddingChar(' ');
        const char = borderPadding + o.borderV + borderPadding;
        let line = list.join(char);
        line = o.borderV + borderPadding + line + borderPadding + o.borderV;
        this.addLine(line);
        return this;
    }

    renderHeaders() {
        let i = 0;
        while (i < this.maxHeaderLines) {
            this.renderHeader(i);
            i += 1;
        }
        return this;
    }

    renderRow(row) {
        // console.log(row);
        const o = this.options;
        const list = [];
        this.gridColumns.forEach((column) => {
            const str = row[this.getColumnKey(column)];
            const cell = this.getCell(column, str);
            list.push(cell);
        });
        const borderPadding = this.getPaddingChar(' ');
        const char = borderPadding + o.borderV + borderPadding;
        let line = list.join(char);
        line = o.borderV + borderPadding + line + borderPadding + o.borderV;
        this.addLine(line);
        return this;
    }

    renderRows() {
        this.gridRows.forEach((row) => {
            if (row.innerBorder) {
                this.renderRowBorder('C');
                return;
            }
            this.renderRow(row);
        });
        return this;
    }

    addLine(line) {
        this.renderLines.push(line);
        return this;
    }

    consoleLog() {
        if (this.options.silent || !this.renderLines) {
            return;
        }
        const log = this.renderLines.join('\n');
        console.log(log);
    }

    removeColor(str) {
        // https://github.com/chalk/ansi-regex
        // Valid string terminator sequences are BEL, ESC\, and 0x9c
        const ST = '(?:\\u0007|\\u001B\\u005C|\\u009C)';
        const pattern = [
            `[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${ST})`,
            '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
        ].join('|');

        const reg = new RegExp(pattern, 'g');

        return `${str}`.replace(reg, '');
    }

    render() {
        this.renderLines = [];
        this.renderRowBorder('T');
        if (this.options.headerVisible) {
            this.renderHeaders();
            this.renderRowBorder('C');
        }
        this.renderRows();
        this.renderRowBorder('B');

        this.consoleLog();
        return this.renderLines;
    }

}

const CG = function(data) {
    return new ConsoleGrid(data).render();
};

CG.ConsoleGrid = ConsoleGrid;

module.exports = CG;
