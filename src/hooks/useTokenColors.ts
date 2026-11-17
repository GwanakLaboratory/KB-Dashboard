import { useMemo } from 'react';

import { useTheme } from './useTheme';

function hslToHex(raw: string) {
  const [h, s, l] = raw
    .trim()
    .split(/\s+/)
    .map((v) => parseFloat(v));
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * CSS 디자인 토큰(--x)을 실제 hex 색으로 읽는다. 테마가 바뀌면 다시 읽는다.
 * 캔버스/SVG 라이브러리(ApexCharts 등)에 토큰 색을 넘길 때 쓴다.
 */
export function useTokenColors<K extends string>(names: readonly K[]) {
  const { theme } = useTheme();
  return useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      names.map((n) => {
        const v = css.getPropertyValue(`--${n}`).trim();
        return [n, v.startsWith('#') ? v : hslToHex(v)];
      }),
    ) as Record<K, string>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, names.join()]);
}
