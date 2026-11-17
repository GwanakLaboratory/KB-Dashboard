import * as React from 'react';

import { cn } from '@/utils/styles';

/**
 * 글자 크기 단계 — 크기·굵기·줄간격은 index.css 의 --text-* 토큰 한 곳에서 정한다.
 * 대시보드라 기본 굵기도 보통(400)보다 한 단계 굵게 잡았다.
 *
 * title 30/800 · heading 22/700 · subheading 18/700 · body 16/500
 * label 15/600 · caption 14/500 · micro 12/700
 */
const VARIANT = {
  /** 페이지 제목 */
  title: 'text-title text-balance',
  /** 섹션·카드 제목 */
  heading: 'text-heading text-balance',
  /** 카드 안 항목 이름 (KPI 라벨 등) */
  subheading: 'text-subheading',
  /** 본문 */
  body: 'text-body text-pretty',
  /** 메뉴·버튼·표 헤더·작은 제목 */
  label: 'text-label',
  /** 보조 설명 */
  caption: 'text-caption text-pretty',
  /** 배지·머리말 같은 아주 작은 글자 */
  micro: 'text-micro',
} as const;

const TONE = {
  default: 'text-foreground',
  subtle: 'text-ink-2',
  muted: 'text-muted-foreground',
  risk: 'text-risk',
  positive: 'text-positive',
  inherit: '',
} as const;

const TAG = {
  title: 'h1',
  heading: 'h2',
  subheading: 'h3',
  body: 'p',
  label: 'span',
  caption: 'span',
  micro: 'span',
} as const;

export type TextVariant = keyof typeof VARIANT;
export type TextTone = keyof typeof TONE;

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  tone?: TextTone;
  /** 렌더할 태그. 기본값은 variant 에 맞는 태그 */
  as?: React.ElementType;
}

/** 텍스트 공통 컴포넌트. 숫자는 StatNumber, 글자는 Text */
export function Text({
  variant = 'body',
  tone = 'default',
  as,
  className,
  ...props
}: TextProps) {
  const Tag = as ?? TAG[variant];
  return (
    <Tag
      className={cn('m-0', VARIANT[variant], TONE[tone], className)}
      {...props}
    />
  );
}
