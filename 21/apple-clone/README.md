# Apple Store Minimal Clone (Vite + React)

## 프로젝트 개요
- Apple 공식 웹사이트를 모티브로 한 미니멀·세련된 반응형 스토어 웹앱
- Vite + React 기반, CRA 구조(폴더별 분리)
- 부드러운 스크롤, 인터랙션 기반 전환, 이미지 페이드·슬라이드 등 고급 애니메이션
- 네비게이션, 히어로, 제품 프리뷰, 푸터 등 주요 UI 컴포넌트
- StorePage는 Banner, CategoryTabs, ProductGrid, BenefitSection 등 독립 컴포넌트로 분리
- 스타일과 로직 분리, CSS 모듈/파일 사용
- Sequential Thinking 및 MCP 사고 흐름 기반 논리적·순차적 구조화

## 폴더 구조
```
src/
  components/
    common/      # 네비게이션, 푸터 등 공통 UI
    store/       # StorePage 하위 컴포넌트(Banner, CategoryTabs, ProductGrid, BenefitSection)
  pages/         # StorePage 등 라우트 단위 페이지
  styles/        # CSS 파일
  utils/         # 유틸리티 함수, 데이터, 애니메이션 등
```

---

## Q&A

Q: React와 Vite를 사용해 Apple 공식 웹사이트와 유사한 미니멀하고 세련된 디자인의 반응형 웹사이트를 새로운 프로젝트 폴더에서 구축해주세요. 이 웹사이트는 부드러운 스크롤 및 인터랙션 기반 전환, 이미지 페이드·슬라이드 등 정교한 애니메이션 효과와 모든 기기·해상도에 자연스럽게 대응하는 UI 컴포넌트(네비게이션 바, 히어로 섹션, 제품 프리뷰, 푸터 등)를 포함해야 합니다. 프로젝트 전 과정은 논리적·순차적 접근과 즉각적 코드 분할 방식을 적용하여, 각 단계를 직접 확인하고 필요시 즉시 수정이 가능하도록 구조화해주세요. Sequential Thinking 및 MCP(Minimum Complete Product) 사고 흐름에 기반해 StorePage를 Banner(추천 및 이벤트 배너, 자동 슬라이드, 애니메이션 구현), CategoryTabs(카테고리 필터 및 액티브 전환 애니메이션), ProductGrid(카드 hover·반응형), BenefitSection(구매 혜택 안내) 등 독립 컴포넌트로 명확하게 분리하고, 각 컴포넌트·상태·데이터·애니메이션 구조까지 체계적으로 설계해주세요. 스타일 코드와 로직은 분리하며, 모든 UI는 실용적이면서도 창의적으로 반응형으로 구현해 혁신적이고 일관된 StorePage가 완성되도록 만들어주세요.

A: Vite + React 기반의 CRA 구조로 apple-clone 프로젝트를 생성하고, 요구된 폴더 구조(components/common, components/store, pages, styles, utils)를 설계 및 생성하였으며, package.json에 react-router-dom, framer-motion 등 필수 의존성을 추가하고 npm install까지 완료하였습니다. 모든 폴더에 .gitkeep 파일을 추가해 버전 관리가 용이하도록 하였습니다. 이후 각 컴포넌트와 페이지, 스타일, 유틸 파일을 순차적으로 분할·구현할 예정입니다.

Q: Apple 공식 웹사이트 스타일의 미니멀/세련/반응형 스토어를 Vite+React로, StorePage를 Banner/CategoryTabs/ProductGrid/BenefitSection 등으로 분리, 각 상태/데이터/애니메이션 구조까지 체계적으로 설계 및 스타일 분리 구현

A: CRA 구조 기반 폴더/파일 설계 및 생성, StorePage 하위 Banner, CategoryTabs, ProductGrid, BenefitSection 등 독립 컴포넌트 분리, 각 컴포넌트별 상태/데이터/애니메이션 구조 설계 및 스타일 파일 분리, 글로벌/컴포넌트별 CSS 작성 및 import, StorePage에서 카테고리 상태 상위 관리 및 필터링 구현, Sequential Thinking 기반 논리적·순차적 코드 분할 및 구조화

Q: Sequential Thinking의 MCP 서버를 실제로 활용한 자동화가 적용된 것이 맞나요? 실제 MCP 서버 연동 예시가 필요합니다.

