import { Avatar, AvatarFallback } from '@/components/atoms/avatar';
import { Text } from './Text';

export function UserChip({
  name,
  role,
  initials,
}: {
  name: string;
  role?: string;
  initials: string;
}) {
  return (
    <div className="border-border bg-surface flex items-center gap-3 rounded-full border py-1 pr-4 pl-1">
      <Avatar className="size-[34px]">
        <AvatarFallback className="bg-selected text-selected-foreground text-label font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <Text variant="label" as="strong" className="font-bold">
          {name}
        </Text>
        {role && (
          <Text variant="caption" tone="muted">
            {role}
          </Text>
        )}
      </div>
    </div>
  );
}
