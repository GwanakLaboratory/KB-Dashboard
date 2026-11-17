import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'kb-dashboard-theme';
const listeners = new Set<() => void>();

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // 저장소를 쓸 수 없으면 시스템 설정을 따른다.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function apply(theme: Theme) {
  // 테마 전환 순간 모든 색 트랜지션이 동시에 터져 번지지 않도록 잠시 끈다
  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.appendChild(style);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  void window.getComputedStyle(document.body).opacity; // 스타일 즉시 반영
  requestAnimationFrame(() => style.remove());
}

let current: Theme = typeof window === 'undefined' ? 'light' : readTheme();
if (typeof window !== 'undefined') apply(current);

/** 라이트/다크 모드. html 에 .dark 클래스를 붙여 디자인 토큰을 통째로 교체한다. */
export function useTheme() {
  const theme = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => 'light' as Theme,
  );

  const setTheme = useCallback((next: Theme) => {
    current = next;
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 저장 실패는 무시 (이번 세션에만 적용)
    }
    listeners.forEach((l) => l());
  }, []);

  return { theme, setTheme };
}
