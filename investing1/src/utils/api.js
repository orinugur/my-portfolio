/**
 * 코인게코 API 연동 (https://www.coingecko.com/ko/api)
 * - fetchCoinOHLC: 24시간(1분봉) OHLC 데이터 (1분 캐시)
 * - fetchCoinSummary: 현재가, 24H 변동률, 고가, 저가 (1분 캐시)
 */

const COINGECKO_API = "https://api.coingecko.com/api/v3";

// 코인별 1분 캐시
const ohlcCache = {};
const summaryCache = {};

export async function fetchCoinOHLC(coinId) {
  const now = Date.now();
  if (
    ohlcCache[coinId] &&
    now - ohlcCache[coinId].ts < 60 * 1000 &&
    Array.isArray(ohlcCache[coinId].data)
  ) {
    return ohlcCache[coinId].data;
  }
  const url = `${COINGECKO_API}/coins/${coinId}/ohlc?vs_currency=usd&days=1`;
  try {
    const res = await fetch(url);
    const arr = await res.json();
    const data = arr.map(([timestamp, open, high, low, close]) => ({
      time: Math.floor(timestamp / 1000),
      open, high, low, close
    }));
    ohlcCache[coinId] = { data, ts: now };
    return data;
  } catch (e) {
    return ohlcCache[coinId]?.data || [];
  }
}

export async function fetchCoinSummary(coinId) {
  const now = Date.now();
  if (
    summaryCache[coinId] &&
    now - summaryCache[coinId].ts < 60 * 1000 &&
    summaryCache[coinId].data
  ) {
    return summaryCache[coinId].data;
  }
  const url = `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${coinId}`;
  try {
    const res = await fetch(url);
    const [data] = await res.json();
    const summary = {
      price: data.current_price,
      change: data.price_change_percentage_24h,
      high: data.high_24h,
      low: data.low_24h
    };
    summaryCache[coinId] = { data: summary, ts: now };
    return summary;
  } catch (e) {
    return summaryCache[coinId]?.data || null;
  }
}