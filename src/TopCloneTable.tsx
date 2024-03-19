import React, { memo } from 'react';
import styles from './KbjTable.module.scss';
import ColGroup from './ColGroup';
import { KbjTableColumn } from './types';
import HeaderRow from './HeaderRow';

interface TopCloneTableProps {
  firstColWidth: number;
  firstRowHeight: number;
  columns?: KbjTableColumn[];
}

function TopCloneTable(props: TopCloneTableProps) {
  const { firstColWidth, firstRowHeight, columns } = props;

  //const

  return (
    <table className={styles.editable}>
      <colgroup>
        <ColGroup firstColWidth={firstColWidth} columns={columns} />
      </colgroup>

      <thead>
        <HeaderRow firstRowHeight={firstRowHeight} columns={props.columns} />
      </thead>
    </table>
  );
}

export default memo(TopCloneTable);
