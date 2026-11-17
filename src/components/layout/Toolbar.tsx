import type { ReactNode } from 'react';

/** 왼쪽 = Breadcrumb, 오른쪽 = 필터 → Segmented → primary Button. 좁아지면 줄바꿈. */
export function Toolbar({
  left,
  right,
}: {
  left?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">{left}</div>
      <div className="flex flex-wrap items-center gap-2">{right}</div>
    </div>
  );
}
