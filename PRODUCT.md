# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **KB손해보험 본사 담당자** (예: AI디지털혁신부): 전국 → 시·도 → 시·군·구 → 지점 순으로 내려가며 예측 수납 현황을 보고, PoC 성과를 판단한다.
- **지점·영업 관리자**: 자기 지역·지점에서 미납·감액이 예상되는 개인 계약을 찾아 대응한다.

## Product Purpose

KB손해보험 유지율 예측 PoC(관악연구소 수행)의 결과를 보여주는 대시보드. 핵심 질문은 "받아야 할 보험료 중 얼마를 받을 것으로 예측되는가"이며, 이를 조직 계층(전국 > 시·도 > 시·군·구 > 지점 > 개인 계약)별로 보여준다. 성공 = 담당자가 한눈에 예측 수납액·수납률을 파악하고, 위험 지점·계약까지 바로 내려갈 수 있는 것.

## Positioning

계약 건수 기준이 아니라 **보험료(금액) 기준 유지율**을 예측하고, 개인별 예상 납입액을 맞춘다. 예측 시점은 13 / 25 / 37회차.

## Operating Context

- 현재는 **PoC 시연·보고용**. 데이터는 목데이터(사용자가 직접 작성 예정).
- PC 데스크톱 브라우저 위주. 배포: Vercel (kb-gwanak-dashboard.vercel.app).
- 입력 데이터 성격: 유지·변경·접촉 데이터.

## Capabilities and Constraints

- 조직 계층 드릴다운, 13/25/37회차 전환, 기준월 선택, 계약 단위 목록(예측 납입액·상태: 미납 예상 / 감액 예상 / 정상 납입).
- 스택: Vite + React 19 + TypeScript, Tailwind 3, shadcn/ui, React Bits, TanStack Table v8, motion, lucide.
- 개인정보는 가명 처리(예: 박*영).
- 미정: 실제 데이터 스키마, 실서비스 전환 여부.

## Brand Commitments

- 사용자가 확정한 것: 폰트 Pretendard · 포인트 KB Yellow `#FFBC00` · 선택 상태 KB Gray `#60584C`(흰 글자) · 강조는 빨강 · 회색 계열 중심 · 아이콘 lucide · 라이트/다크 모드.
- 로고: `src/assets/kb-logo.png`(KB손해보험), `src/assets/gwanak-logo.png`(관악연구소, Powered by 카드).
- 숫자는 크게, 단위는 작게. 소수부는 정수와 같은 굵기·색.

## Evidence on Hand

- 실데이터·고객 사례·성능 수치 없음. 목데이터만 사용 — 예측 정확도 등 수치를 지어내지 않는다.

## Product Principles

1. 한 화면의 주인공은 하나: 예측 수납액(받을 돈 중 받을 돈).
2. 위험은 빨강으로만 말한다 — 색은 의미가 있을 때만.
3. 어느 단계에서든 한 번의 클릭으로 한 단계 아래로.
4. 보고 자리에서 멀리서도 읽히게 — 숫자와 글자를 작게 쓰지 않는다.

## Accessibility & Inclusion

기본 WCAG AA 수준. 특별한 기관 요구 사항 없음.
