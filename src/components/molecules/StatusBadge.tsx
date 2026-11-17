import { Badge } from '@/components/atoms/badge';
import { cn } from '@/utils/styles';
import { badgeTone, pill } from './tones';

export type PaymentStatus = 'unpaid' | 'reduced' | 'normal';

const MAP = {
  unpaid: { label: '미납 예상', tone: 'risk' },
  reduced: { label: '감액 예상', tone: 'neutral' },
  normal: { label: '정상 납입', tone: 'positive' },
} as const;

/** 계약 단위 예측 상태 */
export function StatusBadge({ status }: { status: PaymentStatus }) {
  const m = MAP[status];
  return (
    <Badge className={cn(pill, badgeTone[m.tone], 'gap-1.5')}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {m.label}
    </Badge>
  );
}
