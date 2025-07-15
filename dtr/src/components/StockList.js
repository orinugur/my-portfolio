import React, { useState, useEffect } from "react";
import StockDetail from "./StockDetail";
import { fetchStockList } from "../utils/api";

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchStockList()
      .then(data => {
        if (mounted) {
          setStocks(data);
          setLoading(false);
        }
      })
      .catch(e => {
        setError("주식 정보를 불러오지 못했습니다.");
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>주식 목록</h2>
      <ul>
        {stocks.map(stock => (
          <li key={stock.symbol} onClick={() => setSelected(stock)}>
            {stock.name} ({stock.symbol}) - ${stock.price}
          </li>
        ))}
      </ul>
      {selected && <StockDetail stock={selected} />}
    </div>
  );
}

export default StockList;