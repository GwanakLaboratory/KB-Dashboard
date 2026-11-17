# KB-Dashboard

KB손해보험 **유지율 예측 PoC** 결과를 보여주는 대시보드입니다. (수행: 관악연구소)

"받아야 할 보험료 중 얼마를 받을 것으로 예측되는가"를 조직 단계별(전국 → 시·도 → 시·군·구 → 지점 → 개인 계약)로, 13 · 25 · 37회차 기준으로 보여줍니다.

- 배포: https://kb-gwanak-dashboard.vercel.app (main 에 push 하면 Vercel 이 자동 배포)
- 제품 배경·원칙: [PRODUCT.md](PRODUCT.md)
- 현재 데이터는 모두 **예시 데이터**입니다.

## 시작하기

Node 20 이상이 필요합니다.

```bash
nvm use
npm install
npm run dev
```

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 타입 검사 + 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` / `npm run format` | ESLint / Prettier |
| `npm run typecheck` | 타입 검사 |
| `npm run test:run` | 테스트 (Vitest) |

커밋할 때 husky 가 lint · prettier 를, push 할 때 타입 검사를 자동으로 실행합니다.

## 화면

| 경로 | 내용 |
| --- | --- |
| `/` | 메인 대시보드 (사이드바 · 헤더 · 툴바) |
| `/design-system` | 공통 컴포넌트 미리보기 (색상 토큰, 글자, 카드, 표, 차트 등) |

## 기술 스택

| 영역 | 사용 |
| --- | --- |
| 기본 | Vite · React 19 · TypeScript · React Router |
| 스타일 | Tailwind CSS 4 (토큰은 `src/index.css` 의 `@theme`) |
| UI | shadcn/ui (`components/atoms`) · HeroUI (버튼 · 드롭다운 · 입력창 · 토스트) |
| 차트 | ApexCharts |
| 표 | TanStack Table v8 |
| 움직임 | motion · React Bits(CountUp) |
| 아이콘 · 글꼴 | lucide · Pretendard |
| 다국어 | i18next (한국어 / 영어) |

## 폴더 구조

```
src/
├── components/
│   ├── atoms/        shadcn 기본 컴포넌트 (직접 수정하지 않음)
│   ├── molecules/    대시보드 공통 컴포넌트 (Text, StatNumber, 카드, 표, 차트, 토글 …)
│   ├── layout/       AppShell · Sidebar · PageHeader · Toolbar
│   └── animations/   CountUp
├── features/
│   ├── dashboard/           메인 화면
│   └── components-preview/  /design-system 미리보기
├── config/           사이드바 메뉴 등 설정
├── hooks/            useTheme · useTokenColors …
├── i18n/locales/     ko.json · en.json
├── hero.ts           HeroUI 테마 (KB 색상)
└── index.css         디자인 토큰 (색상 · 글자 크기 · 그림자)
```

## 디자인 규칙

- **색**: 포인트 KB Yellow `#FFBC00`, 선택 상태 KB Gray `#60584C`(흰 글자), 위험·강조는 빨강, 나머지는 회색 계열.
- **글자**: 크기는 아래 7단계만 씁니다. 직접 `text-[15px]` 처럼 쓰지 말고 `<Text variant="…">` 또는 `text-label` 같은 토큰 클래스를 씁니다.

  | 단계 | 크기 / 굵기 | 쓰는 곳 |
  | --- | --- | --- |
  | title | 30 / 800 | 페이지 제목 |
  | heading | 22 / 700 | 섹션 제목 |
  | subheading | 18 / 700 | 카드 제목, KPI 이름 |
  | body | 16 / 500 | 본문, 표 내용 |
  | label | 15 / 600 | 메뉴, 버튼, 탭, 표 머리글 |
  | caption | 14 / 500 | 보조 설명 |
  | micro | 12 / 700 | 배지, 머리말 |

- **숫자**: 금액·비율은 `StatNumber` 로 크게, 단위는 작게.
- **라이트 / 다크 모드**: 색은 토큰으로만 지정합니다. 차트는 `useTokenColors` 로 토큰 색을 받아 씁니다.
- **다국어**: 화면 글자는 `ko.json` · `en.json` 에 넣고 `t('…')` 로 씁니다.

## 커밋 규칙

`[type] 설명` 형식, 한국어로 씁니다. 예: `[feat] 메인 화면 사이드바·헤더 구성`

type: `feat` · `fix` · `style` · `refactor` · `docs` · `chore`