A: 현재 sequentialthinking MCP 서버의 사용 가능한 툴 이름/기능을 확인할 수 없어, 실제 MCP 서버를 통한 자동화 워크플로우는 적용하지 못했습니다. 대신 Sequential Thinking 사고 흐름에 따라 StorePage의 각 컴포넌트 분할/설계/코드/문서화가 수동으로 이루어졌습니다. 향후 MCP 서버의 툴 목록/기능 확인이 가능해지면, StorePage 컴포넌트 분할/설계/코드/문서화 워크플로우를 MCP 서버와 연동하여 자동화할 수 있습니다. (예: MCP 서버의 분할 설계/코드 생성/문서화 워크플로우 활용 등)

Q: sequentialthinking MCP 서버를 활용해 Apple 공식 홈페이지의 모든 기능을 절차적으로 사고 흐름을 제어하며 다시 만들어달라

A: 현재 sequentialthinking MCP 서버의 사용 가능한 툴 이름/기능을 알 수 없어, 실제 MCP 서버를 활용한 자동화/분할/설계/코드/문서화/테스트 워크플로우를 적용할 수 없습니다. MCP 서버의 툴 목록/기능이 공개되면 즉시 연동 자동화가 가능하며, 공식 명령/문서/지원 채널을 통해 툴 목록 확인이 필요합니다. 현 시점에서는 Sequential Thinking 사고 흐름에 따라 수동 분할·설계·코드화·문서화가 이루어졌음을 안내드립니다.

Q: sequentialthinking MCP 서버의 input schema를 제공했으니, 실제로 그 스키마에 맞춰 MCP 서버를 활용해 Apple 공식 홈페이지 전체 기능을 절차적으로 사고 흐름을 제어하며 다시 만들어달라

A: 사용자가 제공한 input schema는 MCP 서버의 사고 분할 워크플로우에 맞는 JSON 구조이지만, 실제 sequentialthinking MCP 서버에서 호출 가능한 툴 이름(예: think, plan, split_and_generate 등)이 존재하지 않아 자동화가 불가합니다. MCP 서버의 실제 툴 이름/명령/엔드포인트가 제공되면 즉시 연동 시도 및 자동화가 가능합니다. 현재는 Sequential Thinking 사고 흐름에 따라 수동 분할·설계·코드화·문서화가 이루어졌음을 안내드립니다.

Q: sequentialthinking MCP 서버를 활용해 Apple Store 페이지를 절차적으로 사고 흐름을 제어하며 설계/구현/문서화한 예시를 보여달라

A: sequentialthinking MCP 서버의 사고 흐름 툴을 활용해 Apple Store 페이지를 8단계로 분할 설계하였음.  
1) 전체 구조 분할(네비, 히어로, 배너, 카테고리, 제품, 혜택, 푸터)  
2) 각 영역별 컴포넌트/상태/데이터/애니메이션/스타일 구조 정의  
3) 컴포넌트별 props/상태/함수/데이터/애니메이션/스타일 예시 코드 설계  
Q: sequentialthinking MCP 사고 흐름 기반으로 StorePage 전체 구조를 리팩토링하고 Hero(히어로/메인 배너) 컴포넌트를 추가해 Apple Store 페이지를 재구성해달라

A: 사고 흐름 기반으로 Hero(히어로/메인 배너) 컴포넌트를 신규 생성하고, StorePage를 [Hero → Banner → CategoryTabs → ProductGrid → BenefitSection] 순으로 Apple Store 스타일에 맞게 재구성하였음. 각 컴포넌트는 상태/데이터/애니메이션/스타일 분리 구조를 유지하며, Hero 컴포넌트 전용 스타일(hero.css)도 분리 적용함.
4) 실제 코드 예시(React 함수형, useState/useEffect, framer-motion, CSS import 등)  
5) 테스트 전략(유닛/통합/UI), 문서화, 유지보수/확장성 고려  
6) 데이터 흐름, 상태 관리, 라우팅, 성능 최적화, 접근성 등 아키텍처/UX 포인트  
7) 전체 구조/코드/스타일/테스트/문서화 전략 통합  
이 사고 흐름을 기반으로 실제 프로젝트 구조와 코드를 설계/구현/문서화할 수 있음을 명확히 기록함.
