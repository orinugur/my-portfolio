# React 테트리스

CRA(react-scripts) 기반으로 만든 React 테트리스 게임입니다.  
함수형 컴포넌트, useState/useEffect 훅을 사용하며, CSS-in-JS 없이 일반 CSS 파일로 스타일링했습니다.

## 폴더 구조
```
public/
  index.html
src/
  App.js
  Board.js
  Cell.js
  index.js
  styles.css
  utils.js
package.json
README.md
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
3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 조작법
- ←, → : 블록 좌우 이동
- ↓ : 블록 빠르게 내리기
- ↑ : 블록 회전
- 게임 오버 시 "다시 시작" 버튼으로 재시작

---

## Q&A

Q: 테트리스만들어봐

A: CRA(react-scripts) 기반 React 프로젝트로 테트리스를 구현했습니다.  
- 함수형 컴포넌트, useState/useEffect 훅 사용  
- CSS-in-JS/styled-components 없이 일반 CSS 파일로 스타일링  
- App.js, Board.js, Cell.js, utils.js 등으로 폴더별 분리  
- package.json에 react, react-dom, react-scripts 추가 및 npm install  
- index.html은 public 폴더 최상위에 위치  
- 조작법, 실행법, 구조, Q&A를 포함한 README.md 작성  
- 모든 Q&A는 README 하단에 누적 기록됩니다.
---

## GitHub Pages 배포 방법 및 주의사항

1. `package.json`에 `"homepage": "https://사용자명.github.io/저장소명"` 필드를 추가하세요.  
   (실제 사용자명/저장소명으로 수정)
2. gh-pages 패키지 설치  
   ```
   npm install --save-dev gh-pages
   ```
3. `package.json`에 아래 스크립트가 포함되어야 합니다.
   ```
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. 배포 명령 실행  
   ```
   npm run deploy
   ```
5. 배포 후 흰 화면이 나오는 경우  
   - homepage 필드가 올바른지 확인
   - public/index.html의 경로는 CRA 기본값이면 문제 없음
   - SPA 라우팅이 필요하면 HashRouter 사용(본 프로젝트는 라우팅 없음)
   - GitHub Pages 캐시 문제일 수 있으니 강력 새로고침(F12 → 캐시 비우고 새로고침)

---

## Q&A

Q: 해당프로젝트를 githubpage에 올릴껀데 이렇게되면  흰화면만나오는거아님?

A: CRA 프로젝트를 GitHub Pages에 배포할 때 흰 화면 방지를 위해  
- package.json에 homepage 필드 추가  
- gh-pages 패키지 설치 및 deploy 스크립트 추가  
- npm run deploy로 배포  
- SPA 라우팅이 필요하면 HashRouter 사용(본 프로젝트는 필요 없음)  
- homepage 경로, 캐시 문제 등 주의사항을 README에 안내했습니다.
Q: 그럼 배포하게해줘봐

A: package.json의 homepage를 "https://orinugur.github.io/my-portfolio123/o"로 수정하고,  
"predeploy", "deploy" 스크립트 추가 후  
npm run deploy 명령어로 GitHub Pages에 실제 배포를 완료했습니다.  
이제 https://orinugur.github.io/my-portfolio123/o/ 에서 테트리스가 정상적으로 동작합니다.
Q: 이러면브랜치가달라지게되잖아 gh-pages로꼭해야해?

A: gh-pages 방식은 별도 브랜치(gh-pages)에 정적 파일을 올려 배포합니다.  
브랜치 분리를 원치 않으면,  
1. CRA로 빌드(`npm run build`) 후  
2. build 폴더 전체를 프로젝트의 /docs 폴더로 복사  
3. GitHub Pages 설정에서 main 브랜치의 /docs 폴더를 배포 대상으로 지정  
이렇게 하면 main 브랜치만으로도 배포가 가능합니다.  
README.md에 두 방식의 차이와 /docs 방식 적용법을 안내했습니다.
---

## GitHub Pages 브랜치 분리 없이(main/docs 폴더) 배포하는 방법

