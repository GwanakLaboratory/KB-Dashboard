import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useTheme, type Theme } from '@/hooks/useTheme';
import { SegmentedControl } from './SegmentedControl';

/** 라이트 / 다크 전환 — 공통 탭(SegmentedControl) 아이콘 버전 */
export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  return (
    <SegmentedControl<Theme>
      options={[
        { value: 'light', label: t('sidebar.theme.light'), icon: Sun },
        { value: 'dark', label: t('sidebar.theme.dark'), icon: Moon },
      ]}
      value={theme}
      onChange={setTheme}
      ariaLabel={t('sidebar.theme.label')}
      size="icon"
    />
  );
}
