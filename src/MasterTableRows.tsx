import React, { memo, useMemo } from 'react';
import { KbjTableColumn } from './types';
import MasterTableRow from './MasterTableRow';

interface MasterTableRowsProp {
  startRow: number;
  visibleRowCount: number;
  data?: any[];
  columns?: KbjTableColumn[];
}

function MasterTableRows(props: MasterTableRowsProp) {
  const { startRow, visibleRowCount, data, columns } = props;

  const rows = useMemo(() => new Array(visibleRowCount).fill(null), [
    visibleRowCount,
  ]);

  return (
    <>
      {rows.map((e, index) => {
        const rowIdx = index + startRow;
        const dataRow = data?.[rowIdx];

        return (
          <MasterTableRow
            key={rowIdx}
            rowIdx={rowIdx}
            dataRow={dataRow}
            columns={columns}
          />
        );
      })}
    </>
  );
}

export default memo(MasterTableRows);
