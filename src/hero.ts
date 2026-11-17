import { heroui } from '@heroui/theme';

// HeroUI 테마를 우리 디자인 토큰 값에 맞춘다 (같은 이름의 색이 KB 색으로 나오도록)
export default heroui({
  themes: {
    light: {
      colors: {
        background: '#F6F5F2',
        foreground: '#2E2B25',
        primary: { DEFAULT: '#FFBC00', foreground: '#2E2B25' },
        secondary: { DEFAULT: '#60584C', foreground: '#FFFFFF' },
        success: { DEFAULT: '#23704C', foreground: '#FFFFFF' },
        warning: { DEFAULT: '#FFBC00', foreground: '#2E2B25' },
        danger: { DEFAULT: '#D9483B', foreground: '#FFFFFF' },
        focus: '#60584C',
      },
    },
    dark: {
      colors: {
        background: '#141311',
        foreground: '#F3F1EC',
        primary: { DEFAULT: '#FFBC00', foreground: '#2E2B25' },
        secondary: { DEFAULT: '#60584C', foreground: '#FFFFFF' },
        success: { DEFAULT: '#72D3A2', foreground: '#141311' },
        warning: { DEFAULT: '#FFBC00', foreground: '#2E2B25' },
        danger: { DEFAULT: '#E5544A', foreground: '#FFFFFF' },
        focus: '#B5AFA4',
      },
    },
  },
});
