import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/atoms/breadcrumb';
import { cn } from '@/utils/styles';
import { focusRing, motionEase } from './tones';

export interface OrgBreadcrumbProps {
  /** 예: ['전국', '서울시', '관악구', '관악지점'] */
  path: string[];
  /** 누른 단계의 index (0 = 전국) */
  onNavigate?: (index: number) => void;
  className?: string;
}

/** 조직 계층 경로. 현재 단계만 KB Gray 로 채운다. */
export function OrgBreadcrumb({
  path,
  onNavigate,
  className,
}: OrgBreadcrumbProps) {
  return (
    <Breadcrumb
      className={cn(
        'border-border bg-surface rounded-full border px-1.5 py-1',
        className,
      )}
    >
      <BreadcrumbList>
        {path.map((name, i) => {
          const current = i === path.length - 1;
          return (
            <Fragment key={`${name}-${i}`}>
              <BreadcrumbItem>
                <button
                  type="button"
                  onClick={() => onNavigate?.(i)}
                  aria-current={current ? 'page' : undefined}
                  className={cn(
                    'text-label h-9 rounded-full px-4 transition-colors',
                    focusRing,
                    motionEase,
                    current
                      ? 'bg-selected text-selected-foreground font-bold'
                      : 'text-ink-2 hover:bg-muted hover:text-foreground',
                  )}
                >
                  {name}
                </button>
              </BreadcrumbItem>
              {!current && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
