# console-grid

![](https://img.shields.io/npm/v/console-grid.svg)
![](https://img.shields.io/npm/dt/console-grid.svg)

> A lightweight, zero-dependency utility for rendering formatted grids/tables in the Node.js console.

## Features
* Zero dependencies
* Tree style rows with hierarchical data
* Column alignment (left/center/right), sorting, and custom padding
* Multiple lines header with auto word wrapping
* Custom cell formatter
* Colorful cells with ANSI escape codes preserved
* Unicode support (CJK, Emoji, special characters)
* Custom character width calculation via `getCharLength` option
* TypeScript support
* ESM and CommonJS dual format

## Install
```
npm i console-grid
```

## Usage

### CommonJS
```js
const CG = require("console-grid");
```

### ESM
```js
import CG from "console-grid";
// or
import CG, { ConsoleGrid } from "console-grid";
```

## Examples

{placeholder_list} 

## API

### `CG(data): string[]`
Renders a grid to the console and returns an array of output lines.

### `new ConsoleGrid(data)`
Creates a grid instance for advanced usage.
```js
const { ConsoleGrid } = require("console-grid");
const grid = new ConsoleGrid(data);
const lines = grid.render();
```

## Data Format: [CGDF](https://github.com/cenfun/cgdf)
```js
{
    options: Object, // grid level options (see below)
    columns: Array,  // column definitions (string or ColumnItem)
    rows: Array      // row data (object, array, or RowItem)
}
```

## Default Options
```js
{
    // Output control
    silent: false,         // if true, suppress console output, only return lines
    headerVisible: true,   // show/hide column headers

    // Column sizing
    padding: 1,            // cell padding spaces
    defaultMinWidth: 1,    // default minimum column width
    defaultMaxWidth: 50,   // default maximum column width

    // Sorting
    sortField: '',         // column id to sort by
    sortAsc: false,        // ascending order
    sortIcon: '*',         // icon appended to sorted column header

    // Tree display
    treeId: 'name',        // column id used for tree indentation
    treeIcon: '├ ',        // tree branch icon
    treeLink: '│ ',        // tree vertical link
    treeLast: '└ ',        // tree last item icon
    treeIndent: '  ',      // indent for nested levels

    // Formatting
    nullPlaceholder: '-',  // placeholder for null/undefined values

    // Border characters (Box-drawing)
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

    // Custom character width function for display alignment
    // Default handles ASCII (width 1) and CJK/Emoji (width 2)
    getCharLength: (str) => number
}
```

## Column Properties
| Property | Type | Description |
| --- | --- | --- |
| `id` | `string` | Column identifier, used as the key to read row data |
| `name` | `string` | Column header display name (defaults to `id`) |
| `type` | `string` | Data type: `"string"` (default) or `"number"` |
| `align` | `string` | Text alignment: `"left"` (default), `"center"`, or `"right"`. Defaults to `"right"` when `type` is `"number"` |
| `minWidth` | `number` | Minimum column width (overrides `defaultMinWidth`) |
| `maxWidth` | `number` | Maximum column width (overrides `defaultMaxWidth`) |
| `formatter` | `function` | Custom cell formatter: `(value, rowItem, columnItem) => string` |

## Row Properties
| Property | Type | Description |
| --- | --- | --- |
| `[columnId]` | `any` | Cell value, where key matches a column `id` |
| `subs` | `RowItem[]` | Sub rows for tree structure |
| `innerBorder` | `boolean` | If `true`, renders a horizontal border line instead of a data row |

## CHANGELOG
[CHANGELOG.md](CHANGELOG.md)

## Related
- [turbogrid](https://github.com/cenfun/turbogrid) - High Performance Grid
- [markdown-grid](https://github.com/cenfun/markdown-grid) - Markdown Grid Generator