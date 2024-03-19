import React, { memo } from 'react';
import styles from './KbjTable.module.scss';
import { useKbjTable } from './KbjTableContext';
import { TextEditor } from './TextEditor';

// 这个相对于
function EditInputHolder(props: any) {
  const {
    getRowHeight,
    setEditingCell,
    onChangeCell,
    editingCell,
    rowPositions,
    colPositions,
    columnsWidth,
    columns,
    data,
  } = useKbjTable();

  // console.log("editinput render");

  if (!editingCell) return null;
  if (!colPositions) return null;

  const cellTop = rowPositions[editingCell.rowIdx];
  const cellleft = colPositions[editingCell.colIdx];
  const cellWidth = columnsWidth?.[editingCell.colIdx + 1];
  const cellHeight = getRowHeight(editingCell.rowIdx);
  const column = columns[editingCell.colIdx];
  const dataRow = data?.[editingCell.rowIdx];
  const rowIdx = editingCell.rowIdx;
  const colIdx = editingCell.colIdx;

  const cellValue = column.dataIndex && dataRow[column.dataIndex];
  const cellRender = column.render;
  const cell = cellRender ? cellRender(cellValue, rowIdx, dataRow) : cellValue;
  const CellEditor = column.editor || TextEditor;

  const detail = { dataRow, rowIdx, column, colIdx, cell };

  function onEditingBlur(e: React.FocusEvent<HTMLElement>) {
    //setEditingCell(undefined);
  }

  function onChange(e: any, tag: any) {
    onChangeCell(e.target?.value || e, detail, tag);
  }

  return (
    <div
      className={styles.editPlaceholder}
      style={{
        position: 'absolute',
        //background: "blue",
        width: cellWidth,
        height: cellHeight,
        left: cellleft,
        top: cellTop,
        boxSizing: 'border-box',        
      }}
    >
      <CellEditor
        //style={{width: "100%"}}
        value={cellValue}
        //defaultValue={cellValue}
        title={cellValue}
        autoFocus
        onChange={onChange}
        onBlur={onEditingBlur}
      />
    </div>
  );
}

export default memo(EditInputHolder);
