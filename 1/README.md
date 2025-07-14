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

---

Q: 깃허브 페이지에서 여전히 "Vite + TS"만 보이고 앱이 렌더링되지 않습니다.

A:  
- vite.config.js의 base 경로를 실제 배포 주소(`/my-portfolio123/1/`)에 맞게 수정했습니다.
- `npm run build`로 빌드 후, gh-pages 패키지를 설치하고, package.json에 `"deploy": "gh-pages -d dist"` 스크립트를 추가했습니다.
- `npm run deploy`로 dist 폴더를 gh-pages 브랜치에 배포하여, 깃허브 페이지에서 React 앱이 정상적으로 렌더링되도록 처리했습니다.

---

Q: base: '/my-portfolio123/1/dist'로 해야 하는 것 아닌가요?

A:  
- Vite의 base 옵션은 "배포되는 루트 URL 경로"를 의미하며, dist는 포함하지 않아야 합니다.
- gh-pages는 dist 폴더의 내용을 실제 배포 주소(https://orinugur.github.io/my-portfolio123/1/)에 바로 올리므로, base는 '/my-portfolio123/1/'로 설정해야 JS/CSS 번들이 올바르게 로드됩니다.
- base에 dist를 포함하면 실제 번들 경로가 https://orinugur.github.io/my-portfolio123/1/dist/assets/xxx.js처럼 생성되어 404 에러가 발생합니다.
- 결론: base는 '/my-portfolio123/1/'로 설정하는 것이 맞습니다.

---

Q: .gitignore에 dist가 있어서 빌드 파일이 안 올라가는 것 아닌가요?

A:  
- .gitignore에 dist가 있어도, gh-pages 배포(npm run deploy)는 dist 폴더의 파일을 별도의 gh-pages 브랜치에 직접 push하므로, 메인 브랜치에는 dist가 올라가지 않지만 배포에는 영향이 없습니다.
- 즉, .gitignore에 dist가 있어도 gh-pages 배포에는 전혀 문제가 없습니다.
- 만약 gh-pages 브랜치에도 파일이 없거나, 페이지가 비어 있다면 base 경로, 배포 브랜치 설정, 캐시, github pages 설정 등을 추가로 점검해야 합니다.

---

Q: dist 폴더를 git 커밋에 포함하고 싶어요.

A:  
- 현재 .gitignore에 dist 관련 라인이 없으므로, 별도의 수정 없이 dist 폴더를 git add/commit에 포함할 수 있습니다.
- 즉, 바로 `git add dist` 후 커밋하면 dist 폴더가 저장소에 반영됩니다.
