import React from 'react';
import Cell from './Cell';
import '../styles/Board.css';

function Board({ board, current, position, gameOver }) {
  // 현재 블록을 보드에 임시로 합쳐서 렌더링
  const displayBoard = board.map(row => [...row]);
  if (!gameOver) {
    current.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (
            boardY >= 0 &&
            boardY < displayBoard.length &&
            boardX >= 0 &&
            boardX < displayBoard[0].length
          ) {
            displayBoard[boardY][boardX] = current.color;
          }
        }
      });
    });
  }

  return (
    <div className="board">
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <Cell key={`${y}-${x}`} value={cell} />
        ))
      )}
    </div>
  );
}

export default Board;