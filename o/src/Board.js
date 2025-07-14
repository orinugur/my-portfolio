import React from "react";
import Cell from "./Cell";
import { BOARD_WIDTH, BOARD_HEIGHT } from "./utils";

function Board({ board }) {
  return (
    <div className="board">
      {board.map((row, y) => (
        <div className="board-row" key={y}>
          {row.map((cell, x) => (
            <Cell key={x} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;