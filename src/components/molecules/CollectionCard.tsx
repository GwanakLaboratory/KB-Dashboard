import { Card } from '@/components/atoms/card';
import { cn } from '@/utils/styles';
import { ProgressBar } from './ProgressBar';
import { StatNumber } from './StatNumber';
import { Text } from './Text';
import { cardBase } from './tones';

interface Amount {
  value: number;
  unit: string;
  decimals?: number;
}

export interface CollectionCardProps {
  title: string;
  meta?: string;
  target: Amount;
  predicted: Amount;
  /** 예측 수납률(%) */
  rate: number;
  risk?: boolean;
  className?: string;
}

/**
 * 메인 대표 카드. 주인공은 '예측 수납액' 하나 —
 * 받아야 할 보험료·수납률은 오른쪽에 조연으로 두고, 아래 진행바로 비율을 보여준다.
 */
export function CollectionCard({
  title,
  meta,
  target,
  predicted,
  rate,
  risk,
  className,
}: CollectionCardProps) {
  return (
    <Card className={cn(cardBase, 'gap-5 px-6 py-5', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Text variant="subheading">{title}</Text>
        {meta && (
          <Text variant="caption" tone="muted">
            {meta}
          </Text>
        )}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex flex-col gap-2">
          <Text variant="label" tone="muted">
            예측 수납액
          </Text>
          <StatNumber
            value={predicted.value}
            unit={predicted.unit}
            decimals={predicted.decimals}
            size="display"
            tone={risk ? 'risk' : 'default'}
          />
        </div>

        <dl className="border-border m-0 flex gap-7 border-l pl-7">
          <div className="flex flex-col gap-1.5">
            <Text as="dt" variant="label" tone="muted">
              받아야 할 보험료
            </Text>
            <dd className="m-0">
              <StatNumber
                value={target.value}
                unit={target.unit}
                decimals={target.decimals}
                size="inline"
                tone="subtle"
              />
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <Text as="dt" variant="label" tone="muted">
              예측 수납률
            </Text>
            <dd className="m-0">
              <StatNumber
                value={rate}
                unit="%"
                decimals={1}
                size="inline"
                tone={risk ? 'risk' : 'default'}
              />
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-2">
        <ProgressBar
          value={rate}
          tone={risk ? 'risk' : 'point'}
          size="lg"
          label={`예측 수납률 ${rate.toFixed(1)}%`}
        />
        <Text variant="caption" tone="muted" className="text-right">
          월 기준 · 보험료 기준 유지율
        </Text>
      </div>
    </Card>
  );
}
