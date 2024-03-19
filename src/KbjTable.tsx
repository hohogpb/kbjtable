import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import styles from "./KbjTable.module.scss";
import TopCloneTable from "./TopCloneTable";
import LeftCloneTable from "./LeftCloneTable";
import LeftTopCloneTable from "./LeftTopCloneTable";
import MasterTable from "./MasterTable";
import EditInputHolder from "./EditInputHolder";
import Borders from "./Borders";
import { useKbjTable } from "./KbjTableContext";
import { findEndNode, findStartNode } from "./utils";
import { KbjTableProps } from "./types";
import { GlobalResizeObserver } from "./GlobalResizeObserver";

function KbjTable(props: KbjTableProps ) {
  const tableProps = {
    ...(props.style && { style: props.style }),
  };

  const {
    firstColWidth,
    firstRowHeight,
    getRowHeight,
    height,
    rowPositions,
    rowCount,
    columns,
    data,
  } = useKbjTable();

  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const cloneTopRef = useRef<HTMLDivElement>(null);
  const cloneTopHolderRef = useRef<HTMLDivElement>(null);
  const cloneLeftRef = useRef<HTMLDivElement>(null);
  const cloneLeftHolderRef = useRef<HTMLDivElement>(null);

  function onMasterScroll(e: React.UIEvent<HTMLDivElement>) {
    //console.log("scroll ", e);
    //if (cloneTopRef.current)

    if (cloneTopHolderRef.current)
      cloneTopHolderRef.current.scrollLeft = e.currentTarget.scrollLeft;
    //
    if (cloneLeftRef.current)
      cloneLeftRef.current.scrollTop = e.currentTarget.scrollTop;
    //cloneLeftHolderRef.current!!.scrollTop = e.currentTarget.scrollTop;

    setScrollTop(e.currentTarget.scrollTop);
    setScrollLeft(e.currentTarget.scrollLeft);
  }

  const onMasterResize = useCallback((target: HTMLDivElement) => {
    // Handle the resize event
    // console.log("size change ", target.clientWidth);

    if (cloneTopRef.current)
      cloneTopRef.current.style.width = `${target.clientWidth}px`;
    // cloneTopHolderRef.current!!.style.width = `${target.clientWidth}px`;
    //

    if (cloneLeftRef.current)
      cloneLeftRef.current.style.height = `${target.clientHeight}px`;

    // cloneLeftHolderRef.current!!.style.height = `${target.clientHeight}px`;
    //
    // cloneTopHolderRef.current!!.scrollLeft = target.scrollLeft;
    // cloneLeftHolderRef.current!!.scrollTop = target.scrollTop;
  }, []);

  const masterRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      GlobalResizeObserver.unobserve(node);
      return;
    }
    GlobalResizeObserver.observe(node, (target: HTMLDivElement) => {
      // console.log("viewport size change ", node.clientWidth);

      // 响应逻辑...
      if (cloneTopRef.current)
        cloneTopRef.current.style.width = `${node.clientWidth}px`;
      // cloneTopHolderRef.current!!.style.width = `${target.clientWidth}px`;
      //

      if (cloneLeftRef.current)
        cloneLeftRef.current.style.height = `${node.clientHeight}px`;
    });
  }, []);


  // <<< 一切从这里说起
  const renderAhead = 0;

  const totalHeight =
    rowPositions[rowCount - 1] + getRowHeight(rowCount - 1) + 1;

  // 第一个可视行
  const firstVisibleRow = useMemo(
    () => findStartNode(scrollTop, rowPositions, rowCount),
    [scrollTop, rowPositions, rowCount]
  );
  const startRow = Math.max(0, firstVisibleRow - renderAhead);

  // 最后一个可视行
  const lastVisibleRow = useMemo(
    () => findEndNode(rowPositions, firstVisibleRow, rowCount, height),
    [firstVisibleRow, rowPositions, rowCount, height]
  );
  const endRow = Math.min(rowCount - 1, lastVisibleRow + renderAhead);

  // 可视行数量
  const visibleRowCount = endRow - startRow + 1;

  // 起始位置在哪里
  const offsetY = rowPositions[startRow] - firstRowHeight;

  return (
    <>
      <div className={styles.editable} {...tableProps}>
        <div
          className={styles.viewport}
          onScroll={onMasterScroll}
          ref={masterRef}
          style={{
            height,
            width: "100%",
            overflow: "auto",
            position: "relative",
          }}
        >
          <div
            className={styles.virtualHolder}
            style={{
              overflow: "hidden",
              position: "relative",
              height: totalHeight,
              //width: totalWidth
            }}
          />

          <div style={{ position: "absolute", top: offsetY }}>
            <MasterTable
              firstColWidth={firstColWidth}
              firstRowHeight={firstRowHeight}
              startRow={startRow}
              visibleRowCount={visibleRowCount}
              data={data}
              columns={columns}
            />
          </div>

          <Borders />

          <EditInputHolder />
        </div>

        <div
          ref={cloneTopRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: firstRowHeight,
          }}
        >
          <div
            ref={cloneTopHolderRef}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <TopCloneTable
              firstRowHeight={firstRowHeight}
              firstColWidth={firstColWidth}
              columns={columns}
            />
          </div>
        </div>

        <div
          ref={cloneLeftRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: firstColWidth,
            overflow: "hidden",
          }}
        >
          <div
            style={{ height: totalHeight, width: 0, position: "relative" }}
          />

          <div style={{ position: "absolute", top: offsetY }}>
            <LeftCloneTable
              firstColWidth={firstColWidth}
              firstRowHeight={firstRowHeight}
              visibleRowCount={visibleRowCount}
              startRow={startRow}
              getRowHeight={getRowHeight}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: firstColWidth,
            height: firstRowHeight,
          }}
          className={styles.editable}
        >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <LeftTopCloneTable
              firstColWidth={firstColWidth}
              firstRowHeight={firstRowHeight}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(KbjTable);

/*
  
  <Container>
    <MasterTable>
      <Viewport>
        <Placeholder>
          <table />
        </Placeholder>
      </Viewport>
    </MasterTable>
  
    <TopCloneTable />
    <LeftCloneTable />
    <LeftTopCloneTable />
  </Container>;
  
  //*/
