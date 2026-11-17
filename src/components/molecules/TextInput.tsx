import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Input, type InputProps } from '@heroui/input';

import { cn } from '@/utils/styles';

export interface TextInputProps extends Omit<
  InputProps,
  'size' | 'isInvalid' | 'description' | 'errorMessage'
> {
  /** 앞 아이콘 (예: Search) */
  icon?: LucideIcon;
  /** 아래 안내 / 오류 문구 */
  hint?: string;
  error?: boolean;
  /** 값이 있을 때 지우기(X) 버튼 표시 */
  onClear?: () => void;
  size?: 'default' | 'sm';
}

/** HeroUI Input 기반 알약형 입력창. 라벨은 위, 오류는 빨강 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { icon: Icon, hint, error, onClear, size = 'default', className, ...props },
    ref,
  ) => (
    <Input
      ref={ref}
      variant="bordered"
      radius="full"
      labelPlacement="outside"
      placeholder={props.placeholder ?? ' '}
      size={size === 'sm' ? 'sm' : 'md'}
      startContent={
        Icon ? (
          <Icon className="text-muted-foreground size-[18px] shrink-0" />
        ) : undefined
      }
      isClearable={!!onClear}
      onClear={onClear}
      isInvalid={error}
      description={error ? undefined : hint}
      errorMessage={error ? hint : undefined}
      className={className}
      classNames={{
        label: 'text-label text-ink-2',
        inputWrapper: cn(
          'border-1 border-border bg-background shadow-none',
          'data-[hover=true]:border-faint group-data-[focus=true]:border-selected',
          size === 'sm' ? 'h-9' : 'h-11',
        ),
        input: 'text-body placeholder:text-faint',
        description: 'text-caption text-muted-foreground',
        errorMessage: 'text-caption',
      }}
      {...props}
    />
  ),
);
TextInput.displayName = 'TextInput';
