import Chart from 'react-apexcharts';

import { useTheme } from '@/hooks/useTheme';
import { useTokenColors } from '@/hooks/useTokenColors';
import { chartBase } from './chartBase';

export interface BarDatum {
  label: string;
  value: number;
  /** 평균보다 낮음 등 — 빨강으로 강조 */
  risk?: boolean;
}

export interface BarChartProps {
  data: BarDatum[];
  format?: (v: number) => string;
  seriesLabel?: string;
  /** 가로 막대 — 항목 이름이 길 때 */
  horizontal?: boolean;
  /** 값 축 범위 고정 (예: 수납률 [70, 100]) */
  domain?: [number, number];
  height?: number;
}

const TOKENS = [
  'selected',
  'risk-bar',
  'muted-foreground',
  'border',
  'foreground',
] as const;

/** 막대 그래프 (ApexCharts). 단일 계열은 KB Gray, 위험 항목만 빨강. */
export function BarChart({
  data,
  format = (v) => v.toLocaleString('ko-KR'),
  seriesLabel = '값',
  horizontal,
  domain,
  height = 260,
}: BarChartProps) {
  const { theme } = useTheme();
  const c = useTokenColors(TOKENS);
  const base = chartBase(
    { muted: c['muted-foreground'], border: c.border, text: c.foreground },
    theme,
  );
  const valueAxis = {
    min: domain?.[0],
    max: domain?.[1],
    labels: {
      formatter: (v: number) => format(v),
      style: { fontSize: '13px' },
    },
  };
  return (
    <Chart
      type="bar"
      height={height}
      series={[{ name: seriesLabel, data: data.map((d) => d.value) }]}
      options={{
        ...base,
        colors: data.map((d) => (d.risk ? c['risk-bar'] : c.selected)),
        plotOptions: {
          bar: {
            horizontal,
            distributed: true,
            borderRadius: 6,
            borderRadiusApplication: 'end',
            columnWidth: '42%',
            barHeight: '52%',
          },
        },
        grid: {
          ...base.grid,
          xaxis: { lines: { show: !!horizontal } },
          yaxis: { lines: { show: !horizontal } },
        },
        xaxis: {
          categories: data.map((d) => d.label),
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: horizontal
            ? valueAxis.labels
            : { style: { fontSize: '13px' } },
          ...(horizontal ? { min: domain?.[0], max: domain?.[1] } : {}),
        },
        yaxis: horizontal
          ? { labels: { style: { fontSize: '13px' } } }
          : valueAxis,
        tooltip: {
          ...base.tooltip,
          y: { formatter: (v: number) => format(v) },
        },
      }}
    />
  );
}
