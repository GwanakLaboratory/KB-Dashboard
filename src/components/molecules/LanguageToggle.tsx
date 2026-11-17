import { useTranslation } from 'react-i18next';

import type { Language } from '@/i18n';
import { SegmentedControl } from './SegmentedControl';

/** 한국어 / 영어 전환 — 공통 탭(SegmentedControl) 짧은 글자 버전. 고른 언어는 localStorage 에 기억된다 */
export function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const lang: Language = i18n.resolvedLanguage === 'en' ? 'en' : 'ko';
  return (
    <SegmentedControl<Language>
      options={[
        { value: 'ko', label: t('sidebar.language.ko'), short: 'KO' },
        { value: 'en', label: t('sidebar.language.en'), short: 'EN' },
      ]}
      value={lang}
      onChange={(v) => void i18n.changeLanguage(v)}
      ariaLabel={t('sidebar.language.label')}
      size="compact"
    />
  );
}
