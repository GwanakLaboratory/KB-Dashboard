import { useState } from 'react';
import { Calendar, Download, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { AppShell, PageHeader, Sidebar, Toolbar } from '@/components/layout';
import {
  Dropdown,
  OrgBreadcrumb,
  PillButton,
  SegmentedControl,
  UserChip,
} from '@/components/molecules';
import { NAV_ITEMS } from '@/config/navigation';

type Horizon = '13' | '25' | '37';

// 아래 값은 모두 예시 데이터입니다.
const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2026, 10 - i, 1);
  const v = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  return { value: v, label: v.replace('-', '.') };
});

/** 메인 화면 — 사이드바 + 헤더(제목·사용자) + 툴바(조직 경로·기준월·회차·내보내기) */
export default function DashboardPage() {
  const { t } = useTranslation();
  const [nav, setNav] = useState('dashboard');
  // 조직 경로: 맨 앞 '전국'은 언어에 따라 바뀌므로 그 아래 단계만 상태로 둔다
  const [subPath, setSubPath] = useState<string[]>([]);
  const [month, setMonth] = useState(MONTHS[0].value);
  const [horizon, setHorizon] = useState<Horizon>('13');

  return (
    <AppShell
      sidebar={
        <Sidebar items={NAV_ITEMS} activeKey={nav} onNavigate={setNav} />
      }
    >
      <PageHeader
        title={t('dashboard.title')}
        description={t('dashboard.description')}
        actions={
          <>
            <PillButton
              variant="secondary"
              size="icon"
              aria-label={t('dashboard.search')}
            >
              <Search />
            </PillButton>
            <UserChip
              name={t('dashboard.user.name')}
              role={t('dashboard.user.role')}
              initials="AI"
            />
          </>
        }
      />
      <Toolbar
        left={
          <OrgBreadcrumb
            path={[t('dashboard.org.nation'), ...subPath]}
            onNavigate={(i) => setSubPath(subPath.slice(0, i))}
          />
        }
        right={
          <>
            <Dropdown
              ariaLabel={t('dashboard.month.aria')}
              icon={Calendar}
              prefix={t('dashboard.month.label')}
              menuLabel={t('dashboard.month.label')}
              value={month}
              onChange={setMonth}
              options={MONTHS}
            />
            <SegmentedControl<Horizon>
              ariaLabel={t('dashboard.horizon.aria')}
              value={horizon}
              onChange={setHorizon}
              options={(['13', '25', '37'] as const).map((h) => ({
                value: h,
                label: t('dashboard.horizon.option', { n: h }),
              }))}
            />
            <PillButton variant="primary">
              <Download />
              {t('dashboard.export')}
            </PillButton>
          </>
        }
      />
    </AppShell>
  );
}
