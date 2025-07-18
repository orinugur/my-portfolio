# Crypto Trading Dashboard

비트코인, 이더리움 실시간 트레이딩 대시보드 SPA  
- 좌우 슬라이드로 24시간 가격 차트 확인  
- 최근 24시간 가격, 변동률, 고가/저가 한 페이지에서 확인  
- 블랙 테마, 일관성 있는 UI  
- React(CRA), lightweight-charts, CoinGecko API 연동

## 주요 기능
- 비트코인/이더리움 실시간 24시간 캔들 차트(좌우 스크롤)
- 현재가, 24H 변동률, 고가/저가 요약
- 블랙 테마, 반응형 UI
- CRA(react-scripts) 기반 SPA, 정적 빌드 자동 복사(postbuild)
- Q&A 누적 관리

## 실행 방법
1. 의존성 설치  
   ```
   npm install
   ```
2. 개발 서버 실행  
   ```
   npm start
   ```
3. 빌드 및 정적 배포  
   ```
   npm run build
   ```
   - build 폴더의 정적 파일이 루트로 자동 복사됨(postbuild)
   - git add, commit, push 후  
     https://orinugur.github.io/my-portfolio123/crypto-dashboard/  
     에서 SPA 정상 동작 확인

## 폴더 구조
```
index.html
package.json
public/
  index.html
src/
  App.js
  App.css
  index.js
  components/
    CryptoChart.js
    CryptoSummary.js
  utils/
    api.js
README.md
```

## Q&A 누적 기록

Q: 비트코인가격 트레이딩 대시보드, 좌우 슬라이드하여 시간에따라 볼수 있께해야하고 최근 24시간 가격,확인가능하게 하고 이더리움등의 변동이 몇% 인지한페이지에서 볼 수 있게해줘 기본적으로 블랙에 ui도 일괄성있게만들어줘  
A: 기존 파일/코드 모두 삭제 후, CRA(react-scripts) 기반으로 비트코인/이더리움 실시간 트레이딩 대시보드 SPA를 새로 설계. CoinGecko API 연동, lightweight-charts 기반 24시간 캔들 차트, 24H 변동률/고가/저가 요약, 블랙 테마, 반응형 UI, Q&A 누적까지 모두 반영함.
