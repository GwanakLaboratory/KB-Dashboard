import { useId } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

import { ToggleGroup, ToggleGroupItem } from '@/components/atoms/toggle-group';
import { cn } from '@/utils/styles';
import { selectedToggle } from './tones';

export interface SegmentedOption<T extends string> {
  value: T;
  /** 글자 라벨. icon 만 쓰면 접근성용 이름으로 쓰인다. */
  label: string;
  /** 화면에 보일 짧은 글자 (예: KO). 없으면 label 을 보여준다 */
  short?: string;
  icon?: LucideIcon;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  /** default = 글자 탭(13·25·37회차), icon = 아이콘만(라이트/다크), compact = 짧은 글자(KO/EN) */
  size?: 'default' | 'icon' | 'compact';
  className?: string;
}

const SIZE = {
  default: {
    group: 'gap-0.5 bg-surface p-1',
    item: 'h-9 px-4 text-label text-ink-2',
  },
  icon: {
    group: 'gap-0.5 bg-muted p-[3px]',
    item: 'h-[30px] w-9 min-w-0 px-0 text-muted-foreground',
  },
  compact: {
    group: 'gap-0.5 bg-muted p-[3px]',
    item: 'h-[30px] min-w-0 px-3 text-caption font-bold text-muted-foreground',
  },
} as const;

/**
 * 공통 탭(shadcn ToggleGroup 기반). 선택 = KB Gray,
 * 다른 항목을 누르면 선택 배경이 motion 으로 미끄러져 이동한다.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'default',
  className,
}: SegmentedControlProps<T>) {
  const layoutId = useId();
  const s = SIZE[size];
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as T)}
      aria-label={ariaLabel}
      className={cn('border-border rounded-full border', s.group, className)}
    >
      {options.map(({ value: v, label, short, icon: Icon }) => (
        <ToggleGroupItem
          key={v}
          value={v}
          aria-label={label}
          className={cn(
            selectedToggle,
            'relative transition-colors hover:bg-transparent data-[state=on]:bg-transparent',
            s.item,
          )}
        >
          {v === value && (
            <motion.span
              layoutId={layoutId}
              transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              className="bg-selected absolute inset-0 rounded-full"
              aria-hidden
            />
          )}
          {Icon ? (
            <Icon className="relative" aria-hidden />
          ) : (
            <span className="relative">{short ?? label}</span>
          )}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
