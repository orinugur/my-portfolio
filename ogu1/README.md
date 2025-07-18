# 간단한 슈팅게임 (React)

## 소개
React(CRA) 기반의 간단한 2D 슈팅게임입니다.  
플레이어는 좌우 방향키로 이동, 스페이스바로 총알 발사, 적을 맞추면 점수 획득, 적과 충돌 시 게임 오버입니다.

## 폴더/파일 구조
```
index.html
package.json
README.md
/src
  App.js
  App.css
  index.js
  index.css
  GameBoard.js
  GameBoard.css
  Player.js
  Player.css
  Bullet.js
  Bullet.css
  Enemy.js
  Enemy.css
  utils.js
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

## 정적 빌드 및 SPA 자동 배포
- `package.json`의 `homepage`를  
  `https://사용자명.github.io/저장소명/ogu`  
  로 반드시 지정해야 합니다.
- 빌드 및 자동 복사  
  ```
  npm run build
  ```
  실행 시 build 폴더의 모든 정적 파일이 프로젝트 폴더(root)에 자동 복사됩니다.
- git add, commit, push 후  
  `https://사용자명.github.io/저장소명/ogu/`  
  에서 SPA가 정상 동작합니다.

## 게임 조작법
- 좌우 방향키: 플레이어 이동
- 스페이스바: 총알 발사
- 점수는 화면 좌상단에 표시, 적과 충돌 시 게임 오버

---

## Q&A 누적 기록

Q: 간단한 슈팅게임 만들어줘  
A: React(CRA) 구조로 함수형 컴포넌트, useState/useEffect, CSS 파일 분리, index.html root 배치, package.json에 homepage/postbuild 포함, 게임 로직/스타일/README.md/Q&A 누적 관리까지 구현