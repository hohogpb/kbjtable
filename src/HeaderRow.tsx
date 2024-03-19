import React, { memo } from 'react';
import { KbjTableColumn } from './types';

interface HeaderRowProps {
  columns?: KbjTableColumn[];
  firstRowHeight: number;
}

function HeaderRow(props: HeaderRowProps) {
  const { columns, firstRowHeight } = props;

  return (
    <tr>
      <th style={{ height: firstRowHeight }} />
      {columns?.map((col, colIdx) => {
        return (
          <th style={{ height: firstRowHeight }} key={colIdx}>
            {col.title}
          </th>
        );
      })}
    </tr>
  );
}

export default memo(HeaderRow);
