import { Badge } from '@/components/atoms/badge';
import { cn } from '@/utils/styles';
import { badgeTone, pill } from './tones';

export interface DeltaChipProps {
  label: string;
  /** 좋으면 true(초록), 나쁘면 false(빨강), 중립이면 생략 — 방향이 아니라 좋고 나쁨 */
  good?: boolean;
  className?: string;
}

export function DeltaChip({ label, good, className }: DeltaChipProps) {
  const tone = good === undefined ? 'neutral' : good ? 'positive' : 'risk';
  return (
    <Badge className={cn(pill, badgeTone[tone], className)}>{label}</Badge>
  );
}
