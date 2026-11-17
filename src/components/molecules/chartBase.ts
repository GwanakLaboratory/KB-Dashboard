import type { ApexOptions } from 'apexcharts';

/** ApexCharts 공통 옵션 — Pretendard, 툴바·클릭 선택 끄기, 짧은 애니메이션 */
export function chartBase(
  c: { muted: string; border: string; text: string },
  theme: 'light' | 'dark',
): ApexOptions {
  return {
    chart: {
      fontFamily: 'inherit',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
      animations: { enabled: true, speed: 500 },
      foreColor: c.muted,
    },
    theme: { mode: theme },
    dataLabels: { enabled: false },
    grid: { borderColor: c.border, strokeDashArray: 0 },
    // 클릭해도 테두리·색 변화 없이 (선택 상태 없음)
    states: {
      hover: { filter: { type: 'darken' } },
      active: { filter: { type: 'none' } },
    },
    tooltip: { theme, style: { fontSize: '14px' } },
    legend: { show: false },
  };
}
