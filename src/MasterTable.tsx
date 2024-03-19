import React, { memo, useCallback } from 'react';
import ColGroup from './ColGroup';
import HeaderRow from './HeaderRow';
import { KbjTableColumn } from './types';
import MasterTableRows from './MasterTableRows';
import { useKbjTable } from './KbjTableContext';
import { GlobalResizeObserver } from './GlobalResizeObserver';

interface MasterTableProp {
  firstColWidth: number;
  firstRowHeight: number;
  columns?: KbjTableColumn[];
  startRow: number;
  visibleRowCount: number;
  data?: any[];
}

function MasterTable(props: MasterTableProp) {
  const { startRow, visibleRowCount } = props;

  const {
    setColumnsWidth,
    columnsWidth,
    data,
    columns,
    firstColWidth,
    firstRowHeight,
  } = useKbjTable();

  const onResize = useCallback(
    (target: HTMLTableElement) => {
      // Handle the resize event
      // console.log("table size change ", target.clientWidth);

      const colgroup = target.querySelector('colgroup');
      if (!colgroup) return;
      const cols = colgroup.querySelectorAll<HTMLTableColElement>('col');
      const widths = Array.from(cols).map(col => col.offsetWidth);
      setColumnsWidth(widths);
    },
    [setColumnsWidth]
  );


  const tableRef = useCallback(
    (node: HTMLTableElement) => {
      if (!node) {
        //GlobalResizeObserver.unobserve(node);
        return;
      }
      GlobalResizeObserver.observe(node, (target: HTMLTableElement) => {
        // Handle the resize event
        // console.log("table size change ", node.clientWidth);

        const colgroup = node.querySelector('colgroup');
        if (!colgroup) return;
        const cols = colgroup.querySelectorAll<HTMLTableColElement>('col');
        const widths = Array.from(cols).map(col => col.offsetWidth);
        setColumnsWidth(widths);
      });
    },
    [setColumnsWidth]
  );

  //console.log("master render:", columnsWidth);
  return (
    <table ref={tableRef}>
      <colgroup>
        <ColGroup firstColWidth={firstColWidth} columns={props.columns} />
      </colgroup>

      <thead>
        <HeaderRow firstRowHeight={firstRowHeight} columns={props.columns} />
      </thead>

      <tbody>
        <MasterTableRows
          startRow={startRow}
          visibleRowCount={visibleRowCount}
          data={data}
          columns={columns}
        />
      </tbody>
    </table>
  );
}

export default memo(MasterTable);
