import React, { memo } from 'react';

interface LeftTopCloneTableProp {
  firstColWidth: number;
  firstRowHeight: number;
}

function LeftTopCloneTable(props: LeftTopCloneTableProp) {
  const { firstColWidth, firstRowHeight } = props;

  return (
    <table>
      <colgroup>
        <col style={{ width: firstColWidth }} />
      </colgroup>

      <thead>
        <tr>
          <th style={{ width: firstColWidth, height: firstRowHeight }}></th>
        </tr>
      </thead>
    </table>
  );
}

export default memo(LeftTopCloneTable);
