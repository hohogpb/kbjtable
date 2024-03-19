import React, { memo } from 'react';
import { useKbjTable } from './KbjTableContext';
import { KbjTableCellDetail, KbjTableColumn } from './types';

interface MasterTableCellProp {
  column: KbjTableColumn;
  dataRow: any;
  rowIdx: number;
  colIdx: number;
}

function MasterTableCell(props: MasterTableCellProp) {
  const { column, dataRow, rowIdx, colIdx } = props;

  const { setSelectedCell, setEditingCell, getRowHeight } = useKbjTable();

  const cellValue = column.dataIndex && dataRow[column.dataIndex];
  const cellRender = column.render;
  const cell = cellRender ? cellRender(cellValue, rowIdx, dataRow) : cellValue;

  const detail = { dataRow, rowIdx, column, colIdx, cell };
  const rowHeight = getRowHeight(rowIdx);

  function onClickCell(
    e: React.MouseEvent<HTMLElement>,
    detail: KbjTableCellDetail
  ) {
    e.preventDefault();

    const { rowIdx, colIdx } = detail;
    // message.info(`点击了${rowIdx}行 ${colIdx}列`);

    if (!detail.column.editable) return;

    setSelectedCell({ rowIdx, colIdx });
    setEditingCell(undefined);
  }

  return (
    <td
      style={{ position: 'relative', height: rowHeight }}
      //onClick={(e) => onClickCell(e, detail)}
      onMouseDown={e => onClickCell(e, detail)}
    >
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          //...(isEditing && { visibility: "hidden" }),
          //userSelect: "none",
          textAlign: column.align,
        }}
      >
        {cell}
      </div>
    </td>
  );
}

export default memo(MasterTableCell);
