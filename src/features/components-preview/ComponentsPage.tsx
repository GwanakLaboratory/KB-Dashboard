import { useState } from 'react';
import {
  ArrowLeftRight,
  Calendar,
  ChartLine,
  ChevronLeft,
  CircleAlert,
  Download,
  FileText,
  LayoutDashboard,
  MapPin,
  Search,
  Target,
  Users,
  Wallet,
} from 'lucide-react';

import { Card } from '@/components/atoms/card';
import { TokenSwatches } from './TokenSwatches';
import {
  AppShell,
  PageHeader,
  Sidebar,
  Toolbar,
  type SidebarItem,
} from '@/components/layout';
import {
  CollectionCard,
  ContractTable,
  PillButton,
  type ContractRow,
  DeltaChip,
  DrillList,
  KpiCard,
  OrgBreadcrumb,
  ProgressBar,
  SegmentedControl,
  StatNumber,
  StatusBadge,
  UserChip,
  type DrillRow,
  Dropdown,
  TextInput,
  Text,
  addToast,
  BarChart,
  DonutChart,
} from '@/components/molecules';

// 아래 수치는 모두 예시 데이터입니다.
const NAV: SidebarItem[] = [
  { key: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { key: 'branch', label: '지점별 유지율', icon: MapPin },
  { key: 'trend', label: '회차별 예측 추이', icon: ChartLine },
  { key: 'contract', label: '계약 단위 예측', icon: FileText },
  { key: 'change', label: '변경 · 접촉 분석', icon: ArrowLeftRight },
  { key: 'model', label: '모델 성능', icon: Target },
];

const ROWS: DrillRow[] = [
  {
    id: 'sillim',
    name: '신림지점',
    count: '6,812',
    target: '1.3억원',
    predicted: '1.1억원',
    rate: 84.0,
  },
  {
    id: 'bongcheon',
    name: '봉천지점',
    count: '5,903',
    target: '1.2억원',
    predicted: '1.0억원',
    rate: 87.5,
  },
  {
    id: 'gwanak',
    name: '관악지점',
    count: '6,859',
    target: '9,082만원',
    predicted: '8,174만원',
    rate: 90.0,
  },
];

const CONTRACTS: ContractRow[] = [
  {
    id: 'C-41208',
    who: '박*영',
    product: '무해지 건강',
    month: 7,
    target: 70000,
    predicted: 0,
    status: 'unpaid',
  },
  {
    id: 'C-23377',
    who: '한*민',
    product: '저해지 종신',
    month: 15,
    target: 100000,
    predicted: 70000,
    status: 'reduced',
  },
  {
    id: 'C-88112',
    who: '김*진',
    product: '무해지 간병',
    month: 22,
    target: 220000,
    predicted: 220000,
    status: 'normal',
  },
  {
    id: 'C-56031',
    who: '이*수',
    product: '어린이 종합',
    month: 4,
    target: 150000,
    predicted: 150000,
    status: 'normal',
  },
];

function Section({
  title,
  api,
  children,
}: {
  title: string;
  api: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="border-border flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
        <Text variant="heading">{title}</Text>
        <code className="border-border bg-surface text-ink-2 text-caption rounded-lg border px-3 py-1">
          {api}
        </code>
      </div>
      {children}
    </section>
  );
}

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2026, 10 - i, 1);
  const v = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  return { value: v, label: v.replace('-', '.') };
});

