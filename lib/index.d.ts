declare namespace CG {
    export type ColumnFormatter = (value: any, rowItem: RowItem, columnItem: ColumnItem) => any;

    export type RowItem = {
        subs?: RowItem[];
        innerBorder?: boolean;
        [key: string]: any;
    } | any[];

    export type ColumnItem = {
        id?: string;
        name?: string;
        align?: 'left' | 'right' | 'center' | string;
        type?: string;
        minWidth?: number;
        maxWidth?: number;
        formatter?: ColumnFormatter;
        [key: string]: any;
    } | string;

    export interface GridOptions {
        silent?: boolean;
        headerVisible?: boolean;

        padding?: number;
        defaultMinWidth?: number;
        defaultMaxWidth?: number;

        sortField?: string;
        sortAsc?: boolean;
        sortIcon?: string;

        treeId?: string;
        treeIcon?: string;
        treeLink?: string;
        treeLast?: string;
        treeIndent?: string;

        nullPlaceholder?: string;

        // border definition:
        // H: horizontal, V: vertical
        // T: top, B: bottom, L: left, R: right, C: center
        borderH?: string;
        borderV?: string;
        borderTL?: string;
        borderTC?: string;
        borderTR?: string;
        borderCL?: string;
        borderCC?: string;
        borderCR?: string;
        borderBL?: string;
        borderBC?: string;
        borderBR?: string;

        getCharLength?: (str: string) => number;

        defaultTreeFormatter?: ColumnFormatter;
        defaultFormatter?: ColumnFormatter;
    }

    export interface GridData {
        options?: GridOptions;
        columns: ColumnItem[];
        rows: RowItem[];
        [key: string]: any;
    }

    export class ConsoleGrid {
        constructor(data: GridData);
        render(): string[];
    }
}

declare function CG(data: CG.GridData): string[];

export = CG;