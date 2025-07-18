# 비트코인 차트 사이트

React(CRA) 기반의 비트코인 실시간 시세 차트 SPA입니다.

## 주요 기능
- 7일간 비트코인(USD) 가격 변동 SVG 차트
- Coingecko 공개 API 연동 (API KEY 불필요)
- 데이터 5분 캐싱, 네트워크 오류 시 에러 안내
- CRA 구조, CSS 파일 분리, 자동 배포(postbuild) 지원

## 폴더 구조
```
/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   └── Chart.js
│   ├── styles/
│   │   ├── App.css
│   │   └── Chart.css
│   └── utils/
│       └── api.js
├── package.json
├── README.md
├── .gitignore
```

## 실행 방법
1. 의존성 설치  
   ```
   npm install
   ```
2. 개발 서버 실행  
   ```
   npm start
   ```
3. 빌드 및 자동 배포 파일 복사  
   ```
   npm run build
   ```

## 배포 주소 예시
https://orinugur.github.io/my-portfolio123/bitcoin-chart/

---

## Q&A 누적

Q: 비트코인 차트사이트 만들어줘  
A: CRA 구조로 폴더/파일 분리, 공개 API 연동, 캐싱/에러처리, 자동 배포(postbuild) 등 요구사항에 맞춰 설계 및 파일 생성 진행

Q: index.html, index.js 등 CRA 필수 구조 오류 발생 시 어떻게 해결했나?  
A: CRA(react-scripts)는 public/index.html, src/index.js가 반드시 필요하므로, 각각 해당 위치에 파일을 생성해 오류를 해결함. 또한 포트 충돌 시 자동으로 다른 포트(3001 등)로 실행되도록 허용함.
