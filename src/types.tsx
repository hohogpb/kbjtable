import { CSSProperties } from "react";

export interface KbjTableColumn {
  title?: string;
  dataIndex?: string;
  render?: (value: any, index: number, record: any) => any;
  width?: string | number;
  align?: "left" | "right" | "center";
  editable?: boolean;
  editor?: any;
}

export interface KbjTableProps {
  style?: CSSProperties;
  data?: any[];
  columns?: KbjTableColumn[];
  onEditingChangeCell?: (detail: KbjTableCellDetail, value: any) => any;
}

export interface HTableCellCord {
  rowIdx: number;
  colIdx: number;
}

export interface KbjTableCellDetail {
  dataRow: any;
  rowIdx: number;
  column: KbjTableColumn;
  colIdx: number;
  cell: any;
}
