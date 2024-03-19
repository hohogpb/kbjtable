import React, { memo } from "react";
import { useKbjTable as useKbjTable } from "./KbjTableContext";

// 这个相对于
function Borders(props: any) {
  const {
    selectedCell,
    getRowHeight,
    firstColWidth,
    rowPositions,
    colPositions,
    columnsWidth,
    setEditingCell,
  } = useKbjTable();

  // console.log("border render");

  if (!selectedCell) return null;
  if (!colPositions) return null;

  const cellTop = rowPositions[selectedCell.rowIdx];
  const cellleft = colPositions[selectedCell.colIdx];
  const cellWidth = columnsWidth?.[selectedCell.colIdx + 1];
  const cellHeight = getRowHeight(selectedCell.rowIdx);

  function onDoubleClickCell(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    // console.log("cell render");
    // 使用此种方式进行edit有个问题，就是会刷新全部可视区域cell，性能不是最好
    // 好的方式是 根据现有条件计算出 绝对位置，用另外一个组件来显示编辑控件
    // 当然当前的方式是最简单的
    setEditingCell(selectedCell);
  }

  return (
    <div
      style={{
        position: "absolute",
        //background: "blue",
        width: cellWidth,
        height: cellHeight,
        left: cellleft,
        top: cellTop,
        border: "2px solid #5292f7",
        boxSizing: "border-box",
      }}
      onDoubleClick={onDoubleClickCell}
    ></div>
  );
}

export default memo(Borders);
