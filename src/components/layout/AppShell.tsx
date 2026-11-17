import type { CSSProperties, ReactNode } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/sidebar';

/** shadcn SidebarProvider + SidebarInset. 사이드바는 화면 높이에 고정, 본문만 스크롤. 휴대폰에서는 시트로 열림. */
export function AppShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider style={{ '--sidebar-width': '236px' } as CSSProperties}>
      {sidebar}
      <SidebarInset className="bg-background min-w-0 tabular-nums">
        <main className="box-border flex min-w-0 flex-1 flex-col gap-5 px-4 py-7 md:px-8">
          <SidebarTrigger
            className="-ml-1 size-11 rounded-full md:hidden"
            aria-label="메뉴 열기"
          />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
