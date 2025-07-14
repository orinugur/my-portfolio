# React 테트리스 게임

## 소개
- 이 프로젝트는 React 함수형 컴포넌트와 CRA(react-scripts) 기반으로 제작된 테트리스 게임입니다.
- useState, useEffect 훅을 활용해 블록 상태와 게임 흐름을 관리합니다.
- CSS-in-JS, styled-components 없이, 일반 CSS 파일로 스타일링합니다.

## 폴더/파일 구조
```
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── components/
│   │   ├── Board.js
│   │   └── Cell.js
│   ├── styles/
│   │   ├── Board.css
│   │   └── Cell.css
│   └── utils/
│       └── tetrominoes.js
├── package.json
└── README.md
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
   - 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 게임 방법
- 방향키(←, →, ↓, ↑)로 블록을 이동/회전시킬 수 있습니다.
- 한 줄이 모두 채워지면 자동으로 삭제되고 점수가 올라갑니다.
- 블록이 쌓여 더 이상 내려갈 수 없으면 게임 오버가 됩니다.
- "다시 시작" 버튼으로 게임을 재시작할 수 있습니다.

---

## Q&A

Q: 테트리스 게임 만들어줘  
A: React 함수형 컴포넌트, useState/useEffect 기반 CRA 구조로 테트리스 게임 전체 구현.  
- App.js, Board.js, Cell.js, tetrominoes.js 등으로 폴더 분리  
- CSS-in-JS/styled-components 미사용, 일반 CSS 파일로 스타일링  
- package.json에 react 등 의존성 추가, npm install/ start 명령어 안내  
- public/index.html 등 CRA 필수 파일 자동 생성  
- README.md에 구조/실행/사용법/Q&A 작성 및 누적 관리