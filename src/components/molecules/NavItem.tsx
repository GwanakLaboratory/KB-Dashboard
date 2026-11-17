import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/atoms/sidebar';
import { cn } from '@/utils/styles';

export interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  active?: boolean;
  small?: boolean;
  onClick?: () => void;
}

/** shadcn SidebarMenuButton 기반. 선택 = 왼쪽 4px KB Yellow 바 + 연회색 + 굵게 */
export function NavItem({
  icon: Icon,
  label,
  href = '#',
  active,
  small,
  onClick,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={label}
        className={cn(
          'text-ink-2 text-label rounded-l-none rounded-r-xl px-4 [&>svg]:size-[18px]',
          small ? 'h-10' : 'h-11',
          'data-[active=true]:text-foreground relative data-[active=true]:bg-transparent data-[active=true]:font-extrabold [&>*:not([data-indicator])]:relative',
        )}
      >
        <a
          href={href}
          onClick={onClick}
          aria-current={active ? 'page' : undefined}
        >
          {active && !small && (
            <motion.span
              data-indicator
              layoutId="nav-active-indicator"
              transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              className="bg-sidebar-accent absolute inset-0 rounded-r-xl shadow-[inset_4px_0_0_hsl(var(--primary))]"
              aria-hidden
            />
          )}
          <Icon aria-hidden />
          <span>{label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
