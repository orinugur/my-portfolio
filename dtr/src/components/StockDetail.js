import React from "react";

function StockDetail({ stock }) {
  if (!stock) return null;
  return (
    <div style={{ marginTop: "16px" }}>
      <h3>상세 정보</h3>
      <table>
        <tbody>
          <tr>
            <td>종목명</td>
            <td>{stock.name}</td>
          </tr>
          <tr>
            <td>심볼</td>
            <td>{stock.symbol}</td>
          </tr>
          <tr>
            <td>현재가</td>
            <td>${stock.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StockDetail;