import React from 'react';
import Cell from './Cell';
import './Board.css';

function Board({ board, current, preview }) {
  // 현재 블록을 보드에 임시로 합쳐서 렌더링
  const displayBoard = board.map(row => [...row]);
  if (current && current.shape) {
    current.shape.forEach((r, i) => {
      r.forEach((cell, j) => {
        if (cell) {
          const rowIdx = current.row + i;
          const colIdx = current.col + j;
          if (
            rowIdx >= 0 &&
            rowIdx < displayBoard.length &&
            colIdx >= 0 &&
            colIdx < displayBoard[0].length
          ) {
            displayBoard[rowIdx][colIdx] = current.color;
          }
        }
      });
    });
  }

  return (
    <div className={`Board${preview ? ' preview' : ''}`}>
      {displayBoard.map((row, i) =>
        <div className="board-row" key={i}>
          {row.map((cell, j) =>
            <Cell key={j} value={cell} />
          )}
        </div>
      )}
    </div>
  );
}

export default Board;