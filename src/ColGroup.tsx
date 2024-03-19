import React, { memo } from 'react';
import { KbjTableColumn } from './types';

interface ColGroupProps {
  firstColWidth: number;
  columns?: KbjTableColumn[];
}

function ColGroup(props: ColGroupProps) {
  const { firstColWidth, columns } = props;

  return (
    <>
      <col style={{ width: firstColWidth }} />
      {columns?.map((col, colIdx) => {
        return <col key={colIdx} style={{ width: col.width }} />;
      })}
    </>
  );
}

export default memo(ColGroup);
