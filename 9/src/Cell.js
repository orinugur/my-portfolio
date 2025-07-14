import React from 'react';
import './Cell.css';

function Cell({ value }) {
  return (
    <div className={`Cell${value ? ' filled' : ''}`} style={value ? { background: value } : {}} />
  );
}

export default Cell;