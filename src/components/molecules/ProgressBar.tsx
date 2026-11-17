import { Progress } from '@/components/atoms/progress';
import { cn } from '@/utils/styles';

// shadcn Progress 의 막대(첫 번째 자식) 색을 tone 으로 바꾼다.
const TONE = {
  point: '[&>div]:bg-primary',
  default: '[&>div]:bg-selected',
  risk: '[&>div]:bg-risk-bar',
} as const;

const SIZE = { lg: 'h-5', md: 'h-4', sm: 'h-3' } as const;

export interface ProgressBarProps {
  value: number;
  tone?: keyof typeof TONE;
  size?: keyof typeof SIZE;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  tone = 'default',
  size = 'md',
  label,
  className,
}: ProgressBarProps) {
  return (
    <Progress
      value={value}
      aria-label={label}
      className={cn(
        'bg-track [&>div]:rounded-full',
        SIZE[size],
        TONE[tone],
        className,
      )}
    />
  );
}
