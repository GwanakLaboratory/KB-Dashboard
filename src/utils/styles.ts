import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** index.css 의 글자 크기 토큰(text-title 등)을 크기로 인식시켜 text-sm 등과 충돌 없이 덮어쓰게 함 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'title',
            'heading',
            'subheading',
            'body',
            'label',
            'caption',
            'micro',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
