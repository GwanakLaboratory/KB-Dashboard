import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/styles';
import { ProgressBar } from './ProgressBar';
import { focusRing, motionEase } from './tones';
import { Text } from './Text';

export interface DrillRow {
  id: string;
  name: string;
  count: string;
  target: string;
  predicted: string;
  /** 예측 수납률 (%) */
  rate: number;
  /** 평균보다 3%p 이상 낮음 */
  risk?: boolean;
}

export interface DrillListProps {
  /** 첫 열 제목 (시·도 / 시·군·구 / 지점) */
  levelLabel: string;
  rows: DrillRow[];
  onDrill?: (row: DrillRow) => void;
}

const GRID =
  'grid grid-cols-[minmax(120px,1.4fr)_minmax(70px,0.7fr)_minmax(90px,0.9fr)_minmax(90px,0.9fr)_minmax(150px,2fr)_20px] items-center gap-3';

/** 하위 단위 목록. 행 전체가 버튼이고 누르면 한 단계 아래로 들어간다. */
export function DrillList({ levelLabel, rows, onDrill }: DrillListProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <div
          className={cn(
            GRID,
            'border-border bg-background text-muted-foreground text-label border-y px-4 py-3',
          )}
        >
          <span>{levelLabel}</span>
          <span className="text-right">계약 수</span>
          <span className="text-right">받아야 할 보험료</span>
          <span className="text-right">예측 수납액</span>
          <span>예측 수납률</span>
          <span />
        </div>
        {rows.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onDrill?.(r)}
            className={cn(
              GRID,
              'border-border hover:bg-background focus-visible:bg-background min-h-14 w-full border-b bg-transparent px-4 py-4 text-left transition-colors last:border-b-0 [&:hover_svg:last-child]:translate-x-0.5',
              focusRing,
              motionEase,
            )}
          >
            <Text variant="body" as="strong" className="font-bold">
              {r.name}
            </Text>
            <Text variant="body" tone="subtle" className="text-right">
              {r.count}
            </Text>
            <Text variant="body" tone="subtle" className="text-right">
              {r.target}
            </Text>
            <Text variant="body" as="strong" className="text-right font-bold">
              {r.predicted}
            </Text>
            <span className="flex items-center gap-3">
              <ProgressBar
                value={r.rate}
                tone={r.risk ? 'risk' : 'default'}
                size="sm"
                className="flex-1"
              />
              <span
                className={cn(
                  'text-body w-12 text-right font-extrabold tabular-nums',
                  r.risk && 'text-risk',
                )}
              >
                {r.rate.toFixed(1)}%
              </span>
            </span>
            <ChevronRight
              className="text-muted-foreground size-4 transition-transform"
              aria-hidden
            />
          </button>
        ))}
      </div>
    </div>
  );
}
