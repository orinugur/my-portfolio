import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { fetchCoinOHLC } from "../utils/api";

function CryptoChart({ coinId }) {
  const chartRef = useRef(null);
  const [ohlc, setOhlc] = useState([]);

  // 1분마다 데이터 갱신
  useEffect(() => {
    let timer;
    let mounted = true;

    async function load() {
      const data = await fetchCoinOHLC(coinId);
      if (mounted) setOhlc(data);
    }
    load();
    timer = setInterval(load, 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [coinId]);

  // 차트 렌더링
  useEffect(() => {
    if (!ohlc.length) return;
    let chart;
    let series;
    let resizeObserver;
    let destroyed = false;

    if (!chartRef.current) return;

    chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth || 350,
      height: 340,
      layout: {
        background: { color: "#181818" },
        textColor: "#eee",
      },
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" },
      },
      timeScale: {
        borderColor: "#333",
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: "#333",
      },
      crosshair: {
        mode: 0,
      },
    });

    series = chart.addCandlestickSeries({
      upColor: "#00e676",
      downColor: "#ff5252",
      borderUpColor: "#00e676",
      borderDownColor: "#ff5252",
      wickUpColor: "#00e676",
      wickDownColor: "#ff5252",
    });

    series.setData(ohlc);

    chart.timeScale().fitContent();
    chart.timeScale().scrollToPosition(0, false);

    resizeObserver = new ResizeObserver(() => {
      if (chart && chartRef.current) {
        chart.applyOptions({ width: chartRef.current.clientWidth });
      }
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      destroyed = true;
      if (resizeObserver && chartRef.current) {
        resizeObserver.unobserve(chartRef.current);
      }
      if (chart) {
        chart.remove();
      }
    };
  }, [ohlc, coinId]);

  return (
    <div className="chart-container">
      <h2>{coinId === "bitcoin" ? "비트코인" : "이더리움"} 24시간 가격 차트</h2>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          minWidth: 320,
          height: 340,
          minHeight: 240,
          background: "#181818",
        }}
      />
    </div>
  );
}

export default CryptoChart;