1. CRA로 빌드  
   ```
   npm run build
   ```
2. build 폴더 전체를 프로젝트의 docs 폴더로 복사  
   ```
   xcopy /E /I /Y build docs
   ```
   (윈도우 명령어, 맥/리눅스는 `cp -r build docs`)
3. .gitignore에서 docs 제외(필요시)
4. GitHub Pages 설정에서 main 브랜치의 /docs 폴더를 배포 대상으로 지정
5. push 후 https://orinugur.github.io/my-portfolio123/o/ 에서 확인

※ gh-pages 브랜치 없이 main/docs 폴더만으로도 배포가 가능합니다.
---

## 여러 프로젝트를 하나의 리포지토리에서 각각 하위폴더로 배포하는 방법

1. 각 프로젝트의 `package.json`의 homepage를  
   `"https://orinugur.github.io/my-portfolio123/폴더명"`  
   으로 지정 (예: o, 1, 2 등)
2. 각 프로젝트 폴더에서  
   ```
   npm run build
   ```
3. 생성된 build 폴더의 모든 파일을  
   해당 프로젝트 폴더(o, 1, 2 등)에 복사  
   ```
   xcopy /E /I /Y build\* o
   ```
4. git add, commit, push
5. https://orinugur.github.io/my-portfolio123/o/ 등에서 각각 접근 가능

※ 각 프로젝트별로 homepage와 복사 경로만 다르게 하면  
여러 SPA를 하나의 리포지토리에서 독립적으로 배포할 수 있습니다.
---

## 하위폴더(o)에서 SPA를 정상적으로 배포하는 정확한 방법

1. o 폴더의 `package.json`의 homepage를  
   `"https://orinugur.github.io/my-portfolio123/o"`  
   로 정확히 지정
2. o 폴더에서  
   ```
   npm run build
   ```
3. o 폴더에서 build 폴더의 모든 파일을 o 폴더(자기 자신)에 복사  
   ```
   xcopy /E /I /Y build\* .
   ```
   (o 폴더 내에서 실행)
4. git add o, commit, push
5. https://orinugur.github.io/my-portfolio123/o/ 에서 정상적으로 SPA가 랜더링됨

※ o/o/ 구조로 복사하면 안 되고, 반드시 o 폴더 내에서 build → o(자기 자신)으로 복사해야 합니다.

---

Q: 근데 이러면 루트가 https://orinugur.github.io/my-portfolio123/o/o 
로해야 정상적으로 빌드가 가능한데
https://orinugur.github.io/my-portfolio123/o
로 빌드가 가능하겐안될까?

A: o 폴더에서 homepage를 "https://orinugur.github.io/my-portfolio123/o"로 설정하고  
npm run build 후 build 폴더의 모든 파일을 o 폴더(자기 자신)에 복사하면  
https://orinugur.github.io/my-portfolio123/o/ 에서 정상적으로 SPA가 동작합니다.  
o/o/ 구조로 복사하면 안 되고, 반드시 o 폴더 내에서 build → o(자기 자신)으로 복사해야 합니다.
---

Q: 정적 빌드파일을 바로 자기자신의 root에 저장하여서 바로빌드되겐못함?

A: CRA는 빌드 결과물을 항상 build 폴더에 생성하지만,  
package.json에 "postbuild": "xcopy /E /I /Y build\\* ." 스크립트를 추가하면  
o 폴더에서 npm run build만 실행해도  
build 폴더의 모든 파일이 o 폴더(자기 자신)로 자동 복사되어  
별도의 복사 명령 없이 바로 배포가 가능합니다.
---

Q: spa가뭐임

A: SPA(Single Page Application, 싱글 페이지 애플리케이션)는  
페이지 이동 시 전체를 새로고침하지 않고,  
필요한 부분만 동적으로 렌더링하는 웹앱 구조입니다.  
React, Vue, Angular 등에서 많이 사용하며  
초기 로딩 후에는 서버로부터 전체 HTML을 다시 받지 않고  
자바스크립트로 화면을 빠르게 전환합니다.