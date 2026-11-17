import { forwardRef } from 'react';
import { Button, type ButtonProps } from '@heroui/button';

import { cn } from '@/utils/styles';

/** 스타일 가이드 이름 → HeroUI Button 의 color · variant */
const VARIANT = {
  /** 화면당 1개 대표 액션 — KB Yellow (HeroUI primary 를 KB 색으로 맞춤) */
  primary: { color: 'primary', variant: 'solid', cls: 'font-bold' },
  secondary: {
    color: 'default',
    variant: 'bordered',
    cls: 'border-1 border-border bg-surface text-foreground',
  },
  ghost: { color: 'default', variant: 'light', cls: 'text-ink-2' },
} as const;

const SIZE = {
  default: { size: 'md', isIconOnly: false, cls: 'h-11 px-5 text-label' },
  sm: { size: 'sm', isIconOnly: false, cls: 'h-9 px-4 text-label' },
  icon: {
    size: 'md',
    isIconOnly: true,
    cls: 'size-11 min-w-11 [&_svg]:size-[18px]',
  },
} as const;

export interface PillButtonProps extends Omit<
  ButtonProps,
  'variant' | 'size' | 'color'
> {
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
}

/** HeroUI Button 을 알약형(스타일 가이드)으로 감싼 버튼 */
export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ variant = 'secondary', size = 'default', className, ...props }, ref) => {
    const v = VARIANT[variant];
    const s = SIZE[size];
    return (
      <Button
        ref={ref}
        radius="full"
        color={v.color}
        variant={v.variant}
        size={s.size}
        isIconOnly={s.isIconOnly}
        className={cn('gap-2 [&_svg]:size-[18px]', v.cls, s.cls, className)}
        {...props}
      />
    );
  },
);
PillButton.displayName = 'PillButton';
