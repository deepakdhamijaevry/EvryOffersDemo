export interface EstimateTable {
    row: EstimateRow;
}

export interface EstimateRow {
    column: EstimateColumn[];
}

export interface EstimateColumn {
    columnCell: string;
}

export interface EstimateObject {
    estTitle: string;
    estTable: string;
}