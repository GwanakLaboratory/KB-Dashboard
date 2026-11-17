import {
  ArrowLeftRight,
  ChartLine,
  FileText,
  LayoutDashboard,
  MapPin,
  Target,
} from 'lucide-react';

import type { SidebarItem } from '@/components/layout';

/** 사이드바 메뉴. label 은 기본값이고, 화면에는 sidebar.nav.<key> 번역이 나온다 */
export const NAV_ITEMS: SidebarItem[] = [
  { key: 'dashboard', label: '대시보드', icon: LayoutDashboard, href: '/' },
  { key: 'branch', label: '지점별 유지율', icon: MapPin },
  { key: 'trend', label: '회차별 예측 추이', icon: ChartLine },
  { key: 'contract', label: '계약 단위 예측', icon: FileText },
  { key: 'change', label: '변경 · 접촉 분석', icon: ArrowLeftRight },
  { key: 'model', label: '모델 성능', icon: Target },
];
