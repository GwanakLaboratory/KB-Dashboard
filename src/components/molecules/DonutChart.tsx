import Chart from 'react-apexcharts';

import { useTheme } from '@/hooks/useTheme';
import { useTokenColors } from '@/hooks/useTokenColors';
import { cn } from '@/utils/styles';
import { chartBase } from './chartBase';
import { Text } from './Text';

export interface DonutDatum {
  label: string;
  value: number;
  /** 디자인 토큰 이름 (예: 'positive'). 없으면 차트 범주 색(chart-1~5)을 순서대로 */
  token?: string;
}

export interface DonutChartProps {
  data: DonutDatum[];
  centerValue?: string;
  centerLabel?: string;
  format?: (v: number) => string;
  size?: number;
  className?: string;
}

/** 도넛 그래프 (ApexCharts). 가운데 핵심 숫자 + 오른쪽 범례(이름·값·비율). */
export function DonutChart({
  data,
  centerValue,
  centerLabel,
  format = (v) => v.toLocaleString('ko-KR'),
  size = 220,
  className,
}: DonutChartProps) {
  const { theme } = useTheme();
  const names = data.map((d, i) => d.token ?? `chart-${(i % 5) + 1}`);
  const c = useTokenColors([
    ...names,
    'surface',
    'muted-foreground',
    'border',
    'foreground',
  ]);
  const colors = names.map((n) => c[n]);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const base = chartBase(
    { muted: c['muted-foreground'], border: c.border, text: c.foreground },
    theme,
  );
  return (
    <div className={cn('flex flex-wrap items-center gap-6', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <Chart
          type="donut"
          width={size}
          height={size}
          series={data.map((d) => d.value)}
          options={{
            ...base,
            labels: data.map((d) => d.label),
            colors,
            stroke: { width: 3, colors: [c.surface] },
            plotOptions: {
              pie: {
                expandOnClick: false,
                donut: { size: '70%', labels: { show: false } },
              },
            },
            tooltip: {
              ...base.tooltip,
              fillSeriesColor: false,
              y: {
                formatter: (v: number) =>
                  `${format(v)} · ${((v / total) * 100).toFixed(1)}%`,
              },
            },
          }}
        />
        {(centerValue || centerLabel) && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && (
              <span className="text-title leading-none tabular-nums">
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <Text variant="caption" tone="muted" className="mt-1.5">
                {centerLabel}
              </Text>
            )}
          </div>
        )}
      </div>

      <ul className="m-0 flex min-w-[200px] flex-1 list-none flex-col gap-3 p-0">
        {data.map((d, i) => (
          <li
            key={d.label}
            className="text-label flex items-center gap-3 whitespace-nowrap"
          >
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ background: colors[i] }}
              aria-hidden
            />
            <span className="text-ink-2 flex-1">{d.label}</span>
            <span className="font-bold tabular-nums">{format(d.value)}</span>
            <span className="text-muted-foreground w-14 text-right tabular-nums">
              {((d.value / total) * 100).toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
