import { useEffect, useState } from 'react';

import { Text } from '@/components/molecules';
import { useTheme } from '@/hooks/useTheme';

const GROUPS: { title: string; tokens: [string, string][] }[] = [
  {
    title: '브랜드 · 상태',
    tokens: [
      ['primary', '포인트 (KB Yellow)'],
      ['selected', '선택 상태 (KB Gray)'],
      ['risk', '강조 글자'],
      ['risk-bar', '강조 면·진행바'],
      ['risk-soft', '강조 배경'],
      ['positive', '긍정 글자'],
      ['positive-soft', '긍정 배경'],
      ['kb-gold', 'KB Gold'],
    ],
  },
  {
    title: '면 · 글자 · 선',
    tokens: [
      ['background', '페이지 배경'],
      ['surface', '카드 · 사이드바'],
      ['muted', '연회색 면'],
      ['track', '진행바 트랙'],
      ['border', '선'],
      ['foreground', '본문 글자'],
      ['ink-2', '보조 글자'],
      ['muted-foreground', '설명 글자'],
      ['faint', '흐린 아이콘'],
    ],
  },
];

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
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/** index.css 의 토큰을 실제 값으로 읽어 보여준다 (테마 바꾸면 같이 바뀜) */
export function TokenSwatches() {
  const { theme } = useTheme();
  const [hex, setHex] = useState<Record<string, string>>({});

  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    GROUPS.flatMap((g) => g.tokens).forEach(([name]) => {
      next[name] = hslToHex(css.getPropertyValue(`--${name}`));
    });
    setHex(next);
  }, [theme]);

  return (
    <div className="flex flex-col gap-5">
      {GROUPS.map((g) => (
        <div key={g.title} className="flex flex-col gap-3">
          <Text variant="label" tone="muted">
            {g.title}
          </Text>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {g.tokens.map(([name, desc]) => (
              <div key={name} className="flex flex-col gap-2">
                <div
                  className="border-border h-16 rounded-2xl border"
                  style={{ background: `hsl(var(--${name}))` }}
                />
                <div className="flex flex-col">
                  <Text variant="label">{desc}</Text>
                  <Text variant="caption" tone="muted" className="font-mono">
                    --{name} · {hex[name]}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
