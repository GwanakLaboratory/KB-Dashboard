import CountUp from '@/components/animations/CountUp';
import { cn } from '@/utils/styles';

const SIZE = {
  /** 화면 대표 숫자 1개 (예측 수납액) */
  display: { num: 'text-[56px] tracking-[-0.03em]', unit: 'text-heading' },
  /** KPI 카드 숫자 */
  kpi: { num: 'text-[44px] tracking-tight', unit: 'text-subheading' },
  hero: { num: 'text-[36px] tracking-[-0.02em]', unit: 'text-subheading' },
  section: { num: 'text-[30px] tracking-[-0.02em]', unit: 'text-body' },
  /** 문장·표 안 숫자 */
  inline: { num: 'text-[24px] tracking-[-0.01em]', unit: 'text-label' },
} as const;

const TONE = {
  default: 'text-foreground',
  risk: 'text-risk',
  positive: 'text-positive',
  muted: 'text-muted-foreground',
  subtle: 'text-ink-2',
} as const;

export type StatSize = keyof typeof SIZE;
export type StatTone = keyof typeof TONE;

export interface StatNumberProps {
  value: number;
  /** 숫자 뒤 단위. 숫자의 40% 크기 */
  unit?: string;
  size?: StatSize;
  tone?: StatTone;
  /** 소수 자릿수 — 소수부도 정수와 같은 굵기·색 */
  decimals?: number;
  prefix?: string;
  /** React Bits CountUp 애니메이션 */
  animate?: boolean;
  className?: string;
}

export function StatNumber({
  value,
  unit,
  size = 'kpi',
  tone = 'default',
  decimals = 0,
  prefix,
  animate = true,
  className,
}: StatNumberProps) {
  const s = SIZE[size];
  const text = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span
      className={cn(
        'inline-flex items-baseline tabular-nums',
        TONE[tone],
        className,
      )}
    >
      <span className={cn('leading-none font-extrabold', s.num)}>
        {animate ? (
          <CountUp
            to={value}
            decimals={decimals}
            prefix={prefix}
            duration={0.8}
          />
        ) : (
          `${prefix ?? ''}${text}`
        )}
      </span>
      {unit && (
        <span className={cn('text-foreground ml-1 font-bold', s.unit)}>
          {unit}
        </span>
      )}
    </span>
  );
}
