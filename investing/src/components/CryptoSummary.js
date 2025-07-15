import React, { useEffect, useState } from "react";
import { fetchCoinSummary } from "../utils/api";

function CryptoSummary({ coinId }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let timer;
    let mounted = true;

    async function load() {
      const data = await fetchCoinSummary(coinId);
      if (mounted) setSummary(data);
    }
    load();
    timer = setInterval(load, 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [coinId]);

  if (!summary) {
    return (
      <div className="summary-container">
        <span>로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <span className="summary-label">현재가</span>
      <span className="summary-value">{summary.price.toLocaleString()} USD</span>
      <span className="summary-label">24H 변동</span>
      <span className={`summary-value ${summary.change >= 0 ? "summary-up" : "summary-down"}`}>
        {summary.change >= 0 ? "+" : ""}
        {summary.change.toFixed(2)}%
      </span>
      <span className="summary-label">고가</span>
      <span className="summary-value">{summary.high.toLocaleString()} USD</span>
      <span className="summary-label">저가</span>
      <span className="summary-value">{summary.low.toLocaleString()} USD</span>
    </div>
  );
}

export default CryptoSummary;