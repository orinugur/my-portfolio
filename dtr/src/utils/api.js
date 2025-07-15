// stooq.com 공개 API를 활용한 주식 목록 fetch 함수
// 캐싱(localStorage), 네트워크 오류 시 fallback 데이터 제공
const API_URL = "https://stooq.com/q/l/?s=aapl,tsla,googl&f=sd2t2ohlcv&h&e=JSON";
const CACHE_KEY = "stockListCache";
const CACHE_TIME = 60 * 5 * 1000; // 5분

export async function fetchStockList() {
  // 캐시 확인
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIME) {
      return data;
    }
  }
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API 오류");
    const json = await res.json();
    // stooq API 데이터 파싱
    const data = (json && json.quotes) ? json.quotes.map(item => ({
      symbol: item.symbol,
      name: item.name,
      price: Number(item.close)
    })) : [];
    // 캐시 저장
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
  } catch (e) {
    // 네트워크 오류 시 fallback 데이터
    return [
      { symbol: "AAPL", name: "Apple Inc.", price: 210.12 },
      { symbol: "GOOGL", name: "Alphabet Inc.", price: 3120.55 },
      { symbol: "TSLA", name: "Tesla Inc.", price: 720.33 }
    ];
  }
}