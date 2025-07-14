import React from "react";
import "./Cell.css";

function Cell({ type }) {
  return <div className={`cell ${type}`} />;
}

export default Cell;