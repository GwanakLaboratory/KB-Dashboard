import { ChevronDown, type LucideIcon } from 'lucide-react';
import {
  Dropdown as HeroDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown';

import { PillButton } from './PillButton';

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

export interface DropdownProps<T extends string> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** 트리거 앞 아이콘 (예: Calendar) */
  icon?: LucideIcon;
  /** 트리거 글자 앞에 붙는 말 (예: '기준월') */
  prefix?: string;
  /** 목록 맨 위 제목 */
  menuLabel?: string;
  ariaLabel?: string;
  align?: 'start' | 'end';
  className?: string;
}

/** 단일 선택 드롭다운 (HeroUI Dropdown). 트리거는 PillButton, 선택 항목은 체크 표시 */
export function Dropdown<T extends string>({
  options,
  value,
  onChange,
  icon: Icon,
  prefix,
  menuLabel,
  ariaLabel,
  align = 'start',
  className,
}: DropdownProps<T>) {
  const current = options.find((o) => o.value === value);
  const items = options.map((o) => (
    <DropdownItem key={o.value} className="rounded-xl py-2.5">
      {o.label}
    </DropdownItem>
  ));
  return (
    <HeroDropdown
      placement={align === 'start' ? 'bottom-start' : 'bottom-end'}
      radius="lg"
      classNames={{ content: 'min-w-[180px] p-1.5' }}
    >
      <DropdownTrigger>
        <PillButton
          variant="secondary"
          aria-label={ariaLabel}
          className={className}
          startContent={Icon ? <Icon /> : undefined}
          endContent={<ChevronDown className="text-muted-foreground" />}
        >
          {prefix && <span className="text-muted-foreground">{prefix}</span>}
          <span className="font-bold">{current?.label}</span>
        </PillButton>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel ?? menuLabel ?? '선택'}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={new Set([value])}
        onSelectionChange={(keys) => {
          const k = Array.from(keys)[0];
          if (k !== undefined) onChange(String(k) as T);
        }}
        className="max-h-[30rem] overflow-y-auto overscroll-contain"
        itemClasses={{
          // HeroUI 기본 hover(bg-default)는 진해서 연회색으로
          base: 'data-[hover=true]:bg-muted! data-[hover=true]:text-foreground! data-[focus-visible=true]:bg-muted! data-[focus=true]:bg-muted! data-[selected=true]:font-bold',
          title: 'text-label',
          selectedIcon: 'text-foreground',
        }}
      >
        {menuLabel ? (
          <DropdownSection
            title={menuLabel}
            classNames={{ heading: 'px-3 text-caption text-muted-foreground' }}
          >
            {items}
          </DropdownSection>
        ) : (
          items
        )}
      </DropdownMenu>
    </HeroDropdown>
  );
}
