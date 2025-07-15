# 간단한 계산기 (React)

## 소개
React 함수형 컴포넌트와 CRA(react-scripts) 구조로 구현한 간단한 사칙연산 계산기입니다.  
상태 관리는 useState 훅을 사용하며, CSS-in-JS 없이 CSS 파일로 스타일링합니다.

## 폴더 구조
```
/public
  index.html
/src
  App.js
  App.css
  Calculator.js
  Calculator.css
  index.js
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
3. 빌드 및 정적 배포  
   ```
   npm run build
   ```
   빌드 후 정적 파일이 프로젝트 폴더(root)에 자동 복사됩니다.

## 사용법
- 숫자와 연산자를 클릭하여 수식을 입력하고, `=` 버튼을 누르면 결과가 표시됩니다.
- `C` 버튼으로 입력 및 결과를 초기화할 수 있습니다.

---

## Q&A 누적

### Q: 간단한계싼기만들어줘

### A:  
React 함수형 컴포넌트와 CRA(react-scripts) 구조로 사칙연산이 가능한 간단한 계산기를 구현했습니다.  
상태 관리는 useState 훅을 사용하고, CSS-in-JS 없이 CSS 파일로 스타일링했습니다.  
폴더별로 파일을 분리해 작성했으며, package.json에 homepage 및 postbuild 스크립트를 추가했습니다.  
README.md 하단에 Q&A를 누적 관리합니다.