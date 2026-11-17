import type { ReactNode } from 'react';

import { Text } from '@/components/molecules';

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** 오른쪽: 검색 IconButton, UserChip 등 */
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <Text variant="title">{title}</Text>
        {description && (
          <Text variant="label" tone="muted">
            {description}
          </Text>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
