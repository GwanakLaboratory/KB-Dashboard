import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/atoms/badge';
import { Card } from '@/components/atoms/card';
import { cn } from '@/utils/styles';
import { DeltaChip } from './DeltaChip';
import { StatNumber } from './StatNumber';
import { Text } from './Text';
import { badgeTone, cardBase, pill } from './tones';

export interface KpiCardProps {
  label: string;
  icon: LucideIcon;
  value: number;
  unit?: string;
  decimals?: number;
  delta?: { label: string; good?: boolean };
  caption?: string;
  /** risk = 빨간 아이콘·숫자 + '조치 필요' 배지 (카드 면은 그대로) */
  variant?: 'default' | 'risk';
  className?: string;
}

/** 라벨 → 큰 숫자 → 변화량. 아이콘은 배경 없이 라벨 옆에 작게. */
export function KpiCard({
  label,
  icon: Icon,
  value,
  unit,
  decimals,
  delta,
  caption,
  variant = 'default',
  className,
}: KpiCardProps) {
  const risk = variant === 'risk';
  return (
    <Card className={cn(cardBase, 'min-h-[188px] gap-3 px-6 py-5', className)}>
      <div className="flex items-center gap-2">
        <Icon
          className={cn(
            'size-[22px] shrink-0',
            risk ? 'text-risk' : 'text-muted-foreground',
          )}
          strokeWidth={2.25}
          aria-hidden
        />
        <Text variant="subheading" tone={risk ? 'risk' : 'default'}>
          {label}
        </Text>
        {risk && (
          <Badge className={cn(pill, badgeTone.alert, 'ml-auto')}>
            조치 필요
          </Badge>
        )}
      </div>
      <StatNumber
        value={value}
        unit={unit}
        decimals={decimals}
        size="kpi"
        tone={risk ? 'risk' : 'default'}
      />
      {(delta || caption) && (
        <div className="flex items-center gap-2">
          {delta && <DeltaChip label={delta.label} good={delta.good} />}
          {caption && (
            <Text variant="caption" tone="muted">
              {caption}
            </Text>
          )}
        </div>
      )}
    </Card>
  );
}
