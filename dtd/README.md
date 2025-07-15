# 달력 사이트 (React CRA)

## 소개
React 함수형 컴포넌트와 CRA(react-scripts) 구조로 제작된 심플 달력 SPA입니다.  
월 이동, 오늘 날짜 강조, 반응형 UI를 지원합니다.

## 폴더 구조
```
/index.html
/package.json
/README.md
/src
  ├── App.js
  ├── App.css
  ├── components
  │     └── Calendar.js
  └── utils
        └── date.js
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
   빌드 후 SPA는  
   [https://orinugur.github.io/my-portfolio123/dtd/](https://orinugur.github.io/my-portfolio123/dtd/)  
   에서 바로 확인할 수 있습니다.

## 주요 기능
- 월별 달력 렌더링
- 월 이동(이전/다음)
- 오늘 날짜 강조
- 반응형 UI

---

## Q&A 누적 기록

### Q: 달력사이트만들어줘  
A: React 함수형 컴포넌트, CRA 구조, CSS 파일 분리, 정적 배포 스크립트, Q&A 누적 등 요구사항에 맞춰 달력 SPA 프로젝트 구조 및 코드를 작성했습니다.