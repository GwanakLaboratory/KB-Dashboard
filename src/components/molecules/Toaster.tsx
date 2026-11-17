import { ToastProvider } from '@heroui/toast';

/**
 * 토스트 = HeroUI Toast. 앱 최상단에 <Toaster /> 하나를 두고,
 * 어디서든 addToast({ title, description, color }) 로 띄운다.
 * color: success · danger · warning · primary · secondary · default
 */
export function Toaster() {
  return (
    <ToastProvider
      placement="top-center"
      toastOffset={24}
      toastProps={{
        variant: 'flat',
        radius: 'lg',
        timeout: 4000,
        // 종류별 색 배경은 빼고 흰 카드로 — 색은 아이콘으로만 구분
        classNames: {
          base: '!bg-surface border-1 border-border shadow-[var(--shadow-pop)]',
          title: 'text-foreground',
          description: 'text-muted-foreground',
        },
      }}
    />
  );
}
