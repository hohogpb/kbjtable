import React, { memo, useMemo } from 'react';
import styles from './KbjTable.module.scss';

interface SeqRowsProp {
  visibleRowCount: number;
  startRow: number;
  getRowHeight: (rowIdx: number) => number;
}

function SeqRows(props: SeqRowsProp) {
  const { visibleRowCount, startRow, getRowHeight } = props;

  const fillRows = useMemo(() => {
    return new Array(visibleRowCount).fill(null);
  }, [visibleRowCount]);

  return (
    <>
      {fillRows.map((_, index) => {
        const rowIdx = index + startRow;
        const rowHeight = getRowHeight(rowIdx);
        return (
          <tr key={rowIdx}>
            <th style={{ height: rowHeight, textAlign: 'center' }}>
              {rowIdx + 1}
            </th>
          </tr>
        );
      })}
    </>
  );
}

interface LeftCloneTableProp {
  firstColWidth: number;
  firstRowHeight: number;
  visibleRowCount: number;
  startRow: number;
  getRowHeight: (rowIdx: number) => number;
}

function LeftCloneTable(props: LeftCloneTableProp) {
  const {
    firstColWidth,
    firstRowHeight,
    visibleRowCount,
    startRow,
    getRowHeight,
  } = props;

  return (
    <table className={styles.editable}>
      <colgroup>
        <col style={{ width: firstColWidth }} />
      </colgroup>

      <thead>
        <tr>
          <th style={{ height: firstRowHeight }} />
        </tr>
      </thead>

      <tbody>
        <SeqRows
          visibleRowCount={visibleRowCount}
          startRow={startRow}
          getRowHeight={getRowHeight}
        />
      </tbody>
    </table>
  );
}

export default memo(LeftCloneTable);
