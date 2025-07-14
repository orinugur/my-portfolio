# 갤러그 클론 (Galaga Clone)

React 함수형 컴포넌트와 useState, useEffect 훅을 활용해 만든 간단한 갤러그 게임입니다.  
CRA(react-scripts) 기반 구조로, CSS-in-JS/styled-components 없이 일반 CSS 파일로 스타일링했습니다.

---

## 🕹️ 게임 소개

- 방향키(←, →)로 플레이어 우주선을 좌우로 이동
- 스페이스바로 총알 발사
- 모든 적을 제거하면 클리어, 적과 충돌하면 게임 오버
- 점수는 적을 맞출 때마다 100점씩 증가

---

## 📁 폴더/파일 구조

```
galaga-clone/
├─ public/
│  └─ index.html
├─ src/
│  ├─ App.js
│  ├─ App.css
│  ├─ Board.js
│  ├─ Board.css
│  ├─ Cell.js
│  ├─ Cell.css
│  ├─ utils.js
│  └─ index.js
├─ package.json
└─ README.md
```

---

## ⚙️ 설치 및 실행 방법

1. **의존성 설치**
   ```
   npm install
   ```
2. **개발 서버 실행**
   ```
   npm start
   ```
   브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🛠️ 주요 구현 방법

- **React 함수형 컴포넌트**: App, Board, Cell로 분리
- **상태 관리**: useState로 플레이어, 적, 총알, 점수, 게임 상태 관리
- **게임 루프**: useEffect와 setInterval로 적 이동, 총알 이동, 충돌 판정 등 구현
- **키보드 입력**: window.addEventListener("keydown")로 방향키/스페이스바 처리
- **스타일링**: CSS 파일(.css)만 사용, CSS-in-JS/styled-components 미사용

---

## ❓ Q&A

### Q. CRA(react-scripts) 구조로 작성되었나요?
A. 네, public/index.html, src/App.js, src/Board.js 등 CRA 기본 구조를 따릅니다.

### Q. CSS-in-JS나 styled-components를 사용했나요?
A. 아니요, 모든 스타일은 .css 파일로 분리되어 있습니다.

### Q. 상태 관리는 어떻게 하나요?
A. useState와 useEffect 훅을 사용해 플레이어, 적, 총알, 점수, 게임 흐름을 관리합니다.

### Q. 게임 조작법은?
A. 방향키(←, →)로 이동, 스페이스바로 총알 발사, 모든 적을 제거하면 클리어입니다.

---

## 📝 사용법

1. 개발 서버 실행 후 브라우저에서 접속
2. 방향키(←, →)로 플레이어 이동
3. 스페이스바로 총알 발사
4. 모든 적을 제거하면 클리어, 적과 충돌하면 게임 오버

---

## 🔄 이후 질문/답변(Q&A)은 README 하단에 계속 추가됩니다.