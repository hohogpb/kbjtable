import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  HTableCellCord,
  KbjTableCellDetail,
  KbjTableColumn,
} from './types';

interface KbjTableContextProp {
  columns: KbjTableColumn[];
  data?: any[];
  height: number;
  firstColWidth: number;
  firstRowHeight: number;
  selectedCell?: HTableCellCord;
  isSelectedCell: (rowIdx: number, colIdx: number) => boolean;
  editingCell?: HTableCellCord;
  isEditingCell: (rowIdx: number, colIdx: number) => boolean;
  setSelectedCell: (cord: HTableCellCord | undefined) => void;
  setEditingCell: (cord: HTableCellCord | undefined) => void;
  getRowHeight: (rowIdx: number) => number;
  columnsWidth?: number[];
  setColumnsWidth: (widths: number[] | undefined) => void;
  colPositions?: number[];
  rowPositions: number[];
  rowCount: number;
  onChangeCell: (e: any, detail: KbjTableCellDetail, tag: any) => void;
}

const KbjTableContext = createContext<KbjTableContextProp>({
  columns: [],
  height: 260,
  data: [],
  firstColWidth: 0,
  firstRowHeight: 0,
  isSelectedCell: (rowIdx: number, colIdx: number) => false,
  isEditingCell: (rowIdx: number, colIdx: number) => false,
  setSelectedCell: (cord: HTableCellCord | undefined) => {},
  setEditingCell: (cord: HTableCellCord | undefined) => {},
  getRowHeight: (rowIdx: number) => 0,
  columnsWidth: [],
  setColumnsWidth: (widths: number[] | undefined) => {},
  rowPositions: [],
  rowCount: 0,
  onChangeCell: (e: any, detail: KbjTableCellDetail, tag: any) => {},
});

export const useKbjTable = () => useContext(KbjTableContext);

export interface KbjTableProviderRefProp {
  setSelectedCell: (cord: HTableCellCord | undefined) => void;
  setEditingCell: (cord: HTableCellCord | undefined) => void;
}

export interface KbjTableProviderProp {
  children?: React.ReactNode;
  data: any[];
  columns: KbjTableColumn[];
  onChangeCell: (e: any, detail: KbjTableCellDetail, tag: any) => void;
}

export const KbjTableProvider = forwardRef<
  KbjTableProviderRefProp,
  KbjTableProviderProp
>((props, ref) => {
  useImperativeHandle(ref, () => ({ setSelectedCell, setEditingCell }), []);

  const { data, columns } = props;
  // <<< 必要
  const height = 260;

  const [firstColWidth, setFirstColWidth] = useState(50);
  const [firstRowHeight, setFirstRowHeight] = useState(30);
  const [selectedCell, setSelectedCell] = useState<HTableCellCord>();
  const [editingCell, setEditingCell] = useState<HTableCellCord>();
  const [columnsWidth, setColumnsWidth] = useState<number[]>();

  const isSelectedCell = useCallback(
    (rowIdx: number, colIdx: number) => {
      return selectedCell?.rowIdx === rowIdx && selectedCell?.colIdx === colIdx;
    },
    [selectedCell]
  );

  const isEditingCell = useCallback(
    (rowIdx: number, colIdx: number) => {
      return editingCell?.rowIdx === rowIdx && editingCell?.colIdx === colIdx;
    },
    [editingCell]
  );

  // 获取行高
  const getRowHeight = useCallback((rowIdx: number) => {
    return 29;
  }, []);

  const onChangeCell = (e: any, detail: KbjTableCellDetail, tag: any) => {
    // console.log("change cell", e, detail);
    props.onChangeCell?.(e, detail, tag);
  };

  // 数据行数
  const rowCount = data?.length || 0;
  const colCount = columns?.length || 0;

  // 每一行的开始高度位置
  const rowPositions = useMemo(() => {
    let results = [firstRowHeight];
    for (let i = 1; i < rowCount; i++) {
      results.push(results[i - 1] + getRowHeight(i - 1));
    }
    return results;
  }, [firstRowHeight, getRowHeight, rowCount]);

  const colPositions = useMemo(() => {
    if (!columnsWidth || columnsWidth.length <= 0) {
      return undefined;
    }

    let results = [0];
    for (let i = 1; i < colCount + 1; i++) {
      results.push(results[i - 1] + columnsWidth[i - 1]);
    }
    results.shift();
    return results;
  }, [colCount, columnsWidth]);

  return (
    <KbjTableContext.Provider
      value={{
        columns,
        data,
        height,
        firstColWidth,
        firstRowHeight,
        selectedCell,
        isSelectedCell,
        setSelectedCell,
        editingCell,
        isEditingCell,
        setEditingCell,
        getRowHeight,
        columnsWidth,
        setColumnsWidth,
        colPositions,
        rowPositions,
        rowCount,
        onChangeCell,
      }}
    >
      {props.children}
    </KbjTableContext.Provider>
  );
});