export default function ComponentsPage() {
  const [path, setPath] = useState(['전국', '서울시', '관악구']);
  const [hz, setHz] = useState<'13' | '25' | '37'>('13');
  const [nav, setNav] = useState('dashboard');
  const [month, setMonth] = useState('2026-11');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');

  return (
    <AppShell
      sidebar={<Sidebar items={NAV} activeKey={nav} onNavigate={setNav} />}
    >
      <PageHeader
        title="공통 컴포넌트"
        description="스타일 가이드 기반 · shadcn/ui + React Bits + TanStack Table · 아이콘 lucide · 예시 데이터"
        actions={
          <>
            <PillButton variant="secondary" size="icon" aria-label="검색">
              <Search />
            </PillButton>
            <UserChip name="AI디지털혁신부" role="관리자" initials="AI" />
          </>
        }
      />
      <Toolbar
        left={
          <OrgBreadcrumb
            path={path}
            onNavigate={(i) => setPath(path.slice(0, i + 1))}
          />
        }
        right={
          <>
            <Dropdown
              ariaLabel="기준월 선택"
              icon={Calendar}
              prefix="기준월"
              menuLabel="기준월"
              value={month}
              onChange={setMonth}
              options={MONTHS}
            />
            <SegmentedControl
              ariaLabel="예측 회차"
              value={hz}
              onChange={setHz}
              options={[
                { value: '13', label: '13회차' },
                { value: '25', label: '25회차' },
                { value: '37', label: '37회차' },
              ]}
            />
            <PillButton variant="primary">
              <Download />
              리포트 내보내기
            </PillButton>
          </>
        }
      />

      <Section title="Color Tokens" api="src/index.css → tailwind.config.js">
        <Card className="rounded-[24px] p-6 shadow-none">
          <TokenSwatches />
        </Card>
      </Section>

      <Section title="Text" api="<Text variant tone as />">
        <Card className="flex flex-col gap-3 rounded-[24px] p-6 shadow-none">
          <Text variant="title">title 30 · 페이지 제목</Text>
          <Text variant="heading">heading 22 · 섹션·카드 제목</Text>
          <Text variant="subheading">subheading 18 · KPI 라벨</Text>
          <Text variant="body">body 16 · 본문 문장은 이 크기로 씁니다.</Text>
          <Text variant="label" tone="subtle">
            label 15 · 작은 제목·표 헤더
          </Text>
          <Text variant="caption" tone="muted">
            caption 14 · 보조 설명
          </Text>
          <div className="flex gap-4">
            <Text variant="label" tone="risk">
              tone risk
            </Text>
            <Text variant="label" tone="positive">
              tone positive
            </Text>
            <Text variant="label" tone="muted">
              tone muted
            </Text>
          </div>
        </Card>
      </Section>

      <Section
        title="Dropdown · TextInput"
        api="<Dropdown options value onChange icon prefix /> <TextInput label icon hint error onClear />"
      >
        <Card className="grid gap-5 rounded-[24px] p-6 shadow-none md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Text variant="label" tone="subtle">
              Dropdown
            </Text>
            <div className="flex flex-wrap gap-2">
              <Dropdown
                icon={Calendar}
                prefix="기준월"
                menuLabel="기준월"
                value={month}
                onChange={setMonth}
                options={MONTHS}
              />
              <Dropdown
                prefix="상태"
                value={status}
                onChange={setStatus}
                options={[
                  { value: 'all', label: '전체' },
                  { value: 'unpaid', label: '미납 예상' },
                  { value: 'reduced', label: '감액 예상' },
                  { value: 'normal', label: '정상 납입' },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <TextInput
              icon={Search}
              placeholder="계약자 · 증권번호 검색"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onClear={() => setQ('')}
            />
            <TextInput
              label="지점 코드"
              placeholder="예: GW-0123"
              hint="영문 2자리 + 숫자 4자리"
            />
            <TextInput
              label="목표 수납률"
              defaultValue="120"
              error
              hint="0~100 사이로 입력해 주세요."
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Toast"
        api="<Toaster /> (App) · addToast({ title, description, color })"
      >
        <Card className="flex flex-row flex-wrap gap-2 rounded-[24px] p-6 shadow-none">
          <PillButton
            onClick={() =>
              addToast({
                title: '리포트를 내보냈어요',
                description: '관악구 · 13회차 예측 수납.xlsx',
                color: 'success',
              })
            }
          >
            성공
          </PillButton>
          <PillButton
            onClick={() =>
              addToast({
                title: '데이터를 불러오지 못했어요',
                description: '잠시 후 다시 시도해 주세요.',
                color: 'danger',
              })
            }
          >
            오류
          </PillButton>
          <PillButton
            onClick={() =>
              addToast({
                title: '미납 예상 계약이 늘었어요',
                description: '전월 대비 +7.3%',
                color: 'warning',
              })
            }
          >
            경고
          </PillButton>
          <PillButton
            onClick={() =>
              addToast({
                title: '기준월이 2026.11로 바뀌었어요',
                color: 'default',
              })
            }
          >
            안내
          </PillButton>
          <PillButton
            onClick={() =>
              addToast({
                title: '리포트 만드는 중…',
                promise: new Promise((r) => setTimeout(r, 2000)),
              })
            }
          >
            진행 중
          </PillButton>
        </Card>
      </Section>

      <Section
        title="CollectionCard · KpiCard"
        api="<CollectionCard /> <KpiCard variant />"
      >
        <div className="flex flex-wrap gap-4">
          <CollectionCard
            className="flex-[2_1_420px]"
            title={`관악구 · ${hz}회차 예측 수납`}
            meta="시·군·구 · 계약 19,574건"
            target={{ value: 3.9, unit: '억원/월', decimals: 1 }}
            predicted={{ value: 3.4, unit: '억원/월', decimals: 1 }}
            rate={86.8}
          />
          <KpiCard
            className="flex-[1_1_260px]"
            variant="risk"
            label="예측 미수납액"
            icon={CircleAlert}
            value={5178}
            unit="만원/월"
            delta={{ label: '▲ 7.3%', good: false }}
            caption="전월 대비"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard
            label="예측 수납액"
            icon={Wallet}
            value={3.4}
            decimals={1}
            unit="억원/월"
            delta={{ label: '▲ 1.2%', good: true }}
            caption="전월 대비"
          />
          <KpiCard
            label="평균보다 낮은 지점"
            icon={CircleAlert}
            value={1}
            unit="곳"
            caption="평균 −3%p 이상"
          />
          <KpiCard
            label="예측 대상 계약"
            icon={Users}
            value={19574}
            unit="건"
            delta={{ label: '신규 2,710건' }}
            caption="포함"
          />
        </div>
      </Section>

      <Section
        title="BarChart · DonutChart"
        api="<BarChart data format horizontal domain /> <DonutChart data centerValue centerLabel />"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="flex flex-col gap-4 rounded-[24px] p-6 shadow-none">
            <Text variant="subheading">지점별 예측 수납률</Text>
            <BarChart
              seriesLabel="예측 수납률"
              domain={[70, 100]}
              format={(v) => `${v.toFixed(1)}%`}
              data={[
                { label: '신림', value: 84.0 },
                { label: '봉천', value: 87.5 },
                { label: '관악', value: 90.0 },
                { label: '낙성대', value: 79.2, risk: true },
                { label: '서울대', value: 88.1 },
                { label: '사당', value: 86.3 },
              ]}
            />
          </Card>
          <Card className="flex flex-col gap-4 rounded-[24px] p-6 shadow-none">
            <Text variant="subheading">예측 상태별 계약 비중</Text>
            <DonutChart
              centerValue="19,574"
              centerLabel="전체 계약"
              format={(v) => `${v.toLocaleString('ko-KR')}건`}
              data={[
                {
                  label: '정상 납입',
                  value: 16210,
                  token: 'positive',
                },
                { label: '감액 예상', value: 2148, token: 'faint' },
                {
                  label: '미납 예상',
                  value: 1216,
                  token: 'risk-bar',
                },
              ]}
            />
          </Card>
          <Card className="flex flex-col gap-4 rounded-[24px] p-6 shadow-none lg:col-span-2">
            <Text variant="subheading">
              상품군별 예측 수납액 (가로 막대 · 범주 색 도넛)
            </Text>
            <div className="grid gap-6 lg:grid-cols-2">
              <BarChart
                horizontal
                seriesLabel="예측 수납액"
                format={(v) => `${v.toFixed(1)}억`}
                data={[
                  { label: '건강보험', value: 1.42 },
                  { label: '자녀보험', value: 0.88 },
                  { label: '운전자', value: 0.61 },
                  { label: '종합', value: 0.34 },
                  { label: '기타', value: 0.15 },
                ]}
                height={240}
              />
              <DonutChart
                centerValue="3.4억"
                centerLabel="예측 수납액"
                format={(v) => `${v.toFixed(2)}억`}
                data={[
                  { label: '건강보험', value: 1.42 },
                  { label: '자녀보험', value: 0.88 },
                  { label: '운전자', value: 0.61 },
                  { label: '종합', value: 0.34 },
                  { label: '기타', value: 0.15 },
                ]}
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section
        title="StatNumber"
        api="<StatNumber value unit size tone decimals />"
      >
        <Card className="flex flex-col gap-4 rounded-[24px] p-6 shadow-none">
          <StatNumber value={128400} unit="건" size="display" />
          <StatNumber value={1940} unit="건" size="kpi" tone="risk" />
          <StatNumber
            value={24.1}
            unit="%p"
            size="section"
            tone="positive"
            decimals={1}
            prefix="+"
          />
          <StatNumber value={87.5} unit="%" size="inline" decimals={1} />
        </Card>
      </Section>

      <Section
        title="DeltaChip · StatusBadge · ProgressBar"
        api="<DeltaChip good /> <StatusBadge status /> <ProgressBar tone />"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="flex flex-row flex-wrap items-center gap-2 rounded-[24px] p-6 shadow-none">
            <DeltaChip label="▲ 4.8%" good />
            <DeltaChip label="▲ 7.3%" good={false} />
            <DeltaChip label="– 0.0%" />
          </Card>
          <Card className="flex flex-row flex-wrap items-center gap-2 rounded-[24px] p-6 shadow-none">
            <StatusBadge status="unpaid" />
            <StatusBadge status="reduced" />
            <StatusBadge status="normal" />
          </Card>
          <Card className="flex flex-col justify-center gap-3 rounded-[24px] p-6 shadow-none">
            <ProgressBar value={86.8} tone="point" />
            <ProgressBar value={90} />
            <ProgressBar value={77.4} tone="risk" />
          </Card>
        </div>
      </Section>

      <Section title="DrillList" api="<DrillList levelLabel rows onDrill />">
        <Card className="flex flex-col overflow-hidden rounded-[24px] p-0 pb-2 shadow-none">
          <div className="flex items-center justify-between px-6 py-5">
            <Text variant="subheading">지점별 예측 수납</Text>
            <PillButton
              variant="secondary"
              size="sm"
              onClick={() => setPath(path.slice(0, -1))}
            >
              <ChevronLeft />
              상위로
            </PillButton>
          </div>
          <DrillList
            levelLabel="지점"
            rows={ROWS}
            onDrill={(r) => setPath([...path.slice(0, 3), r.name])}
          />
        </Card>
      </Section>

      <Section
        title="ContractTable"
        api="TanStack Table + shadcn Table (헤더 눌러 정렬)"
      >
        <Card className="overflow-hidden rounded-[24px] p-0 pb-2 shadow-none">
          <ContractTable data={CONTRACTS} />
        </Card>
      </Section>
    </AppShell>
  );
}
