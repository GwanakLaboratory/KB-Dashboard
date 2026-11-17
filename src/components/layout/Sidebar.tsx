import { Globe, SunMoon, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import kbLogoDark from '@/assets/kb-logo-dark.png';
import kbLogo from '@/assets/kb-logo.png';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/components/atoms/sidebar';
import {
  LanguageToggle,
  NavItem,
  PoweredByCard,
  Text,
  ThemeToggle,
} from '@/components/molecules';

export interface SidebarItem {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeKey: string;
  onNavigate?: (key: string) => void;
}

/** shadcn Sidebar 기반. ① 로고 ② 메뉴 ③ 화면 모드·언어 토글 ④ Powered by(맨 아래) */
export function Sidebar({ items, activeKey, onNavigate }: SidebarProps) {
  const { t } = useTranslation();
  return (
    <ShadcnSidebar collapsible="offcanvas" className="border-border border-r">
      <SidebarHeader className="gap-2 px-6 pt-7 pb-6">
        {/* 다크 모드는 글자색만 밝게 바꾼 로고로 교체 (노란 심볼은 그대로) */}
        <img
          src={kbLogo}
          alt="KB손해보험"
          className="block h-auto w-[180px] dark:hidden"
        />
        <img
          src={kbLogoDark}
          alt="KB손해보험"
          className="hidden h-auto w-[180px] dark:block"
        />
        <Text variant="label" tone="muted" className="font-bold">
          {t('sidebar.serviceName')}
        </Text>
      </SidebarHeader>
      <SidebarContent className="px-5">
        <SidebarMenu className="gap-1.5">
          {items.map((it) => (
            <NavItem
              key={it.key}
              icon={it.icon}
              // 번역 키(sidebar.nav.<key>)가 있으면 번역, 없으면 넘겨준 label
              label={t(`sidebar.nav.${it.key}` as 'sidebar.nav.dashboard', {
                defaultValue: it.label,
              })}
              href={it.href}
              active={it.key === activeKey}
              onClick={() => onNavigate?.(it.key)}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="gap-4 px-5 pt-10 pb-7">
        {/* 설정 목록형: 왼쪽 이름 · 오른쪽 토글 */}
        <dl className="m-0 flex flex-col gap-2 px-1.5">
          <div className="flex items-center justify-between gap-3">
            <Text
              as="dt"
              variant="label"
              tone="subtle"
              className="flex items-center gap-2"
            >
              <SunMoon className="size-[18px]" aria-hidden />
              {t('sidebar.theme.label')}
            </Text>
            <dd className="m-0">
              <ThemeToggle />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Text
              as="dt"
              variant="label"
              tone="subtle"
              className="flex items-center gap-2"
            >
              <Globe className="size-[18px]" aria-hidden />
              {t('sidebar.language.label')}
            </Text>
            <dd className="m-0">
              <LanguageToggle />
            </dd>
          </div>
        </dl>
        <PoweredByCard />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
