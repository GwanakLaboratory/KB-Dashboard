import gwanakLogo from '@/assets/gwanak-logo.png';
import { cn } from '@/utils/styles';
import { Text } from './Text';

/**
 * 사이드바 맨 아래 서명 카드.
 * 로고는 CSS mask 로 그려서 색이 토큰을 따라감 — 라이트/다크 자동 대응.
 */
export function PoweredByCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'border-border dark:bg-background flex flex-col items-center gap-3 rounded-[18px] border px-4 py-4',
        className,
      )}
    >
      <Text variant="micro" tone="muted" className="tracking-[0.18em]">
        POWERED BY
      </Text>
      <span
        role="img"
        aria-label="관악연구소 GWANAK LAB"
        className="bg-ink-2 block aspect-800/313 w-[140px]"
        style={{
          maskImage: `url(${gwanakLogo})`,
          WebkitMaskImage: `url(${gwanakLogo})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
    </div>
  );
}
