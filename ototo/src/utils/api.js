import axios from "axios";

// 7일간 비트코인 가격 데이터(USD) 조회, 캐싱 적용
let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5분

export async function fetchBitcoinMarketChart() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_DURATION) {
    return cache;
  }
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
      {
        params: {
          vs_currency: "usd",
          days: 7,
        },
      }
    );
    cache = res.data.prices;
    cacheTime = now;
    return cache;
  } catch (e) {
    throw new Error("API 요청 실패");
  }
}