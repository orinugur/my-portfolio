import React from 'react';
import '../styles/Cell.css';

function Cell({ value }) {
  const cellStyle = {
    background: value ? value : '#222',
    border: value ? '1px solid #444' : '1px solid #333'
  };
  return <div className="cell" style={cellStyle}></div>;
}

export default Cell;