// 공식 shadcn 컴포넌트(atoms)는 그대로 두고, 프로젝트 스타일은 여기 클래스로 덧입힌다.
// 모든 색은 디자인 토큰(tailwind.config.js → src/index.css)에서 온다.

/** 알약형 배지 공통 */
export const pill =
  'rounded-full border-transparent px-2.5 py-1 text-micro leading-none shadow-none whitespace-nowrap';

export const badgeTone = {
  neutral: 'bg-muted text-ink-2 hover:bg-muted',
  risk: 'bg-risk-soft text-risk hover:bg-risk-soft',
  positive: 'bg-positive-soft text-positive hover:bg-positive-soft',
  alert: 'bg-risk-bar text-white text-micro font-extrabold hover:bg-risk-bar',
} as const;

/** shadcn Toggle 의 선택 상태(accent)를 KB Gray(selected) 로 덮는다 */
export const selectedToggle =
  'rounded-full data-[state=on]:bg-selected data-[state=on]:font-bold data-[state=on]:text-selected-foreground';

/** 카드 공통: 24px 모서리, 그림자 없음, 내용 세로 가운데 */
export const cardBase =
  'flex flex-col justify-center gap-2 rounded-[24px] px-6 py-[22px] shadow-none';

/** 인터랙션 모션: 짧고 ease-out, transform·색만 움직인다 */
export const motionEase = 'duration-150 ease-out';

/** 눌림 피드백 (버튼·행) */
export const pressable = `transition-[transform,background-color,color] ${motionEase} enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100`;

/** 키보드 포커스 링 — KB Gray */
export const focusRing =
  'outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** 떠 있는 면(드롭다운·토스트) 그림자 — 테두리 대신 깊이를 만든다 */
export const popShadow = 'shadow-(--shadow-pop)';
