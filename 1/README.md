# React Tetris

이 프로젝트는 React(CRA 구조)로 구현된 간단한 테트리스 게임입니다.

## 폴더 구조
- src/App.tsx: 메인 앱 컴포넌트
- src/components/Tetris.tsx: 테트리스 게임 로직 및 UI
- 기타 CRA/Vite 기본 파일

## 실행 방법
1. 필요한 패키지 설치  
   ```
   npm install
   ```
2. 개발 서버 실행  
   ```
   npm start
   ```
   또는  
   ```
   npm run dev
   ```

## 사용 기술
- React (함수형 컴포넌트, useState, useEffect)
- TypeScript
- CSS 파일(모듈/일반)

---

## Q&A

Q: src/App.tsx, src/components/Tetris.tsx에서 TS6133(미사용 변수) 에러가 발생합니다.

A: 사용되지 않는 import(React, useRef)와 setBoard 변수를 제거하여 TS6133 에러를 해결했습니다.  
- App.tsx: React import 삭제  
- Tetris.tsx: React, useRef import 삭제 및 setBoard 구조분해 제거

---

Q: Vite dev 서버 실행 시 "@vitejs/plugin-react" 패키지 누락 및 entry 파일(main.ts) 관련 에러가 발생합니다.

A:  
- package.json의 devDependencies에 "@vitejs/plugin-react"를 추가하고, `npm install`로 의존성을 설치했습니다.
- index.html의 entry point를 `/src/main.ts`에서 `/src/main.tsx`로 수정했습니다.
- 이후 `npm run dev`로 서버가 정상적으로 기동됨을 확인했습니다.

---

Q: 깃허브 페이지 배포 시 "Vite + TS"만 보이고, 실제 React 앱이 렌더링되지 않습니다.

A:  
- index.html의 mount 타겟이 `<div id="app"></div>`로 되어 있었으나, main.tsx에서 `document.getElementById("root")`로 렌더링하고 있어 불일치가 발생했습니다.
- index.html의 div id를 "root"로 수정하여 React 앱이 정상적으로 렌더링되도록 반영했습니다.
