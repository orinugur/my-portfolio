# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Q&A (요청 및 구현 내역 누적 기록)

Q: React와 Vite를 사용하여 Apple 공식 웹사이트와 유사한 미니멀하고 세련된 스타일의 반응형 웹사이트를 새로운 프로젝트 폴더에서 생성해줘. 사이트에는 부드러운 애니메이션(스크롤 및 상호작용 기반 전환, 이미지 페이드/슬라이드 등)과 다양한 화면 크기에 자연스럽게 반응하는 UI 컴포넌트(네비게이션 바, 히어로 섹션, 제품 프리뷰, 푸터 등)를 포함해줘. 프로젝트 진행 시에는 논리적이고 순차적인 접근법을 적용하여 각 단계별로 결과물을 직접 확인하고, 필요한 경우 즉각적으로 수정할 수 있도록 코드를 분할해서 개발해줘.

A: Vite+React 템플릿 apple-clone 프로젝트를 생성하고, 필수 의존성(framer-motion, react-intersection-observer, classnames, react-scroll 등) 추가 및 설치, CRA 구조 기반으로 src/components, src/styles, src/utils 폴더를 분할 생성 완료. 앞으로 각 단계별로 컴포넌트와 스타일을 분할 개발 및 검증 예정.

---

Q: 스토어를 눌렀을때 https://www.apple.com/store 페이지처럼 유사하게 제품을 배치해줘

A: react-router-dom을 설치하고, NavigationBar의 "스토어" 클릭 시 /store로 이동하도록 라우팅 구조를 적용. StorePage 컴포넌트와 StorePage.css를 생성하여, Apple Store처럼 제품 그리드/카드/배너 UI를 구현. App.jsx에서 BrowserRouter, Routes, Route로 라우팅 구조를 적용하여 메인과 스토어 페이지를 분리함.

---

Q: store의 디자인을 Sequential Thinking과 MCP(Method of Conceptual Process)를 접목하여, 각 단계별 사고 흐름에 따라 체계적이고 창의적인 방식으로 설계해줘.

A: Sequential Thinking과 MCP 사고 흐름에 따라 StorePage를 Banner(추천/이벤트 배너, 자동 슬라이드, 애니메이션), CategoryTabs(카테고리별 필터, active 애니메이션), ProductGrid(카드 hover/반응형), BenefitSection(구매 혜택 안내) 등으로 분리. 각 섹션별 컴포넌트/상태/데이터/애니메이션 구조화, 스타일 분리, 반응형/창의적 UI 설계까지 모두 반영하여 체계적이고 창의적인 StorePage를 구현함.
