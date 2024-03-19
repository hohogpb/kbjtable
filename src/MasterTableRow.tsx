import React, { memo } from 'react';
import { KbjTableColumn } from './types';
import MasterTableCell from './MasterTableCell';

interface MasterTableRowProp {
  rowIdx: number;
  dataRow: any;
  columns?: KbjTableColumn[];
}

function MasterTableRow(props: MasterTableRowProp) {
  const { rowIdx, dataRow, columns } = props;

  const firstColumnVisibility = 'visible';

  // console.log("MasterTableRow render");

  return (
    <tr>
      <th style={{ visibility: firstColumnVisibility }}>{rowIdx + 1}</th>

      {columns?.map((column, colIdx) => {
        return (
          <MasterTableCell
            key={colIdx}
            column={column}
            dataRow={dataRow}
            rowIdx={rowIdx}
            colIdx={colIdx}
          />
        );
      })}
    </tr>
  );
}

export default memo(MasterTableRow);
